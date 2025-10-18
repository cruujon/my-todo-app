'use client';

import { useEffect, useState } from 'react';
import { fetchTodos } from '../lib/fetchTodos';
import TodoForm from '../TodoForm';

export default function TodoAppPage() {
  const [todos, setTodos] = useState<any[]>([]);

  // 初回マウント時に既存 TODO を取得
  useEffect(() => {
    const load = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    load();
  }, []);

  // TodoForm から呼ばれる
  const handleAdd = (todo: any) => {
    setTodos((prev) => [todo, ...prev]);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TODO リスト</h1>

      <TodoForm onAdd={handleAdd} />

      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            TODOがありません。上の入力欄から追加してみましょう！
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="p-3 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.is_complete}
                  readOnly
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className={todo.is_complete ? 'line-through text-gray-500' : 'text-gray-800'}>
                  {todo.title}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}