import { supabase } from '@/lib/supabaseClient';
import { cookies } from 'next/headers';
import AuthForm from '@/components/AuthForm';
import UserMenu from '@/components/UserMenu';

/**
 * サーバーコンポーネントでセッションを取得し、
 * ログイン済みならユーザー情報を表示。
 */
export default async function AuthPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;
  let user = null;

  if (accessToken) {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser(accessToken);
    user = currentUser;
  }

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>認証デモ</h2>
      {user ? (
        <UserMenu userEmail={user.email} />
      ) : (
        <AuthForm />
      )}
    </main>
  );
}
