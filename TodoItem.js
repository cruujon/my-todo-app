'use client';

import { useState } from 'react';
import { updateTodo } from './lib/updateTodo';
import { deleteTodo } from './lib/deleteTodo';

export default function TodoItem({ todo, onRefresh }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await updateTodo(todo.id, title.trim());
      setEditing(false);
      onRefresh();
    } catch (error) {
      console.error('更新エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('この TODO を削除しますか？')) return;
    setLoading(true);
    try {
      await deleteTodo(todo.id);
      onRefresh();
    } catch (error) {
      console.error('削除エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.is_complete}
          readOnly
          className="w-4 h-4 text-blue-600 rounded"
        />
        
        {editing ? (
          <div className="flex-1 flex gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
            />
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 text-sm"
            >
              保存
            </button>
            <button
              onClick={() => setEditing(false)}
              disabled={loading}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-400 text-sm"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <>
            <span className={`flex-1 ${todo.is_complete ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                disabled={loading}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 text-sm"
              >
                編集
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 text-sm"
              >
                削除
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
