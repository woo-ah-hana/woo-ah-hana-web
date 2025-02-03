import FeeSettingModal from "../account/fee-setting.modal";

interface AccountManagementManagerProps{
  fee: number;
  feePeriod: number
}

export function AccountManagementManager({fee, feePeriod}: AccountManagementManagerProps){
  return(
  <main>
    <div className="flex flex-col gap-5  text-[17px]">
      <div className="text-[20px]">모임 통장 관리자 설정</div>
      <div className="flex items-center justify-between align-baseline">
        <div>회비 금액</div>
        <div>{fee.toLocaleString()}원</div>
      </div>
      <div className="flex items-center justify-between align-baseline">
        <div>회비 주기</div>
        <div>매월 {feePeriod}일</div>
      </div>
      <FeeSettingModal />
    </div>
  </main>
  )
}