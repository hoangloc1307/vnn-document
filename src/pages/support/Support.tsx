import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const SupportPage = () => {
  return (
    <section className='container'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mt-2 mb-3 text-3xl font-semibold text-balance md:text-4xl'>Contact Us</h1>
        <p className='text-muted-foreground max-w-xl text-lg'>
          Contact the support team at Shadcnblocks.
        </p>
      </div>
      <div className='mx-auto mt-16 grid max-w-3xl gap-6 md:mt-24 md:grid-cols-2'>
        <div className='bg-muted rounded-lg p-6'>
          <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
            <Mail className='h-6 w-auto' />
          </span>
          <p className='mb-2 text-lg font-semibold'>Email</p>
          <p className='text-muted-foreground mb-3'>We respond to all emails within 24 hours.</p>
          <a href={`mailto:example@shadcnblocks.com`} className='font-semibold hover:underline'>
            example@shadcnblocks.com
          </a>
        </div>
        <div className='bg-muted rounded-lg p-6'>
          <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
            <MapPin className='h-6 w-auto' />
          </span>
          <p className='mb-2 text-lg font-semibold'>Office</p>
          <p className='text-muted-foreground mb-3'>Drop by our office for a chat.</p>
          <a href='#' className='font-semibold hover:underline'>
            1 Eagle St, Brisbane, QLD, 4000
          </a>
        </div>
        <div className='bg-muted rounded-lg p-6'>
          <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
            <Phone className='h-6 w-auto' />
          </span>
          <p className='mb-2 text-lg font-semibold'>Phone</p>
          <p className='text-muted-foreground mb-3'>We're available Mon-Fri, 9am-5pm.</p>
          <a href={`tel:+123 456 7890`} className='font-semibold hover:underline'>
            +123 456 7890
          </a>
        </div>
        <div className='bg-muted rounded-lg p-6'>
          <span className='bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full'>
            <MessageCircle className='h-6 w-auto' />
          </span>
          <p className='mb-2 text-lg font-semibold'>Live Chat</p>
          <p className='text-muted-foreground mb-3'>Get instant help from our support team.</p>
          <a href='#' className='font-semibold hover:underline'>
            Start Chat
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
