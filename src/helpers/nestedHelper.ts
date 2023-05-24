import { ConvertedNestedItem, NestedItem } from "../constants/types";
import { STATUS } from "../constants/enums";

export const convertNestedData = (
  nestedData: NestedItem[]
): ConvertedNestedItem[] => {
  const convertedData: ConvertedNestedItem[] = [];
  const idToConvertedItemMap: Record<number, ConvertedNestedItem> = {};

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

  nestedData.forEach(buildConvertedStructure);

  return convertedData;
};

const isChildrenChecked = (el: ConvertedNestedItem): boolean => {
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

const isChildrenUnchecked = (el: ConvertedNestedItem): boolean => {
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
