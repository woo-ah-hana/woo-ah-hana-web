'use client';

import AchromaticButton from '../../atom/button/achromatic-button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '../../molecule/dialog/dialog';
import {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, List, Skeleton} from "antd";

interface LogDataType {
    tran_date: string;
    tran_time: string;
    inout_type: string;
    tran_type: string;
    print_content: string;
    tran_amt: string;
    after_balance_amt: string;
    branch_name: string;
}

export default function MemoryReceiptModal() {
    const [isOpen, setIsOpen] = useState(false);
    const handleCancelButton = () => {
        setIsOpen(false);
    };
    const [logs, setLogs] = useState<LogDataType[]>([]);
    const [loading, setLoading] = useState(false);

    //입출금내역 임시 데이터
    const loadMoreLogs = () => {
        if (loading) return;

        setLoading(true);
        setTimeout(() => {
            const newLogs = Array.from({ length: 10 }, (_, index) => ({
                tran_date: `2025-01-${String(logs.length + index + 1).padStart(2, '0')}`,
                tran_time: `12:${String(index % 60).padStart(2, '0')}:${String((index * 5) % 60).padStart(2, '0')}`,
                inout_type: index % 2 === 0 ? '입금' : '출금',
                tran_type: index % 2 === 0 ? '일반' : '자동이체',
                print_content: index % 2 === 0 ? '스타벅스 성수역점' : '명가 닭한마리',
                tran_amt: Math.floor(Math.random() * 10000).toString(),
                after_balance_amt: (23400000 - Math.floor(Math.random() * 10000)).toString(),
                branch_name: index % 2 === 0 ? '서울 강남' : '서울 종로',
            }));
            setLogs((prevLogs) => [...prevLogs, ...newLogs]);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        loadMoreLogs();
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <AchromaticButton className='w-full'>영수증</AchromaticButton>
            </DialogTrigger>
            <DialogContent className='p-6  '>
                <div className='flex flex-col gap-4'>
                    <div className='text-lg font-semibold'>영수증</div>
                    <div
                        id="scrollableDiv"
                        className="overflow-y-auto max-h-[55vh] border-t border-b border-gray-300"
                    >
                        <InfiniteScroll
                            dataLength={logs.length}
                            next={loadMoreLogs}
                            hasMore={logs.length < 50}
                            loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                className='mt-5 text-[13px]'
                                dataSource={logs}
                                renderItem={(log) => (
                                    <List.Item key={`${log.tran_date}-${log.tran_time}`}>
                                        <List.Item.Meta
                                            title={
                                                <div className='text-[15px] font-semibold'>
                                                    {log.print_content}
                                                </div>
                                            }
                                            description={
                                                <div className='text-gray-500'>
                                                    {log.tran_date} {log.tran_time}
                                                </div>
                                            }
                                        />
                                        <div className='flex flex-col items-end'>
                                            <div className='text-[15px] font-semibold'>
                                                {parseInt(log.tran_amt).toLocaleString()}원
                                            </div>
                                            <div className='text-gray-500'>
                                                잔액: {parseInt(log.after_balance_amt).toLocaleString()}원
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                        <div className="flex justify-between w-full">
                            <div>전체 소비 금액</div>
                            <div>100,000원</div>
                        </div>
                        <div className="flex justify-between w-full">
                            <div>인당 소비 금액</div>
                            <div>25,000원</div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <AchromaticButton
                            className='w-full'
                            variant={'outline'}
                            onClick={handleCancelButton}
                        >
                            닫기
                        </AchromaticButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}