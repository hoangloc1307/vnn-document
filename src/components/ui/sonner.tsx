import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ theme, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className='toaster group'
      position='top-right'
      duration={5000}
      swipeDirections={['right']}
      richColors
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          // '--success-bg': 'hsl(142 76% 36%)',
          // '--success-text': 'white',
          // '--error-bg': 'hsl(0 84% 60%)',
          // '--error-text': 'white',
          // '--warning-bg': 'hsl(38 92% 50%)',
          // '--warning-text': 'black',
          // '--info-bg': 'hsl(217 91% 60%)',
          // '--info-text': 'white',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
