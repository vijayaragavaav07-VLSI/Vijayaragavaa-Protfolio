import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface UseAdminCRUDOptions<T> {
  table: string;
  orderBy?: { column: keyof T & string; ascending?: boolean };
}

export function useAdminCRUD<T extends { id: string }>({ table, orderBy }: UseAdminCRUDOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderByStr = orderBy ? JSON.stringify(orderBy) : null;

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase.from(table).select('*');
      
      if (orderByStr) {
        const parsedOrder = JSON.parse(orderByStr);
        query = query.order(parsedOrder.column, { ascending: parsedOrder.ascending ?? true });
      }

      const { data: result, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setData(result as T[]);
    } catch (err: any) {
      console.error(`[Admin CMS] Error fetching from ${table}:`, err);
      setError(err.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [table, orderByStr]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (itemData: Partial<T>) => {
    try {
      const { data: newItem, error: createError } = await (supabase.from(table) as any)
        .insert([itemData])
        .select()
        .single();
        
      if (createError) throw createError;
      
      await fetchItems(); // Refresh the list
      return { data: newItem, error: null };
    } catch (err: any) {
      console.error(`Error creating item in ${table}:`, err);
      return { data: null, error: err.message };
    }
  };

  const updateItem = async (id: string, itemData: Partial<T>) => {
    try {
      const { data: updatedItem, error: updateError } = await (supabase.from(table) as any)
        .update(itemData)
        .eq('id', id)
        .select()
        .single();
        
      if (updateError) throw updateError;
      
      await fetchItems(); // Refresh the list
      return { data: updatedItem, error: null };
    } catch (err: any) {
      console.error(`Error updating item in ${table}:`, err);
      return { data: null, error: err.message };
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
        
      if (deleteError) throw deleteError;
      
      await fetchItems(); // Refresh the list
      return { error: null };
    } catch (err: any) {
      console.error(`Error deleting item in ${table}:`, err);
      return { error: err.message };
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
}
