'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

/** 認証状態 (user, loading) を返すカスタムフック */
export function useSupabaseUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初回取得
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // 状態変化を購読
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
