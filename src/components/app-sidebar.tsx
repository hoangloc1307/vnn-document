import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/NOK_logo.svg';
import { NavMain } from '~/components/nav-main';
import { NavSecondary } from '~/components/nav-secondary';
import { Sidebar, SidebarContent, SidebarHeader } from '~/components/ui/sidebar';
import MENU from '~/config/menu';
import PATHS from '~/constants/paths';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <Link to={PATHS.HOME} className='flex flex-row items-center gap-2'>
          <div
            className={
              'bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg p-1 transition-[width,height] duration-200 ease-linear'
            }
          >
            <img src={logo} className='object-contain hue-rotate-180 invert' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>Vietnam NOK</span>
            <span className='truncate text-xs'>Enterprise</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MENU.MAIN} />
        <NavSecondary items={MENU.SECONDARY} className='mt-auto' />
      </SidebarContent>
    </Sidebar>
  );
}
