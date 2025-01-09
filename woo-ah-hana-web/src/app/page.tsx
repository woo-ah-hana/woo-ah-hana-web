import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog";
import AchromaticButton from "./ui/atom/button/achromatic-button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/molecule/card";

export default function Home() {
  return (
    <div className="p-20 grid grid-cols-3 gap-3">
      <Card className="bg-wooahMain text-white">
        <CardHeader>안녕</CardHeader>
        <CardContent>안녕</CardContent>
        <CardFooter><AchromaticButton variant={'outline'}>안녕</AchromaticButton></CardFooter>
      </Card>

      <Card>
        <CardHeader>안녕</CardHeader>
        <CardContent>안녕</CardContent>
        <CardFooter><AchromaticButton variant={'ghost'}>안녕</AchromaticButton></CardFooter>
      </Card>

      <Card>
        <CardHeader>안녕</CardHeader>
        <CardContent>안녕</CardContent>
        <CardFooter><AchromaticButton variant={'default'}>안녕</AchromaticButton></CardFooter>
      </Card>

      <Card>
        <CardHeader>안녕</CardHeader>
        <CardContent>안녕</CardContent>
        <CardFooter><AchromaticButton variant={'outline'}>안녕</AchromaticButton></CardFooter>
      </Card>

      <Card>
        <CardHeader>안녕</CardHeader>
        <CardContent>안녕</CardContent>
        <CardFooter><ExampleDialog/></CardFooter>
      </Card>
    </div>
  );
}

function ExampleDialog(){

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton>DialogTrigger</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="다이얼로그 이름">
        <div className="p-5 text-center">
          <p>기본 다이얼로그입니다.</p>
          <p>기본 다이얼로그입니다.</p>
          <p>기본 다이얼로그입니다.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}