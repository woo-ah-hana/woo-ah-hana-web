'use client'

import React from 'react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';

interface CommunityMenuProps {
  selectedCommunity: string;
  communityIds: { communityId: string; name: string }[];
}

export default function CommunityMenu({ selectedCommunity, communityIds } : CommunityMenuProps){
  const items: MenuProps['items'] = communityIds.map((community) => ({
    label: (
      <Link href={`/home?id=${community.communityId}`}>
        {community.name}
      </Link>
    ),
    key: community.communityId,
  }));

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedCommunity]} 
      items={items}
      className="custom-menu"
    />
  );
}