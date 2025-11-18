import { KeyRound, LogOut } from 'lucide-react';
import { LanguageSwitcher } from '~/components/language-switcher';
import { ModeToggle } from '~/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger } from '~/components/ui/sidebar';
import { useAuthStore } from '~/stores/auth.store';
import { getColorFromName, getInitials } from '~/utils/avatar';

export function SiteHeader() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const initials = getInitials(user?.name || user?.username || 'Unknown');

  return (
    <header className='bg-background sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <div className='ml-auto flex items-center gap-2'>
          <LanguageSwitcher />
          <ModeToggle />
          <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={`https://v033.nok.com.vn/shared/images/${user?.username}.jpg`}
                  alt={user?.name}
                />
                <AvatarFallback
                  className='rounded-lg'
                  style={{ backgroundColor: getColorFromName(initials) }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              side={'bottom'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user?.name}</span>
                  <span className='truncate text-xs font-normal'>{user?.username}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <KeyRound />
                  Change password
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
