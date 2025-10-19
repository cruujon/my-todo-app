import { supabase } from './supabaseClient';
import type { Todo } from '@/types';

export const fetchTodos = async (): Promise<Todo[]> => {
  // ログイン中のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('ログインしていません');
  }

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id) // ユーザー固有のTODOのみ取得
    .order('created_at', { ascending: false });

  if (error) {
    console.error('データの取得に失敗しました:', error.message);
    return [];
  }

  return data;
};