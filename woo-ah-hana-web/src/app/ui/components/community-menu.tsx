'use client';

import React, { useEffect } from 'react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import useCommunityStore from '@/app/store/community-store';
import { Community } from '@/app/business/community/community';

interface CommunityMenuProps {
  selectedCommunity: Community;
  communityIds: { communityId: string; name: string }[];
}


export default function CommunityMenu({ selectedCommunity, communityIds }: CommunityMenuProps) {
  const { community, setCommunity } = useCommunityStore();

  const items: MenuProps['items'] = communityIds.map((communityInfo) => ({
    label: (
      <Link href={`/home?id=${communityInfo.communityId}`}>
        {communityInfo.name}
      </Link>
    ),
    key: communityInfo.communityId,
  }));

  const handleSelect = ({ community }: { community: Community }) => {
    setCommunity(community);
  };

  useEffect(() => {
    if(!community){
      setCommunity(selectedCommunity);
    }
  }, [community, selectedCommunity, setCommunity]);

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedCommunity.id || community.id]} // Zustand 상태를 우선 사용
      items={items}
      onSelect={()=>{handleSelect({community: selectedCommunity})}}
      className="custom-menu"
    />
  );
}
