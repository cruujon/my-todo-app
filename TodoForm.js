'use client';

import { useState } from 'react';
import { insertTodo } from './lib/insertTodo';

/**
 * props:
 *   onAdd: (todo) => void   // 親コンポーネントへ新規 todo を渡す
 */
export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    
    try {
      const newTodo = await insertTodo(trimmed);
      
      if (newTodo) {
        onAdd(newTodo);  // 親のリストに即時反映
        setTitle('');    // フォームをクリア
      } else {
        setError('TODOの追加に失敗しました');
      }
    } catch (err) {
      setError('エラーが発生しました: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="新しい TODO を入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '追加中…' : '追加'}
        </button>
      </form>
      {error && (
        <div className="text-red-600 bg-red-50 p-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}