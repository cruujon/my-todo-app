'use client';
import { useState } from 'react';
import TodoItem from './TodoItem';
import { Todo } from './types';

export default function TodoPage() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'サンプルタスク', completed: false },
  ]);

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput('');
  };

  // ★ 完了トグル
  const toggleTodo = (id: number) =>
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">TODO アプリ</h1>

      <div className="flex gap-2 mb-4">
        <input
          data-testid="todo-input"
          className="border p-2 flex-1"
          placeholder="やることを入力"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          data-testid="add-btn"
          className="bg-blue-500 text-white px-4"
          onClick={handleAdd}
        >
          追加
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(t => (
          <TodoItem key={t.id} todo={t} onToggle={toggleTodo} />
        ))}
      </ul>
    </main>
  );
}