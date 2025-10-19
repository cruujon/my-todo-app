'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

/** 認証状態 (user, loading) を返すカスタムフック */
export function useSupabaseUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初回取得 - セッションから取得を試行
    const getInitialSession = async () => {
      console.log('🔍 初回セッション取得開始');
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('📋 セッション取得結果:', { session, error });
        
        if (error) {
          console.error('❌ セッション取得エラー:', error);
        }
        
        const currentUser = session?.user || null;
        console.log('👤 初回ユーザー取得結果:', currentUser);
        setUser(currentUser);
      } catch (err) {
        console.error('💥 セッション取得で予期しないエラー:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 状態変化を購読
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 認証状態変更:', { event, user: session?.user });
        
        // セッションから直接ユーザーを取得
        const currentUser = session?.user || null;
        setUser(currentUser);
        setLoading(false);
        
        // セッション情報もログ出力
        console.log('📋 セッション詳細:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          accessToken: session?.access_token ? 'あり' : 'なし',
          expiresAt: session?.expires_at
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
