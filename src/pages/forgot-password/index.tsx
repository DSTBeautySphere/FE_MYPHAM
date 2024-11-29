import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import authenticationService from "@/services/authentication.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await authenticationService.checkUsername(username);
      return response.data;
    },
    onSuccess: async (data) => {
      const { isSuccess } = data;

      if (!isSuccess) {
        toast.error("Tài khoản không tồn tại!");
        return;
      }

      setIsSuccess(true);
    },
    onError: (error: any) => {
      const { message } = error.response.data;
      toast.error(message);
    },
  });

  const mutationChangePassword = useMutation({
    mutationFn: async () => {
      const payload = {
        username: username,
        password: password,
      };
      const response = await authenticationService.changePassword(payload);
      return response.data;
    },
    onSuccess: async (data) => {
      const { isSuccess } = data;
      if (isSuccess) {
        toast.success("Đổi mật khẩu thành công");
        navigate("/account/login");
      }
    },
    onError: (error: any) => {
      const { message } = error.response.data;
      toast.error(message);
    },
  });

  const onSubmitChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    mutationChangePassword.mutate();
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <div
        className='w-[500px] mx-auto p-[40px] my-[80px] rounded-[24px] border-[#E9E9E9] border'
        style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}>
        <Heading text='Quên mật khẩu' />
        {!isSuccess ? (
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
              <Button type='submit' disabled={mutation.isPending}>
                Tiếp tục
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmitChangePassword} autoComplete='off'>
            <div className='mb-5'>
              <Input
                label='Mật khẩu mới'
                id='password-input'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-5'>
              <Input
                label='Xác nhận mật khẩu'
                id='confirm-input'
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='grid'>
              <Button type='submit' disabled={mutationChangePassword.isPending}>
                Xác nhận
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
