'use client'

import React from 'react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';

interface GroupMenuProps {
  selectedCommunity: string;
  communityIds: { communityId: string; name: string }[];
}

const GroupMenu: React.FC<GroupMenuProps> = ({ selectedCommunity, communityIds }) => {
  // const router = useRouter();
  const items: MenuProps['items'] = communityIds.map((community) => ({
    // label: community.name,
    label: (
      <Link href={`/home?id=${community.communityId}`}>
        {community.name}
      </Link>
    ),
    key: community.communityId,
  }));

  const handleSelected: MenuProps['onClick'] = (e) => {
    console.log(`Selected community key: ${e.key}`);
    // router.push(`/?selectedCommunity=${e.key}`);
    // 필요한 추가 작업
  };

  return (
    <Menu
      onClick={handleSelected}
      mode="horizontal"
      selectedKeys={[selectedCommunity]} 
      items={items}
      className="custom-menu"
    />
  );
};

export default GroupMenu;
