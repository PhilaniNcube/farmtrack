import { useEffect, useState, use } from 'react';
import { useFarmStore } from './farm-store';
import type { Farm } from '@/lib/schema/farms';
import { getUserFarms } from '../queries/farm-members';

/**
 * A hook that combines the farm store with farm data fetching functionality.
 * Can be used with an optional fetch function to load farm details when only an ID is available.
 */
export function useSelectedFarm(options?: {
  fetchFarm?: (id: number) => Promise<Farm | null>;
}) {
  const { fetchFarm } = options || {};
  const { selectedFarm, selectedFarmId, setSelectedFarm, setSelectedFarmId, clearSelectedFarm } = useFarmStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);



  // Fetch farm data if we only have the ID but not the full farm data
  useEffect(() => {


    const loadFarm = async () => {

      

      if (selectedFarmId && !selectedFarm && fetchFarm) {
        try {
          setIsLoading(true);
          setError(null);
          const farm = await fetchFarm(selectedFarmId);
          if (farm) {
            setSelectedFarm(farm);
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch farm details'));
          console.error('Error fetching farm details:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadFarm();
  }, [selectedFarmId, selectedFarm, fetchFarm, setSelectedFarm]);

  return {
    farm: selectedFarm,
    farmId: selectedFarmId,
    setFarm: setSelectedFarm,
    setFarmId: setSelectedFarmId,
    clearFarm: clearSelectedFarm,
    isLoading,
    error,
  };
}