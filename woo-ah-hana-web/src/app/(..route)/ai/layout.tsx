import Link from "next/link";

// TODO: 뒤로가기 아이콘
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return(
    <main>
      <div className="h-1/6">
        <div className="px-5 mt-5"><Link href={"/home"}>{'<'}</Link>{' '}{` AI 계획 세우기`}</div>
      </div>
      <div className="h-5/6">
        {children}
      </div>
    </main>
  )
}