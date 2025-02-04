import SignupForm from "@/app/ui/components/auth/signup-form";

export default async function Home() {

  return (
    <div className='px-10 mb-10 flex flex-col'>
      <div className="mb-10 mt-10">
        <SignupForm/>
      </div>
    </div>
  );
}