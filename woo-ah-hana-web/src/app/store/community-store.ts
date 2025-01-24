import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommunityState {
  community: string; // 현재 선택된 커뮤니티 ID
  setCommunity: (communityId: string) => void; // 커뮤니티 변경 함수
}

const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      community: '',
      setCommunity: (communityId) => set({ community: communityId }),
    }),
    {
      name: 'community-storage', // 로컬 스토리지 키 이름
    }
  )
);

export default useCommunityStore;
