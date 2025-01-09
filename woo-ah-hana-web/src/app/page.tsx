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
        <CardFooter><AchromaticButton variant={'outline'}>안녕</AchromaticButton></CardFooter>
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
    </div>
  );
}
