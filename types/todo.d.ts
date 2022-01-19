export interface TodoItemData {
  text: string;
  tags: string[];
  index: number;
  createdAt: Date;
  completed: boolean;
}

export interface TodoDataManager {
  /**
   * TODO: This is for autocomplete
   */
  tags: Set<string>;

  /**
   * This currently contains both completed and non-completed todos
   */
  todos: TodoItemData[];

  /**
   * TODO: This for seperate completed todos
   */
  //  completed: TodoItemData[];

  /**
   * TODO: This deleted todos
   */
  deleted: TodoItemData[];
}
