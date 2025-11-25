import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '~/assets/images/VNN_Building.jpg';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { FieldDescription, FieldGroup } from '~/components/ui/field';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Spinner } from '~/components/ui/spinner';
import { useLogin } from '~/hooks/queries/auth/useLogin';
import { loginSchema, type LoginFormValues } from '~/validations/auth.validation';

export default function LoginPage() {
  const login = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? '/';

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) =>
    login.mutate(values, {
      onSuccess: () => navigate(from, { replace: true }),
      onError: (error) => {
        const err = error as AxiosError<{ message?: string; code?: string }>;
        toast.error(err.response?.data?.code, {
          description: err.response?.data?.message ?? 'Đăng nhập thất bại!',
        });
      },
    });

  return (
    <div className='bg-muted flex min-h-svh items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-4xl'>
        <div className='flex flex-col gap-6'>
          {/* <==> CARD <==> */}
          <Card className='overflow-hidden p-0'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              {/* <==> IMAGE <==> */}
              <div className='hidden rounded-l-sm bg-white md:block'>
                <img src={logo} alt='Logo' className='h-full w-full object-contain' />
              </div>

              {/* <==> FORM <==> */}
              <Form {...loginForm}>
                <form className='p-6 md:p-8' onSubmit={loginForm.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    {/* <==> WELCOME <==> */}
                    <div className='flex flex-col items-center gap-2 text-center'>
                      <h2 className='text-2xl font-bold'>Welcome back</h2>
                      <p className='text-muted-foreground text-balance'>
                        Login to your VNN account
                      </p>
                    </div>

                    {/* <==> USERNAME <==> */}
                    <FormField
                      control={loginForm.control}
                      name='username'
                      disabled={login.isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Employee ID. e.g., 12314092'
                              className='placeholder:text-sm placeholder:italic'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <==> PASSWORD <==> */}
                    <FormField
                      control={loginForm.control}
                      name='password'
                      disabled={login.isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              placeholder='Enter your password'
                              className='placeholder:text-sm placeholder:italic'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <==> BUTTON <==> */}
                    <Button disabled={login.isPending} type='submit'>
                      {login.isPending && <Spinner />}
                      Login
                    </Button>

                    {/* <==> SIGN UP <==> */}
                    <FieldDescription className='text-center'>
                      Don&apos;t have an account? <a href='#'>Sign up</a>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* <==> TERMS AGREEMENT <==> */}
          <FieldDescription className='text-center'>
            By clicking continue, you agree to our <a href='#'>Terms of Service</a> and{' '}
            <a href='#'>Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
