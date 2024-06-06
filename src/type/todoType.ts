export type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

export type Filter = "all" | "checked" | "unchecked" | "removed";
