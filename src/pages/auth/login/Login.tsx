import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '~/assets/images/VNN_Building.jpg';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Spinner } from '~/components/ui/spinner';
import { useLogin } from '~/hooks/auth/useLogin';
import { loginSchema, type LoginFormValues } from '~/validations/auth.validation';

export default function LoginPage() {
  const login = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) =>
    login.mutate(values, {
      onSuccess: () => navigate(from, { replace: true }),
      onError: (error) => {
        const err = error as AxiosError<{ message?: string }>;
        toast.error('Login fail', {
          description: err.response?.data?.message,
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
              <div className='p-6 md:p-8'>
                <FieldGroup>
                  {/* <==> WELCOME <==> */}
                  <div className='flex flex-col items-center gap-2 text-center'>
                    <h1 className='text-2xl font-bold'>Welcome back</h1>
                    <p className='text-muted-foreground text-balance'>Login to your VNN account</p>
                  </div>

                  {/* <==> USERNAME <==> */}
                  <Field>
                    <FieldLabel htmlFor='username'>Username</FieldLabel>
                    <Input
                      className='placeholder:text-sm placeholder:italic'
                      id='username'
                      type='text'
                      autoFocus
                      placeholder='Employee ID. e.g., 12314092'
                      tabIndex={1}
                      disabled={login.isPending}
                      {...register('username')}
                    />
                    {errors.username && <FieldError>{errors.username.message}</FieldError>}
                  </Field>

                  {/* <==> PASSWORD <==> */}
                  <Field>
                    <div className='flex items-center'>
                      <FieldLabel htmlFor='password'>Password</FieldLabel>
                      <a
                        href='#'
                        className='text-muted-foreground ml-auto text-sm underline-offset-2 hover:underline'
                      >
                        Forgot your password?
                      </a>
                    </div>

                    <Input
                      className='placeholder:text-sm placeholder:italic'
                      id='password'
                      type='password'
                      placeholder='Enter your password'
                      tabIndex={2}
                      disabled={login.isPending}
                      {...register('password')}
                    />
                    {errors.password && <FieldError>{errors.password.message}</FieldError>}
                  </Field>

                  {/* <==> BUTTON <==> */}
                  <Field>
                    <Button disabled={login.isPending} onClick={handleSubmit(onSubmit)}>
                      {login.isPending && <Spinner />}
                      Login
                    </Button>
                  </Field>

                  {/* <==> SIGN UP <==> */}
                  <FieldDescription className='text-center'>
                    Don&apos;t have an account? <a href='#'>Sign up</a>
                  </FieldDescription>
                </FieldGroup>
              </div>
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
