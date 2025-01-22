import TextInput from "@/app/ui/atom/text-input/text-input";
import AccountAuthModal from "@/app/ui/components/account/account-auth.modal";
import Header from "@/app/ui/components/header";

export default function RegisterAccount(){
    return(
        <div className='h-full flex flex-col'>

        
              <Header title='모임통장 추가하기' link='/community-register' />
        <div className='flex flex-col gap-3'>
          <div>
            하나은행 모임 <br />
            <span className='font-semibold'>계좌번호</span>를 입력해주세요
          </div>
          <TextInput placeholder='ex) 01-9876-1234-5678' />
          <AccountAuthModal />
        </div>
        </div>
    )
}