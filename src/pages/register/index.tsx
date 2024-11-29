import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import authenticationService from "@/services/authentication.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface IFormData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };
      const response = await authenticationService.register(payload);
      return response.data;
    },
    onSuccess: async (data) => {
      const { isSuccess } = data;

      if (isSuccess) {
        navigate("/account/login");
      }
    },
    onError: (error: any) => {
      const { message } = error.response.data;
      toast.error(message);
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    mutation.mutate();
  };

  return (
    <>
      <div
        className='w-[500px] mx-auto p-[40px] my-[80px] rounded-[24px] border-[#E9E9E9] border'
        style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}>
        <Heading text='Đăng ký' />
        <form onSubmit={onSubmit} autoComplete='off'>
          <div className='mb-5'>
            <Input label='Họ và tên' id='fullName-input' type='text' name='fullName' value={formData.fullName} onChange={handleChange} />
          </div>
          <div className='mb-5'>
            <Input label='Tên đăng nhập' id='username-input' type='text' name='username' value={formData.username} onChange={handleChange} />
          </div>
          <div className='mb-5'>
            <Input label='Email' id='email-input' type='email' name='email' value={formData.email} onChange={handleChange} />
          </div>
          <div className='mb-5'>
            <Input label='Mật khẩu' id='password-input' type='password' name='password' value={formData.password} onChange={handleChange} />
          </div>
          <div className='mb-5'>
            <Input
              label='Xác nhận Mật khẩu'
              id='confirm-input'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className='grid'>
            <Button type='submit' disabled={mutation.isPending}>
              Tạo tài khoản
            </Button>
          </div>
          <div className='mt-10 text-center'>
            <p>
              Bạn đã có tài khoản?{" "}
              <Link to={"/account/login"} className='font-bold text-slate-950 hover:text-blue-500'>
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
