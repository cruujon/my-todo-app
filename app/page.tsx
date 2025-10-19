'use client';

import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import Link from 'next/link';

export default function TodosPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">TODO リスト</h1>
        <Link
          href="/auth"
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border border-blue-ump rounded-md hover:bg-blue-50"
        >
          認証管理
        </Link>
      </div>
      <TodoForm />
      <TodoList />
    </main>
  );
}