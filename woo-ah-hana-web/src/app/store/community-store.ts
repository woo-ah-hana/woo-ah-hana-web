import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Community } from '../business/community/community';

interface CommunityState {
  community: Community;
  setCommunity: (community: Community) => void;
}

const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      community: {
        id: '0', 
        name: '0', 
        accountNumber: '0', 
        managerId:'0', 
        fee: 0, 
        feePeriod: 0, 
        credit:0
      },
      setCommunity: (community) => set({ community: community }),
    }),
    {
      name: 'community-storage',
    }
  )
);

export default useCommunityStore;
