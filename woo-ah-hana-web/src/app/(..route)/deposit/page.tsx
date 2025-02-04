"use client";

import { useRouter } from "next/navigation";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import TextInput from "@/app/ui/atom/text-input/text-input";
import { Card } from "@/app/ui/molecule/card/card";
import { useEffect, useState } from "react";
import useCommunityStore from "@/app/store/community-store";
import Header from "@/app/ui/components/header";
import {
  depositInfo,
  DepositInfoResponseDTO,
} from "@/app/business/account/account.service";
import { message } from "antd";

export default function Deposit() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [overBalance, setOverBalance] = useState(false);
  const community = useCommunityStore((state) => state.community);
  const [depositInfoData, setDepositInfoData] =
    useState<DepositInfoResponseDTO | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchDepositInfo = async () => {
      try {
        const response = await depositInfo({ communityId: community.id });
        if (response.isSuccess && response.data) {
          setDepositInfoData(response.data);
        } else {
          console.error("모임 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchDepositInfo();
  }, []);

  const handleNavigation = () => {
    if (amount && !overBalance) {
      const communityAccountNumber =
        depositInfoData?.communityAccountNumber || "";
      const communityAccountBank = depositInfoData?.communityAccountBank || "";
      const communityAccountName = depositInfoData?.communityAccountName || "";

      const queryParams = new URLSearchParams({
        communityId: community.id,
        communityAccountNumber,
        communityAccountBank,
        communityAccountName,
        amount,
      }).toString();

      router.push(`/deposit/check?${queryParams}`);
    } else if (amount && overBalance) {
      messageApi.open({
        type: "error",
        content: "잔액이 부족합니다.",
        duration: 3,
        className: "font-bold",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "금액을 입력해주세요.",
        duration: 3,
        className: "font-bold",
      });
    }
  };
  const handleAmountChange = (value: string) => {
    if (
      Number(value).valueOf() >
      (depositInfoData?.memberAccountBalance as unknown as number)
    ) {
      setOverBalance(true);
    } else {
      setOverBalance(false);
      setAmount(value);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="h-full flex flex-col">
        <Header title="입금" link={`/home?id=${community.id}`} />
        <div className="px-10 py-5 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-10">
            <div className="border-none shadow-none">
              <div className="flex items-end gap-1">
                <div className="text-2xl font-semibold">내 통장</div>
                <div className="text-xl">에서</div>
              </div>
              <p className="text-sm text-gray-400">
                출금 가능 금액{" "}
                {depositInfoData?.memberAccountBalance.toLocaleString("ko-KR")}
                원
              </p>
            </div>
            <div className="border-none shadow-none">
              <span className="text-md">
                {depositInfoData?.communityAccountName}{" "}
              </span>
              <h1 className="text-2xl">
                {depositInfoData?.communityAccountBank} 모임통장
                <span className="text-lg">으로</span>
              </h1>
              <p className="text-sm text-gray-400">
                계좌번호 {depositInfoData?.communityAccountNumber}
              </p>
            </div>
            <Card className="border-none shadow-none">
              <TextInput
                placeholder="얼마나 옮길까요?"
                className="border-none w-full"
                type={"number"}
                onValueChange={handleAmountChange}
              ></TextInput>
            </Card>
          </div>
          <div>
            <AchromaticButton
              className="w-full px-5 h-10 text-xl font-light"
              onClick={handleNavigation}
            >
              확인
            </AchromaticButton>
          </div>
        </div>
      </div>
    </>
  );
}
