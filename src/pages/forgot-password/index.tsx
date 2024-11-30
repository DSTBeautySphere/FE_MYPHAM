import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import authenticationService from "@/services/authentication.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [username, setUsername] = useState<string>("");

  const mutationSendEmail = useMutation({
    mutationFn: async () => {
      const response = await authenticationService.changePasswordByEmail(username);
      return response.data;
    },
    onSuccess: (data) => {
      const { isSuccess } = data;

      if (isSuccess) {
        toast.success("Liên kết thay đổi mật khẩu đã được gửi đến email của bạn!");
      } else {
        toast.error("Gửi email thất bại, vui lòng thử lại.");
      }
    },
    onError: (error: any) => {
      const { message } = error.response?.data || {};
      toast.error(message || "Đã xảy ra lỗi, vui lòng thử lại.");
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim()) {
      toast.error("Vui lòng nhập tên đăng nhập.");
      return;
    }
    mutationSendEmail.mutate();
  };

  return (
    <div
      className='w-[500px] mx-auto p-[40px] my-[80px] rounded-[24px] border-[#E9E9E9] border'
      style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}>
      <Heading text='Quên mật khẩu' />
      <form onSubmit={onSubmit} autoComplete='off'>
        <div className='mb-5'>
          <Input
            label='Tên đăng nhập'
            id='username-input'
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='grid'>
          <Button type='submit' disabled={mutationSendEmail.isPending}>
            Gửi email
          </Button>
        </div>
      </form>
    </div>
  );
}
