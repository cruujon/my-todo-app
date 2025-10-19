'use client';

import AuthForm from '@/components/AuthForm';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import UserMenu from '@/components/UserMenu';
import { useSupabaseUser } from '@/lib/useSupabaseUser';
import { debugUserAndTodos } from '@/lib/debugUser';

export default function AuthGate() {
  const { user, loading } = useSupabaseUser();

  if (loading) return <p>読み込み中…</p>;

  // デバッグ用：ユーザー情報とTODOデータをコンソールに出力
  if (user) {
    debugUserAndTodos();
  }

  return user ? (
    <>
      <UserMenu userEmail={user.email} />
      <button 
        onClick={debugUserAndTodos}
        style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f0f0', border: '1px solid #ccc' }}
      >
        🔍 デバッグ情報をコンソールに表示
      </button>
      <TodoForm />
      <TodoList />
    </>
  ) : (
    <AuthForm />
  );
}
