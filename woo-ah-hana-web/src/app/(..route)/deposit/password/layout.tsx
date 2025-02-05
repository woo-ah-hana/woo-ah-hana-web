import { Suspense } from "react";


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return(
    <main className="h-full">
      {/* <div> */}
        <Suspense>
          {children}
        </Suspense>
      {/* </div> */}
    </main>
  )
}