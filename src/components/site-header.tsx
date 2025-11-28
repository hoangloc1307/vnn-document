import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '~/components/language-switcher';
import { ModeToggle } from '~/components/mode-toggle';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger, useSidebar } from '~/components/ui/sidebar';
import UserOption from '~/components/user-options';

export function SiteHeader() {
  const { open } = useSidebar();
  const { t } = useTranslation(['common']);

  return (
    <header className='bg-background sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger
          className='-ml-1'
          title={t(`common:${open ? 'hide_sidebar' : 'show_sidebar'}`)}
        />
        <div className='ml-auto flex items-center gap-2'>
          <LanguageSwitcher />
          <ModeToggle />
          <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
          <UserOption />
        </div>
      </div>
    </header>
  );
}
