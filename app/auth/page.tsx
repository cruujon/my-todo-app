'use client';

import AuthForm from '@/components/AuthForm';
import UserMenu from '@/components/UserMenu';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 現在のユーザーセッションを取得
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {user ? 'アカウント管理' : 'ログイン'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {user ? 'アカウント情報を管理できます' : 'TODOアプリにログインしてください'}
            </p>
          </div>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <AuthForm />
          )}
        </div>
      </div>
    </main>
  );
}
