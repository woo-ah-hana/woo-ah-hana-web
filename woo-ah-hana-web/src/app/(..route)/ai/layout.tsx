import Link from "next/link";

// TODO: 뒤로가기 아이콘
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return(
    <main>
      <div>
        {children}
      </div>
    </main>
  )
}