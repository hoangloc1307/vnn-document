import { Outlet } from 'react-router-dom';
import { AppSidebar } from '~/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger />
        </header>
        <main className='flex min-h-min flex-1 flex-col p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
