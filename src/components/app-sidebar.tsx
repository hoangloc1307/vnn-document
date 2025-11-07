import * as React from 'react';
import logo from '~/assets/images/NOK_logo.svg';
import { NavMain } from '~/components/nav-main';
import { NavSecondary } from '~/components/nav-secondary';
import { NavUser } from '~/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '~/components/ui/sidebar';
import MENU from '~/config/menu';
import { cn } from '~/lib/utils';
import { useAuthStore } from '~/stores/auth.store';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const user = useAuthStore((s) => s.user);

  const isExpand = state === 'expanded';

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='flex flex-row items-center'>
        <div
          className={cn(
            'bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg p-1 transition-[width,height] duration-200 ease-linear',
            isExpand ? 'size-10' : 'size-8',
          )}
        >
          <img src={logo} className='object-contain hue-rotate-180 invert' />
        </div>
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-medium'>Vietnam NOK</span>
          <span className='truncate text-xs'>Enterprise</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MENU.MAIN} />
        {/* <NavProjects projects={MENU.OTHER} /> */}
        <NavSecondary items={MENU.OTHER} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
