export interface TodoAddAction {
  type: 'ADD';
  id: string;
  todo: string;
}

export interface TodoRemoveAction {
  type: 'REMOVE';
  id: string;
}

export type TodoAction = TodoAddAction | TodoRemoveAction;

export const createTodo = (id: string, todo: string): TodoAddAction => ({
  type: 'ADD',
  id,
  todo,
});

export const removeTodo = (id: string): TodoRemoveAction => ({
  type: 'REMOVE',
  id,
});
