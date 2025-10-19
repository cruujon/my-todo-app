'use client';

import { useEffect, useState } from 'react';
import { fetchTodos } from '@/lib/fetchTodos';
import TodoItem from './TodoItem';
import type { Todo, TodoListProps } from '@/types';

/**
 * 一覧取得と再取得ロジックをカプセル化
 */
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError('TODOの読み込みに失敗しました');
      console.error('loadTodos エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading && todos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 bg-red-50 p-4 rounded mb-4">
          {error}
        </div>
        <button
          onClick={loadTodos}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* リフレッシュボタン */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">TODO一覧 ({todos.length}件)</h3>
        <button
          onClick={loadTodos}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        >
          {loading ? '更新中...' : '🔄 更新'}
        </button>
      </div>

      {/* TODOリスト */}
      {todos.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          TODOがありません。上の入力欄から追加してみましょう！
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onRefresh={loadTodos} />
          ))}
        </ul>
      )}
    </div>
  );
}
