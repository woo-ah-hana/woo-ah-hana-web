'use client';

import React, { useEffect } from 'react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import useCommunityStore from '@/app/store/community-store';

interface CommunityMenuProps {
  selectedCommunity: string;
  communityIds: { communityId: string; name: string }[];
}

export default function CommunityMenu({ selectedCommunity, communityIds }: CommunityMenuProps) {
  const { community, setCommunity } = useCommunityStore();

  const items: MenuProps['items'] = communityIds.map((community) => ({
    label: (
      <Link href={`/home?id=${community.communityId}`}>
        {community.name}
      </Link>
    ),
    key: community.communityId,
  }));

  const handleSelect = ({ key }: { key: string }) => {
    setCommunity(key);
    console.log(community);
  };

  useEffect(() => {
    if(!community){
      setCommunity(selectedCommunity);
    }
  }, [community, selectedCommunity, setCommunity]);

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[community || selectedCommunity]} // Zustand 상태를 우선 사용
      items={items}
      onSelect={handleSelect}
      className="custom-menu"
    />
  );
}
