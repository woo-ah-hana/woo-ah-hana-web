// "use client";

// import { RiDeleteBin6Line } from "react-icons/ri";
// import { deletePost } from "@/app/business/memory/memory.service";

// interface DeleteButtonProps {
//   postId: string;
// }

// export default function DeleteButton({ postId }: DeleteButtonProps) {
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await deletePost(postId);
//       if (response.isSuccess) {
//         alert("삭제 성공!");
//       } else {
//         alert("삭제 실패.");
//       }
//     } catch (error) {
//       console.error("삭제 중 오류 발생:", error);
//       alert("삭제 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex items-center">
//       <button
//         type="submit"
//         className="cursor-pointer text-red-500 hover:text-red-700"
//       >
//         <RiDeleteBin6Line />
//       </button>
//       <button type="submit" className="cursor-pointer text-blue-500">
//         delete
//       </button>
//     </form>
//   );
// }
