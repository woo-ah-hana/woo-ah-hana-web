'use client';

import { useEffect, useState } from 'react';
import Bankbook from '@/app/ui/components/bankbook';
import { Skeleton, Divider, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';

interface LogDataType {
  id: number;
  date: string;
  description: string;
  amount: number;
  balance: number;
}

const items = [
  { key: '1', label: '1개월' },
  { key: '2', label: '3개월' },
  { key: '3', label: '6개월' },
  { key: '4', label: '1년' },
];

export default function AccountLog() {
  const [logs, setLogs] = useState<LogDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(items[0].label); // Default to the first item's label

  //입출금내역 임시 데이터
  const loadMoreLogs = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      const newLogs = Array.from({ length: 10 }, (_, index) => ({
        id: logs.length + index + 1,
        date: `2025-01-${String(logs.length + index + 1).padStart(2, '0')}`,
        description: index % 2 == 0 ? '스타벅스 성수역점' : '명가 닭한마리',
        amount: Math.floor(Math.random() * 10000),
        balance: 23400000 - Math.floor(Math.random() * 10000),
      }));
      setLogs((prevLogs) => [...prevLogs, ...newLogs]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreLogs();
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedLabel(selectedItem.label);
    }
  };

  return (
    <div className='p-5 flex flex-col gap-5'>
      <div className='flex justify-end'>
        <Dropdown
          menu={{
            items,
            onClick: handleMenuClick,
          }}
        >
          <Typography.Link>
            <Space className='text-[13px]'>
              최근{selectedLabel}
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>

      <InfiniteScroll
        dataLength={logs.length}
        next={loadMoreLogs}
        hasMore={logs.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      >
        <Bankbook
          title={'맛집탐방'}
          accountNumber={'12-3456-456-789'}
          balance={23400000}
          footer={<div></div>}
        />
        <List
          className='mt-5 text-[15px]'
          dataSource={logs}
          renderItem={(log) => (
            <List.Item key={log.id}>
              <List.Item.Meta
                title={
                  <div className='text-[17px] font-semibold'>
                    {log.description}
                  </div>
                }
                description={
                <div className='text-gray-500'>
                    {log.date}
                </div>
                }
              />
              <div className='flex flex-col items-end'>
                <div className='text-[17px] font-semibold'>
                  {log.amount.toLocaleString()}원
                </div>
                <div className='text-gray-500'>{log.balance.toLocaleString()}원</div>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}
