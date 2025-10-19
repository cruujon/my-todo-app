import { supabase } from './supabaseClient';

/**
 * id に一致する行を削除する
 */
export const deleteTodo = async (id) => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('削除に失敗しました:', error.message);
  }
};