import { supabase } from './supabaseClient';

/**
 * id に一致する行の title を newTitle で更新する
 */
export const updateTodo = async (id, newTitle) => {
  const { error } = await supabase
    .from('todos')
    .update({ title: newTitle })
    .eq('id', id);

  if (error) {
    console.error('更新に失敗しました:', error.message);
  }
};