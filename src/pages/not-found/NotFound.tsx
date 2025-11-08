import { Link } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import PATHS from '~/constants/paths';

export default function NotFoundPage() {
  return (
    <div className='flex h-svh w-svw items-center justify-center'>
      <div className='space-y-6 text-center'>
        <div className='space-y-3'>
          <h1 className='animate-bounce text-4xl font-bold tracking-tighter sm:text-5xl'>
            404 Page Not Found
          </h1>
          <p className='text-gray-500'>Sorry, we couldn't find the page you're looking for.</p>
        </div>
        <Link to={PATHS.HOME}>
          <Button>Return to website</Button>
        </Link>
      </div>
    </div>
  );
}
