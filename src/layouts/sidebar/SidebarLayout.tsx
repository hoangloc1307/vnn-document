import { Outlet } from 'react-router-dom';
import { AppSidebar } from '~/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='flex h-dvh flex-col overflow-hidden'>
        <header className='bg-sidebar flex h-12 shrink-0 items-center border-b px-4'>
          <SidebarTrigger />
        </header>
        <main className='min-h-0 flex-1 overflow-auto p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
