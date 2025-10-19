'use client';

import { useEffect, useState } from 'react';
import { fetchTodos } from '../lib/fetchTodos';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';

export default function TodoAppPage() {
  const [todos, setTodos] = useState<any[]>([]);

  // TODO一覧を取得する関数
  const refreshTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  // 初回マウント時に既存 TODO を取得
  useEffect(() => {
    refreshTodos();
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
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onRefresh={refreshTodos}
            />
          ))
        )}
      </div>
    </main>
  );
}