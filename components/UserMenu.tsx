'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function UserMenu({ userEmail }: { userEmail: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // 状態をリセット
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <span>{userEmail}</span>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}
