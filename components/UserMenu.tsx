'use client';

import { supabase } from '@/lib/supabaseClient';

export default function UserMenu({ userEmail }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.reload(); // 状態を即反映
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <span>{userEmail}</span>
      <button onClick={handleLogout} style={{ marginLeft: '0.5rem' }}>
        ログアウト
      </button>
    </div>
  );
}
