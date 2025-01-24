'use client'

import { Transfer } from "@/app/business/community/community.service"
import { Divider, Skeleton } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"
import { Card } from "../../molecule/card/card"

interface TransferListProps{
  transfers: Transfer[]
}

export default function TransferList({transfers}:TransferListProps){
  const TransferListItems: JSX.Element[] = transfers.map((item, index)=>{
    const transAmt= new Number(item.tranAmt).valueOf();
    const afterBalanceAmt = new Number(item.afterBalanceAmt).valueOf();
    return (
      <main key={index}>
        <Card className="p-3 border-0 rounded-none grid grid-cols-1 gap-3 shadow-none">
          <div className="grid grid-cols-2">
            <div>{`${item.branchName} ${item.printContent}`}</div>
            <div className={`text-right ${item.inoutType==='출금'?'':'text-wooahMain'}`}>{`${item.inoutType==='출금'?'-':''}${transAmt.toLocaleString()}원`}</div>
          </div>
          <div>
            <div className="grid grid-cols-2 text-slate-500 text-sm">
            <div>{`${item.tranDate as string}`}</div>
            <div className="text-right">{`${afterBalanceAmt.toLocaleString()}원`}</div>
            </div>
          </div>
        </Card>
        <hr></hr>
      </main>
    )
  })
  return(
    <InfiniteScroll
    dataLength={10}
    next={()=>{}}
    hasMore={true}
    loader={<Skeleton paragraph={{ rows: 1 }} active />}
    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    className="grid grid-cols-1 gap-2"
    >
    {TransferListItems}
    </InfiniteScroll>
  )
}