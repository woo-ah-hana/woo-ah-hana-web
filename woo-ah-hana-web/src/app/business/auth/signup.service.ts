'use server';
import { FormState } from '@/app/ui/molecule/form/form-root';
import { API_PATH } from '@/app/utils/http/api-query';
import { HttpError } from '@/app/utils/http/http-error';
import { AxiosError } from "axios";
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { z } from 'zod';

// 🔹 회원가입 입력 값 검증 스키마
const RegisterFormSchema = z.object({
  username: z.string().length(11, '올바른 전화번호가 아닙니다'),
  name: z.string(),
  phoneNumber: z.string().length(11, '올바른 전화번호가 아닙니다'),
  password: z.string(),
  confirmPassword: z.string(),
  accountNumber: z.string(),
  bankTranId: z.string(),
  fcmToken: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

type RegisterRequestBody = z.infer<typeof RegisterFormSchema>;

export async function authenticateRegister(prevState: FormState, formData: FormData): Promise<FormState> {
  // 🔹 FormData에서 값 추출 및 검증
  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get('phoneNumber') as string,
    name: formData.get('name') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    accountNumber: formData.get('accountNumber') as string,
    bankTranId: formData.get('bankTranId') as string,
    fcmToken: 'mock-fcm-token' as string,
  });
  console.log(formData.get('name'));
  console.log(formData.get('accountNumber'));
  console.log(formData.get('password'));


  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: '양식에 맞춰 다시 입력해주세요.',
    };
  }

  // 🔹 비밀번호 확인 필드는 API 요청에서 제외
  const { confirmPassword, ...body }: RegisterRequestBody = {...validatedFields.data};
  

  try {
    console.log(confirmPassword);
    console.log(`${API_PATH}/member/signup`);
    const response = await fetch(`${API_PATH}/member/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new HttpError(response.status, '회원가입 실패');
    }

    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '회원가입이 성공적으로 완료되었습니다.',
    };
  } catch (error) {
    // TODO: 백엔드와 예외 메세지 처리 합의
    console.log(error);
    if(error instanceof Error && error instanceof AxiosError){
          const exception = await httpErrorHandler(error);
          return {
            isSuccess: false,
            isFailure: true,
            validationError: {},
            message: exception.message,
          };
        }else{
          return {
            isSuccess: false,
            isFailure: true,
            validationError: {},
            message: '회원가입에 실패했습니다.. 맞나?'
          }
        }
  }
}
