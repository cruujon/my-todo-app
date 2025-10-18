'use client'

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [nextId, setNextId] = useState(1)

  const handleAdd = () => {
    if (input.trim() === '') return
    const newTodo: Todo = {
      id: nextId,
      text: input.trim(),
      completed: false
    }
    setTodos([...todos, newTodo])
    setInput('')
    setNextId(nextId + 1)
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          TODOアプリ
        </h1>
        
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="やることを入力してください"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={handleAdd}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            追加
          </button>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          進捗: {completedCount}/{totalCount} 完了
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            まだTODOがありません。上の入力欄から追加してみましょう！
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li 
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  todo.completed 
                    ? 'bg-gray-100 border-gray-200' 
                    : 'bg-white border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span 
                  className={`flex-1 ${
                    todo.completed 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}