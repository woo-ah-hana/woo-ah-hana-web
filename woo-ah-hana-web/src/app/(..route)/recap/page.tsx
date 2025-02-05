import RecapCarousel from "@/app/ui/components/recap/carousel";
import Header from "@/app/ui/components/header";

export default function Recap({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="h-full flex flex-col bg-white">
      <Header title="모임 결산" link={`/home?id=${searchParams.id}`} />
      <RecapCarousel />
    </div>
  );
}
