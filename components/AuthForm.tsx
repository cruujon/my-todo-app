'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    console.log('🔍 認証開始:', { email, password });

    try {
      // 1. signUp を試す
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log('📝 サインアップ結果:', { signUpData, signUpError });

      if (signUpError) {
        console.log('⚠️ サインアップエラー、サインインを試行');
        // 「既に登録済み」などの場合は signIn にフォールバック
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log('🔑 サインイン結果:', { signInData, signInError });
        
        if (signInError) {
          console.error('❌ サインインエラー:', signInError);
          setErrorMsg(signInError.message);
        } else {
          console.log('✅ サインイン成功、ページリロード');
          location.reload(); // ページをリロードしてログイン状態に
        }
      } else {
        console.log('✅ サインアップ成功');
        // サインアップ成功時もログイン状態にする
        alert('登録成功！');
        location.reload();
      }
    } catch (error) {
      console.error('💥 予期しないエラー:', error);
      setErrorMsg('エラーが発生しました: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleAuth} style={{ maxWidth: 320, margin: 'auto' }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{ width: '100%', padding: '0.5rem' }}
      >
        {loading ? '処理中…' : 'ログイン / 登録'}
      </button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </form>
  );
}
