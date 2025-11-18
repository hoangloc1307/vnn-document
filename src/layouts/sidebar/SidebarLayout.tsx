import { Outlet } from 'react-router-dom';
import { AppSidebar } from '~/components/app-sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset className='h-[calc(100svh-1rem)] overflow-auto'>
        <SiteHeader />
        <div className='flex flex-1 flex-col p-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
