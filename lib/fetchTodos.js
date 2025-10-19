import { supabase } from './supabaseClient';
import type { Todo } from '@/types';

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('データの取得に失敗しました:', error.message);
    return [];
  }

  return data;
};