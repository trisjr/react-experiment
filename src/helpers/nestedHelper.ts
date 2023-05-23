import { ConvertedNestedItem, NestedItem } from "../constants/types.ts";
import { STATUS } from "../constants/enums.ts";

export const convertNestedData = (nestedData: NestedItem[]) => {
  const convertedData: ConvertedNestedItem[] = [];
  const idToConvertedItemMap: { [id: number]: ConvertedNestedItem } = {};

  function buildConvertedStructure(item: NestedItem): ConvertedNestedItem {
    const convertedItem: ConvertedNestedItem = {
      id: item.id,
      label: item.label,
      isChecked: item.isChecked,
      children: [],
    };

    if (item.parentId === undefined) {
      convertedData.push(convertedItem);
    } else {
      const parentItem = idToConvertedItemMap[item.parentId];
      if (!parentItem.children) {
        parentItem.children = [];
      }
      parentItem.children.push(convertedItem);
    }

    idToConvertedItemMap[item.id] = convertedItem;

    return convertedItem;
  }

  for (const item of nestedData) {
    buildConvertedStructure(item);
  }

  return convertedData;
};

const isChildrenChecked = (el: ConvertedNestedItem) => {
  if (el.children.length === 0) {
    return el.isChecked;
  }

  for (const child of el.children) {
    if (!isChildrenChecked(child)) {
      return false;
    }
  }

  return true;
};

const isChildrenUnchecked = (el: ConvertedNestedItem) => {
  if (el.children.length === 0) {
    return !el.isChecked;
  }

  for (const child of el.children) {
    if (!isChildrenUnchecked(child)) {
      return false;
    }
  }

  return true;
};

export const getStatusForItem = (item: ConvertedNestedItem): STATUS => {
  if (item.isChecked) {
    return STATUS.CHECKED;
  }
  if (item.children && item.children.length > 0) {
    if (isChildrenChecked(item)) {
      return STATUS.CHECKED;
    }
    if (isChildrenUnchecked(item)) {
      return STATUS.UNCHECKED;
    }
    return STATUS.INDETERMINATE;
  }
  return STATUS.UNCHECKED;
};
