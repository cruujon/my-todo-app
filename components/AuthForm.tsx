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
    console.log('🔧 Supabase クライアント:', supabase);

    try {
      // 1. signUp を試す
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
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
            console.log('✅ サインイン成功');
            console.log('👤 サインイン後のユーザー:', signInData.user);
            console.log('📋 サインイン後のセッション:', signInData.session);
            
            // 認証状態の変更を待ってからページリロード
            setTimeout(() => {
              console.log('🔄 ページリロード実行');
              window.location.href = window.location.origin;
            }, 1500);
          }
      } else {
        console.log('✅ サインアップ成功');
        console.log('👤 サインアップ後のユーザー:', signUpData.user);
        console.log('📋 サインアップ後のセッション:', signUpData.session);
        
        // サインアップ成功後、自動的にサインインを実行してセッションを確立
        if (signUpData.user && !signUpData.session) {
          console.log('🔄 サインアップ後、自動サインインを実行');
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          console.log('🔑 自動サインイン結果:', { signInData, signInError });
          
          if (signInError) {
            console.error('❌ 自動サインインエラー:', signInError);
            setErrorMsg('登録は成功しましたが、自動ログインに失敗しました: ' + signInError.message);
          } else {
            console.log('✅ 自動サインイン成功');
            console.log('👤 自動サインイン後のユーザー:', signInData.user);
            console.log('📋 自動サインイン後のセッション:', signInData.session);
            alert('登録成功！自動でログインしました。');
            
            // 認証状態の変更を待ってからページリロード
            setTimeout(() => {
              console.log('🔄 ページリロード実行');
              window.location.href = window.location.origin;
            }, 1500);
          }
        } else {
          // セッションが既に存在する場合
          alert('登録成功！');
          setTimeout(() => {
            console.log('🔄 ページリロード実行');
            window.location.href = window.location.origin;
          }, 1500);
        }
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
