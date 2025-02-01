import { Suspense } from "react";


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return(
    <main>
      <div>
        <Suspense>
          {children}
        </Suspense>
      </div>
    </main>
  )
}