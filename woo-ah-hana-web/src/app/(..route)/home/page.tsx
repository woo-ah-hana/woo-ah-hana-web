'use client';

import React, { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import Bankbook from '@/app/ui/components/bankbook';
import CardMenu from '@/app/ui/components/card-menu';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

interface GroupData {
  key: string;
  title: string;
  accountNumber: string;
  balance: number;
}

//모임통장 임시 데이터
const groupData: GroupData[] = [
  {
    key: 'group1',
    title: '모임 1',
    accountNumber: '012-456543-465',
    balance: 1500000,
  },
  {
    key: 'group2',
    title: '모임 2',
    accountNumber: '023-7896543-123',
    balance: 3450000,
  },
  {
    key: 'group3',
    title: '모임 3',
    accountNumber: '034-896543-465',
    balance: 20000000,
  },
];

const items: MenuItem[] = groupData.map((group) => ({
  label: group.title,
  key: group.key,
}));

const GroupMenu: React.FC<{ onMenuSelect: (key: string) => void }> = ({
  onMenuSelect,
}) => {
  const [current, setCurrent] = useState('group1');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key); // 선택된 모임 상태 업데이트
    onMenuSelect(e.key); // 부모(Home)에게 선택된 모임 키 전달
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]} // selectedKeys와 current 상태를 일치시키기
      mode='horizontal'
      items={items}
      className='custom-menu'
    />
  );
};

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState('group1');
  const router = useRouter();

  const renderContent = () => {
    const group = groupData.find((g) => g.key === selectedGroup);
    if (!group) return null;

    return (
      <div onClick={()=> router.push(`/account-log`)}>
        <Bankbook
          title={group.title}
          accountNumber={group.accountNumber}
          balance={group.balance}
        />
      </div>
    );
  };

  const selectedGroupTitle = groupData.find((g) => g.key === selectedGroup)?.title || '';

  return (
    <div>
      {/* 모임 선택 */}
      <GroupMenu onMenuSelect={setSelectedGroup} />
      <div className='p-5'>
        <div>{renderContent()}</div>
        <h2 className='mt-8 mb-5 text-[20px] font-bold text-wooahMain'>{selectedGroupTitle} 홈</h2>
        <CardMenu />
      </div>
    </div>
  );
}