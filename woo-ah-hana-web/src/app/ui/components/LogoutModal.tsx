'use client'

import AchromaticButton from "../atom/button/achromatic-button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../molecule/dialog/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import {logout} from "@/app/business/auth/login.service";
import {useRouter} from "next/navigation";

export default function LogoutModal() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            // 로그아웃 처리
            await logout();
            // 로그인 페이지로 리디렉션
            router.push('/');
        } catch (error) {
            console.error("로그아웃 처리 실패", error);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <AchromaticButton variant={'outline'} className='mt-5 w-full'>
                    로그아웃
                </AchromaticButton>
            </DialogTrigger>
            <DialogContent title="로그아웃" className="p-6">
                <hr></hr>
                <p className="m-3">우아하나에서 로그아웃합니다.</p>
                <div className="flex flex-row gap-3">
                    <AchromaticButton variant={'outline'} className='mt-5 w-full' onClick={handleLogout}>
                        로그아웃
                    </AchromaticButton>
                    <AchromaticButton variant={'outline'} className='mt-5 w-full' onClick={handleCancel}>
                        취소
                    </AchromaticButton>
                </div>
            </DialogContent>
            <DialogClose></DialogClose>
        </Dialog>

    )
}