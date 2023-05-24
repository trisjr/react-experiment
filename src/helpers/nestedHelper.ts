import { ConvertedNestedItem, NestedItem } from "../constants/types";
import { STATUS } from "../constants/enums";

export const getItemsByParentId = (
  id: number,
  nestedData: NestedItem[],
  memo: { [key: number]: ConvertedNestedItem[] } = {}
): ConvertedNestedItem[] => {
  if (memo[id]) {
    return memo[id];
  }

  if (nestedData.length === 0) {
    return [];
  }

  const items: ConvertedNestedItem[] = [];
  const currentItems: NestedItem[] = nestedData.filter(
    (item) => item.parentId !== id
  );

  for (const item of nestedData) {
    if (item.parentId === id) {
      const convertedItem: ConvertedNestedItem = {
        id: item.id,
        label: item.label,
        isChecked: item.isChecked,
        children: [],
      };
      items.push(convertedItem);
      convertedItem.children = getItemsByParentId(item.id, currentItems, memo);
    }
  }

  memo[id] = items;
  return items;
};

export const convertNestedData = (
  nestedData: NestedItem[]
): ConvertedNestedItem[] => {
  return getItemsByParentId(0, nestedData);
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
