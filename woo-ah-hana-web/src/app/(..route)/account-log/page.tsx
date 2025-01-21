"use client";

import { useEffect, useState } from "react";
import Bankbook from "@/app/ui/components/bankbook";
import { Skeleton, Divider, List } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import {
  getTransferRecords,
  TransferRecordRequestDTO,
  TransferRecordResponseDTO
} from "@/app/business/account/account.service";
import {convertTommdd} from "@/app/utils/convert";
import {CommunityInfoResponseDTO, getCommunityInfo} from "@/app/business/community/community.service";

interface LogDataType {
  id: number;
  date: string;
  description: string;
  amount: number;
  balance: number;
}

const items = [
  { key: "1", label: "1개월" },
  { key: "2", label: "3개월" },
  { key: "3", label: "6개월" },
  { key: "4", label: "1년" },
];

export default function AccountLog() {
  const [logs, setLogs] = useState<TransferRecordResponseDTO[]>([]); // 현재 표시된 거래 내역
  const [allLogs, setAllLogs] = useState<TransferRecordResponseDTO[]>([]); // 전체 거래 내역
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 확인
  const [selectedLabel, setSelectedLabel] = useState<string>(items[0].label); // 선택된 레이블
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [accountInfo, setAccountInfo] = useState<CommunityInfoResponseDTO>();
  const pageSize = 10; // 한 페이지에 10개씩

  // const loadAccountInfo = async () => {
  //   try {
  //     const responseInfo = await getCommunityInfo('a351be7b-de51-42df-be23-9b20012fb31d');
  //     setAccountInfo(responseInfo.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }

  // 전체 데이터 받아오는 함수
  const loadAllData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const requestBody: TransferRecordRequestDTO = {
        communityId: 'a351be7b-de51-42df-be23-9b20012fb31d', // 예시 communityId
        recentMonth: 6, // 예시 6개월 데이터
      };

      const response = await getTransferRecords(requestBody);
      if (response.isSuccess && response.data) {
        setAllLogs(response.data); // 전체 데이터를 allLogs에 저장
        setLogs(response.data.slice(0, pageSize)); // 처음 10개 데이터 표시
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 더 많은 데이터를 로드하는 함수
  const loadMoreData = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = currentPage + 1;

    setTimeout(() => {
      // 10개씩 추가하기
      const newLogs = allLogs.slice(currentPage * pageSize, nextPage * pageSize);
      setLogs((prevLogs) => [...prevLogs, ...newLogs]); // 기존 logs에 새로운 데이터를 추가
      setCurrentPage(nextPage); // 현재 페이지 업데이트

      // 더 이상 데이터가 없으면 hasMore를 false로 설정
      if (newLogs.length < pageSize) {
        setHasMore(false);
      }
      setLoading(false);
    }, 1000);

  };

  // 컴포넌트가 처음 마운트될 때 전체 데이터를 불러옴
  useEffect(() => {
    loadAllData();
    //loadAccountInfo();
  }, []);

  // 메뉴 클릭 시 선택된 레이블에 맞는 데이터 로드
  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedLabel(selectedItem.label); // 선택된 레이블로 변경
      setLogs([]); // logs 초기화
      setAllLogs([]); // 전체 로그 초기화
      setCurrentPage(1); // 페이지 초기화
      setHasMore(true); // 더보기 초기화
      loadAllData(); // 새로 데이터 로드
    }
  };

  return (
      <div className="p-5 flex flex-col gap-5">
        <div className="flex justify-end">
          <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
          >
            <Typography.Link>
              <Space className="text-[13px]">
                최근{selectedLabel}
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        </div>

        <Bankbook
            title={"accountInfo?.name"}
            accountNumber={"accountInfo?.accountNumber"}
            balance={"accountInfo?.balance"}
            footer={<div></div>}
        />
        <InfiniteScroll
            dataLength={logs.length}
            next={loadMoreData}
            hasMore={hasMore} // hasMore을 allLogs.length를 기준으로 변경
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
          <List
              className="mt-5 text-[15px]"
              dataSource={logs}
              renderItem={(log) => (
                  <List.Item key={log.tranDate}>
                    <List.Item.Meta
                        title={<div className="text-[17px] font-semibold">{log.printContent}</div>}
                        description={<div className="text-gray-500">{convertTommdd(log.tranDate)} {log.tranTime}</div>}
                    />
                    <div className="flex flex-col items-end">
                      {log.inoutType == '입금' ? <div className="text-[17px] font-semibold text-blue-700">
                            {parseInt(log.tranAmt, 10).toLocaleString()}원
                          </div> :
                          <div className="text-[17px] font-semibold">
                            {parseInt(log.tranAmt, 10).toLocaleString()}원
                          </div>}
                      <div className="text-gray-500">
                        {parseInt(log.afterBalanceAmt, 10).toLocaleString()}원
                      </div>
                    </div>
                  </List.Item>
              )}
          />
        </InfiniteScroll>
      </div>
  );
}
