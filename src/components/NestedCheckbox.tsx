import React, { useState } from "react";
import { ConvertedNestedItem, NestedItem } from "../constants/types.ts";
import { convertNestedData } from "../helpers/nestedHelper.ts";
import NestedCheckboxItem from "./NestedCheckboxItem.tsx";
import "../styles/nestedCheckbox.scss";

type NestedCheckboxProps = {
  items: NestedItem[];
  onSelect: (data: ConvertedNestedItem[]) => void;
};

const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ items, onSelect }) => {
  const [data, setData] = useState<ConvertedNestedItem[]>(
    convertNestedData(items)
  );

  const handleCheckboxSelect = (id: number, isChecked: boolean): void => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.isChecked = isChecked;
      }
      return item;
    });
    setData(newData);
    onSelect(newData);
  };

  return (
    <div className={"nested-checkbox"}>
      {data.map((item) => (
        <NestedCheckboxItem
          key={item.id}
          item={item}
          onSelect={handleCheckboxSelect}
          level={0}
        />
      ))}
    </div>
  );
};

export default NestedCheckbox;
