import useSWR from 'swr';
import { fetcher } from '@/lib/fetchers';
import { UserFarms } from '@/lib/queries/farm-members';

export function useFarms() {
  const { data, error, isLoading, mutate } = useSWR<UserFarms>('/api/farms', fetcher);
  
  return {
    farms: data,
    isLoading,
    isError: error,
    mutate
  };
}

// Similar hooks for other resources like fields, tasks, etc.
export function useFarmDetails(farmId: number | null) {
  const { data, error, isLoading } = useSWR(
    farmId ? `/api/farms/${farmId}` : null,
    fetcher
  );
  
  return {
    farm: data,
    isLoading,
    isError: error
  };
}