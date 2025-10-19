'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

/** 認証状態 (user, loading) を返すカスタムフック */
export function useSupabaseUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初回取得
    const getInitialUser = async () => {
      console.log('🔍 初回ユーザー取得開始');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('👤 初回ユーザー取得結果:', user);
      setUser(user);
      setLoading(false);
    };

    getInitialUser();

    // 状態変化を購読
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 認証状態変更:', { event, user: session?.user });
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
