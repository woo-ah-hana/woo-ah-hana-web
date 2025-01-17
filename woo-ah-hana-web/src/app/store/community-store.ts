import { create } from 'zustand';

interface CommunityState {
  community: string; // 현재 선택된 커뮤니티 ID
  setCommunity: (communityId: string) => void; // 커뮤니티 변경 함수
}

const useCommunityStore = create<CommunityState>((set) => ({
  community: '',
  setCommunity: (communityId) => set({ community: communityId }),
}));

export default useCommunityStore;
