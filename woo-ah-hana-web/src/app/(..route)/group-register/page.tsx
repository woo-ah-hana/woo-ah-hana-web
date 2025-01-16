import { Card, CardContent } from "@/app/ui/molecule/card/card";
import Image from "next/image";
import IconPlus from '../../assets/img/icon-plus-circle.svg';
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import Link from "next/link";

export default function GroupRegister(){
    return(
        <div className="p-5 flex flex-col gap-8">
            <Card className="h-40 flex justify-center items-center">
                <Image src={IconPlus} alt="추가버튼" className="w-10"/>
            </Card>
            <Link href={'/group-register/form'}>
                <AchromaticButton className="h-10 w-full">모임 통장 추가하기</AchromaticButton>
            </Link>
        </div>
    );
}