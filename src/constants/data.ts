import { NestedItem } from "./types.ts";

export const nestedData: NestedItem[] = [
  {
    id: 1,
    label: "Food",
    parentId: undefined,
    isChecked: false,
  },
  {
    id: 2,
    label: "Fruit",
    parentId: 1,
    isChecked: false,
  },
  {
    id: 3,
    label: "Apple",
    parentId: 2,
    isChecked: false,
  },
  {
    id: 4,
    label: "Orange",
    parentId: 2,
    isChecked: false,
  },
  {
    id: 5,
    label: "Vegetables",
    parentId: 1,
    isChecked: false,
  },
  {
    id: 6,
    label: "Carrot",
    parentId: 5,
    isChecked: false,
  },
  {
    id: 7,
    label: "Meat",
    parentId: 1,
    isChecked: false,
  },
  {
    id: 8,
    label: "Beef",
    parentId: 7,
    isChecked: false,
  },
  {
    id: 9,
    label: "Pork",
    parentId: 7,
    isChecked: false,
  },
  {
    id: 10,
    label: "Fish",
    parentId: 1,
    isChecked: false,
  },
  {
    id: 11,
    label: "Salmon",
    parentId: 10,
    isChecked: false,
  },
  {
    id: 12,
    label: "Tuna",
    parentId: 10,
    isChecked: false,
  },
  {
    id: 13,
    label: "Drinks",
    parentId: undefined,
    isChecked: false,
  },
  {
    id: 14,
    label: "Water",
    parentId: 13,
    isChecked: false,
  },
  {
    id: 15,
    label: "Soda",
    parentId: 13,
    isChecked: false,
  },
  {
    id: 16,
    label: "Juice",
    parentId: 13,
    isChecked: false,
  },
  {
    id: 17,
    label: "Apple Juice",
    parentId: 3,
    isChecked: false,
  },
  {
    id: 18,
    label: "Orange Juice",
    parentId: 17,
    isChecked: false,
  },
  {
    id: 19,
    label: "Carrot Juice",
    parentId: 17,
    isChecked: false,
  },
];
