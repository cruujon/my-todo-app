import { supabase } from '@/lib/supabaseClient';

/**
 * 現在のユーザー情報とTODOデータをデバッグ表示する
 */
export const debugUserAndTodos = async () => {
  console.log('=== デバッグ情報 ===');
  
  // 1. 現在のユーザー情報を取得
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error('ユーザー取得エラー:', userError);
    return;
  }
  
  if (!user) {
    console.log('❌ ユーザーがログインしていません');
    return;
  }
  
  console.log('✅ ログインユーザー:', {
    id: user.id,
    email: user.email,
    created_at: user.created_at
  });
  
  // 2. 全TODOデータを取得（RLS確認用）
  const { data: allTodos, error: allTodosError } = await supabase
    .from('todos')
    .select('*');
  
  if (allTodosError) {
    console.error('全TODO取得エラー:', allTodosError);
  } else {
    console.log('📋 全TODOデータ:', allTodos);
  }
  
  // 3. ユーザー固有のTODOデータを取得
  const { data: userTodos, error: userTodosError } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id);
  
  if (userTodosError) {
    console.error('ユーザーTODO取得エラー:', userTodosError);
  } else {
    console.log('👤 ユーザー固有のTODO:', userTodos);
  }
  
  // 4. テーブル構造を確認
  const { data: tableInfo, error: tableError } = await supabase
    .from('todos')
    .select('*')
    .limit(1);
  
  if (tableError) {
    console.error('テーブル構造確認エラー:', tableError);
  } else {
    console.log('🗃️ テーブル構造サンプル:', tableInfo);
  }
  
  console.log('=== デバッグ終了 ===');
};
