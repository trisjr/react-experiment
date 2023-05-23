export type NestedItem = {
  id: number;
  label: string;
  isChecked: boolean;
  parentId?: number;
};

export type ConvertedNestedItem = {
  id: number;
  label: string;
  children: ConvertedNestedItem[];
  isChecked: boolean;
};
