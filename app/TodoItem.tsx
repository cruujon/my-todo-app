import { Todo } from './types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className={todo.completed ? 'line-through text-gray-400' : ''}
      >
        {todo.text}
      </span>
    </li>
  );
}
