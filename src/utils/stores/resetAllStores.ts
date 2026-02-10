import { useCarsStore } from '@/stores/carsStore';
import { useListsStore } from '@/stores/listsStore';

export const resetAllStores = () => {
  useCarsStore.getState().reset();
  useListsStore.getState().reset();
};
