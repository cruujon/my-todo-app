import { supabase } from './supabaseClient';

/**
 * id に一致する行の title と is_complete を更新する
 */
export const updateTodo = async (id: number, newTitle: string, isComplete?: boolean) => {
  // ログイン中のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('ログインしていません');
  }

  const updateData: { title: string; is_complete?: boolean } = { title: newTitle };
  
  if (isComplete !== undefined) {
    updateData.is_complete = isComplete;
  }

  const { error } = await supabase
    .from('todos')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.id); // ユーザー固有のTODOのみ更新

  if (error) {
    console.error('更新に失敗しました:', error.message);
    throw error;
  }
};