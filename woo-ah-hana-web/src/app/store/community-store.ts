import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// TODO: 커뮤니티 객체 전체 관리
interface CommunityState {
  community: string;
  setCommunity: (communityId: string) => void;
}

const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      community: '',
      setCommunity: (communityId) => set({ community: communityId }),
    }),
    {
      name: 'community-storage',
    }
  )
);

export default useCommunityStore;
