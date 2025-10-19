import { supabase } from './supabaseClient';

/**
 * id に一致する行を削除する
 */
export const deleteTodo = async (id) => {
  // ログイン中のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('ログインしていません');
  }

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id); // ユーザー固有のTODOのみ削除

  if (error) {
    console.error('削除に失敗しました:', error.message);
    throw error;
  }
};