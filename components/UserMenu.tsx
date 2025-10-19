'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  user: any;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        // ログアウト後は認証ページにリダイレクト
        router.push('/auth');
      }
    } catch (err) {
      setError('ログアウトに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: prompt('新しいパスワードを入力してください（6文字以上）:')
      });

      if (error) {
        setError(error.message);
      } else {
        setError('パスワードが更新されました。');
      }
    } catch (err) {
      setError('パスワード変更に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ユーザー情報 */}
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xl font-medium text-blue-600">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="mt-2 text-lg font-medium text-gray-900">
          {user.email}
        </h2>
        <p className="text-sm text-gray-500">
          ログイン済み
        </p>
      </div>

      {/* アカウント情報 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">アカウント情報</h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm text-gray-500">メールアドレス</dt>
            <dd className="text-sm text-gray-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">ユーザーID</dt>
            <dd className="text-sm text-gray-900 font-mono text-xs">{user.id}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">登録日</dt>
            <dd className="text-sm text-gray-900">
              {new Date(user.created_at).toLocaleDateString('ja-JP')}
            </dd>
          </div>
        </dl>
      </div>

      {/* アクションボタン */}
      <div className="space-y-3">
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          {loading ? '処理中...' : 'パスワード変更'}
        </button>

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '処理中...' : 'ログアウト'}
        </button>
      </div>

      {/* TODOアプリへのリンク */}
      <div className="text-center pt-4 border-t">
        <button
          onClick={() => router.push('/')}
          className="text-blue-600 hover:text-blue-500 text-sm font-medium"
        >
          ← TODOアプリに戻る
        </button>
      </div>

      {/* エラー表示 */}
      {error && (
        <div className={`p-3 rounded-md text-sm ${
          error.includes('更新されました') || error.includes('リセットメール')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {error}
        </div>
      )}
    </div>
  );
}
