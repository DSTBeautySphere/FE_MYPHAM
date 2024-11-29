import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { login } from "@/redux/features/auth/auth.slice";
import authenticationService from "@/services/authentication.service";
import tokenUtil from "@/utils/token.util";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface IFormData {
  username: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
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
        username: formData.username,
        password: formData.password,
      };
      const response = await authenticationService.login(payload);
      return response.data;
    },
    onSuccess: async (data) => {
      const { user } = data;
      tokenUtil.setToken("user", user);
      dispatch(login(user));
      navigate("/");
    },
    onError: (error: any) => {
      const { message } = error.response.data;
      toast.error(message);
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <div
        className='w-[500px] mx-auto p-[40px] my-[80px] rounded-[24px] border-[#E9E9E9] border'
        style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}>
        <Heading text='Đăng nhập' />
        <form onSubmit={onSubmit} autoComplete='off'>
          <div className='mb-5'>
            <Input label='Tên đăng nhập' id='username-input' type='text' name='username' value={formData.username} onChange={handleChange} />
          </div>
          <div className='mb-5'>
            <Input label='Mật khẩu' id='password-input' type='password' name='password' value={formData.password} onChange={handleChange} />
          </div>
          <div className='flex items-center justify-start mb-5'>
            <Link to={"/forgot-password"} className='text-slate-950 hover:text-blue-500'>
              Quên mật khẩu?
            </Link>
          </div>
          <div className='grid'>
            <Button type='submit' disabled={mutation.isPending}>
              Đăng nhập
            </Button>
          </div>
          <div className='mt-10 text-center'>
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link to={"/account/register"} className='font-bold text-slate-950 hover:text-blue-500'>
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
