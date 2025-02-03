export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>{children}</div>
      {/* <div className="h-1/6">
        <div className="px-5 p-5">
          <Header title="모임" link="/home"/>
        </div>
      </div>
      <div className="h-5/6">{children}</div> */}
    </main>
  );
}
