import logo from '~/assets/NOK_Logo.jpg';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { useLogin } from '~/features/auth/useLogin';

export default function LoginPage() {
  const login = useLogin();

  async function handleLogin() {
    login.mutate(
      { username: '12314092', password: '123456' },
      {
        onSuccess: () => console.log('login ok'),
      },
    );
  }

  return (
    <div className='flex min-h-svh items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-4xl'>
        <div className='flex flex-col gap-6'>
          <Card className='overflow-hidden p-0'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              <div className='hidden bg-white p-10 md:block'>
                <div className='hidden h-full w-full rounded-sm md:block'>
                  <img src={logo} alt='Logo' className='h-full w-full object-contain' />
                </div>
              </div>
              <div className='p-6 md:p-8'>
                <FieldGroup>
                  <div className='flex flex-col items-center gap-2 text-center'>
                    <h1 className='text-2xl font-bold'>Welcome back</h1>
                    <p className='text-muted-foreground text-balance'>Login to your VNN account</p>
                  </div>
                  <Field>
                    <FieldLabel htmlFor='username'>Username</FieldLabel>
                    <Input
                      className='placeholder:text-sm placeholder:italic'
                      id='username'
                      type='text'
                      placeholder='Mã nhân viên. VD: 12314092'
                    />
                  </Field>
                  <Field>
                    <div className='flex items-center'>
                      <FieldLabel htmlFor='password'>Password</FieldLabel>
                      <a href='#' className='ml-auto text-sm underline-offset-2 hover:underline'>
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      className='placeholder:text-sm placeholder:italic'
                      id='password'
                      type='password'
                      placeholder='Mật khẩu'
                    />
                  </Field>
                  <Field>
                    <Button onClick={handleLogin}>Login</Button>
                  </Field>
                  <FieldDescription className='text-center'>
                    Don&apos;t have an account? <a href='#'>Sign up</a>
                  </FieldDescription>
                </FieldGroup>
              </div>
            </CardContent>
          </Card>

          <FieldDescription className='text-center'>
            By clicking continue, you agree to our <a href='#'>Terms of Service</a> and{' '}
            <a href='#'>Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
