'use client';

import React, { useEffect } from 'react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import useCommunityStore from '@/app/store/community-store';
import { Community } from '@/app/business/community/community';
import { getCommunity } from '@/app/business/community/community.service';

interface CommunityMenuProps {
  selectedCommunity: Community;
  communityIds: { communityId: string; name: string }[];
}

// TODO: 클라이언트 컴포넌트에서 굳이 API 요청을 보낼 필요가 있을까? 상태 관리를 위해서 - 리팩토링 필요
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

  const handleSelect = async (key:string) => {
    await getCommunity(key).then((res)=>{
      setCommunity(res.data as Community);
    })
  };

  useEffect(() => {
    console.log(selectedCommunity);
    setCommunity(selectedCommunity);
  }, [community, selectedCommunity, setCommunity]);

  return (
    <Menu
      mode="horizontal"
      items={items}
      onSelect={(selectInfo)=>{handleSelect(selectInfo.selectedKeys[0])}}
      className="custom-menu"
      defaultSelectedKeys={[selectedCommunity.id]}
    />
  );
}
