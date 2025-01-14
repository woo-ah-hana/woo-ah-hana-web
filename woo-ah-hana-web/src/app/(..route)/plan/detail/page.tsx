export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const planId = searchParams.id as string;
  console.log(planId)
  return (
    <main>
      
    </main>
  )
}