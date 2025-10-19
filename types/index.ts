export interface Todo {
  id: number;
  title: string;
  is_complete: boolean;
  created_at: string;
}

export interface TodoFormProps {
  onAdd?: (todo: Todo) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onRefresh?: () => void;
}

export interface TodoListProps {
  // 必要に応じて追加
}
