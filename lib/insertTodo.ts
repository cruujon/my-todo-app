import { supabase } from './supabaseClient';

/**
 * title を受け取り、todos テーブルに 1 行 INSERT する
 * 成功すると挿入されたレコード（1 行）を返す
 */
export const insertTodo = async (title) => {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ title }])   // ← 配列形式で渡す
    .select()              // ← 挿入後に戻り値を取得
    .single();             // ← 1 行だけ返す

  if (error) {
    console.error('TODO の追加に失敗しました:', error.message);
    return null;
  }

  return data;             // { id, title, … } 形式
};