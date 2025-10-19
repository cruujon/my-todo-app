'use client';

import TodoForm from '../TodoForm';
import TodoList from '../TodoList';

export default function TodosPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TODO リスト</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}