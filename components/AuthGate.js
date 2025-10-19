'use client';

import AuthForm from '@/components/AuthForm';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import UserMenu from '@/components/UserMenu';
import { useSupabaseUser } from '@/lib/useSupabaseUser';

export default function AuthGate() {
  const { user, loading } = useSupabaseUser();

  if (loading) return <p>読み込み中…</p>;

  return user ? (
    <>
      <UserMenu userEmail={user.email} />
      <TodoForm />
      <TodoList />
    </>
  ) : (
    <AuthForm />
  );
}
