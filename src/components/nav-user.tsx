import { ChevronsUpDown, KeyRound, Languages, LogOut, MonitorCog, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar';
import { LANGUAGES } from '~/constants/languages';
import { useAuthStore, type User } from '~/stores/auth.store';
import { useThemeStore } from '~/stores/theme.store';
import { getColorFromName, getInitials } from '~/utils/avatar';

type NavUserProps = {
  user: User;
};

export function NavUser({ user }: NavUserProps) {
  const { i18n } = useTranslation();
  const { isMobile } = useSidebar();
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const logout = useAuthStore((s) => s.logout);

  const currentLang = i18n.language as keyof typeof LANGUAGES;
  const initials = getInitials(user.name || user.username || 'Unknown');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={`https://v033.nok.com.vn/shared/images/${user.username}.jpg`}
                  alt={user.name}
                  className='object-cover object-top'
                />
                <AvatarFallback
                  className='rounded-lg'
                  style={{ backgroundColor: getColorFromName(initials) }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.name}</span>
                <span className='truncate text-xs'>{user.username}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={`https://v033.nok.com.vn/shared/images/${user.username}.jpg`}
                    alt={user.name}
                    className='object-cover object-top'
                  />
                  <AvatarFallback
                    className='rounded-lg'
                    style={{ backgroundColor: getColorFromName(initials) }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user.name}</span>
                  <span className='truncate text-xs'>{user.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <==> CHANGE PASSWORD <==> */}
              <DropdownMenuItem>
                <KeyRound />
                Change password
              </DropdownMenuItem>

              {/* <==> CHANGE THEME <==> */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='gap-2'>
                  <Sun className='scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                  <Moon className='absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                  <p>
                    Theme: <span className='capitalize'>{theme}</span>
                  </p>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className='w-40 rounded-lg' sideOffset={8} alignOffset={-4}>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    <MonitorCog />
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* <==> CHANGE LANGUAGE <==> */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='gap-2'>
                  <Languages />
                  <p>
                    Language: <span className='capitalize'>{LANGUAGES[currentLang].label}</span>
                  </p>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className='w-40 rounded-lg' sideOffset={8} alignOffset={-4}>
                  {Object.entries(LANGUAGES).map(([key, lang]) => (
                    <DropdownMenuItem key={key} onClick={() => i18n.changeLanguage(key)}>
                      <img src={lang.flag} alt={key} className='size-4 rounded-sm' />
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* <==> LOG OUT <==> */}
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
