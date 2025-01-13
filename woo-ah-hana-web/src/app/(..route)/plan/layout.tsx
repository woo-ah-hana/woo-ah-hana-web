export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return(
    <main>
      <div className="p-3 h-1/6">
        모임
      </div>
      <div className="h-5/6">
        {children}
      </div>
    </main>
  )
}