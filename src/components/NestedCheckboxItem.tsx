import React, { useEffect, useState } from "react";
import { ConvertedNestedItem } from "../constants/types";
import { getStatusForItem } from "../helpers/nestedHelper";
import "../styles/nested-checkbox-item.scss";
import { STATUS } from "../constants/enums";

type NestedCheckboxItemProps = {
  item: ConvertedNestedItem;
  onSelect: (id: number, isChecked: boolean) => void;
  level: number;
};

const NestedCheckboxItem: React.FC<NestedCheckboxItemProps> = React.memo(
  ({ item, onSelect, level = 0 }) => {
    const [isChecked, setIsChecked] = useState<boolean>(item.isChecked);
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [status, setStatus] = useState<STATUS>(getStatusForItem(item));

    const setCheckedAllChildren = (
      data: ConvertedNestedItem[],
      isChecked: boolean
    ): ConvertedNestedItem[] => {
      return data.map((child) => {
        child.isChecked = isChecked;

        if (child.children.length > 0) {
          child.children = setCheckedAllChildren(child.children, isChecked);
        }

        return child;
      });
    };

    const handleSetIsCheckedAllChildren = (isChecked: boolean): void => {
      item.children = setCheckedAllChildren(item.children, isChecked);
    };

    const handleCheckboxChange = (): void => {
      const newIsChecked = !isChecked;
      handleSetIsCheckedAllChildren(newIsChecked);
      onSelect(item.id, newIsChecked);

      setStatus(newIsChecked ? STATUS.CHECKED : STATUS.UNCHECKED);
    };

    const handleChildCheckboxChange = (
      id: number,
      isChecked: boolean
    ): void => {
      item.children = item.children.map((child) =>
        child.id === id ? { ...child, isChecked } : child
      );

      const isAllChildrenChecked = item.children.every(
        (child) => child.isChecked
      );
      setIsChecked(isAllChildrenChecked);
      onSelect(item.id, isAllChildrenChecked);

      setStatus(getStatusForItem(item));
    };

    useEffect(() => {
      setIsChecked(item.isChecked);
      setStatus(getStatusForItem(item));
    }, [item, item.isChecked]);

    return (
      <div className="nested-checkbox-item" style={{ marginLeft: level * 20 }}>
        <div className="nested-checkbox-item--content">
          <img
            src="src/assets/chevron-down.svg"
            alt="arrow"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className={`nested-checkbox-item--content__expand${
              item.children.length === 0 ? " hidden" : ""
            }${isExpanded ? " expanded" : ""}`}
          />
          <input
            type="checkbox"
            id={item.id.toString()}
            checked={isChecked}
            onChange={handleCheckboxChange}
            ref={(input) => {
              if (input) {
                input.indeterminate = status === STATUS.INDETERMINATE;
              }
            }}
            className="nested-checkbox-item--content__checkbox"
          />
          <label htmlFor={item.id.toString()}>{item.label}</label>
        </div>
        {item.children && isExpanded && (
          <ul className="nested-checkbox-item__children">
            {item.children.map((child) => (
              <li key={child.id} className="nested-checkbox-item__child">
                <NestedCheckboxItem
                  item={child}
                  onSelect={handleChildCheckboxChange}
                  level={level + 1}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default NestedCheckboxItem;
