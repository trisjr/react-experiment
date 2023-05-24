import React, { useState } from "react";
import { ConvertedNestedItem, NestedItem } from "../constants/types";
import { convertNestedData } from "../helpers/nestedHelper";
import NestedCheckboxItem from "./NestedCheckboxItem";
import "../styles/nestedCheckbox.scss";

type NestedCheckboxProps = {
  items: NestedItem[];
  onSubmit: (data: ConvertedNestedItem[]) => void;
};

const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ items, onSubmit }) => {
  const [data, setData] = useState<ConvertedNestedItem[]>(() =>
    convertNestedData(items)
  );

  const handleSubmit = (id: number, isChecked: boolean): void => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, isChecked } : item
    );
    setData(newData);
    onSubmit(newData);
  };

  return (
    <div className="nested-checkbox">
      {data.map((item) => (
        <NestedCheckboxItem
          key={item.id}
          item={item}
          onSelect={handleSubmit}
          level={0}
        />
      ))}
    </div>
  );
};

export default NestedCheckbox;
