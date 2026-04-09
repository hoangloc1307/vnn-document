import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar';
import { useAuthStore } from '~/stores/auth.store';

type NavSubItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
};

type NavMainProps = {
  items: readonly NavItem[];
};

export function NavMain({ items }: NavMainProps) {
  const { t } = useTranslation(['layout']);
  const menus = useAuthStore((s) => s.menus);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          if (!item.items?.length && menus.includes(item.url ?? '')) {
            return (
              <Link to={item.url ?? ''} key={item.title}>
                <SidebarMenuButton tooltip={t(`layout:${item.title}`)}>
                  {item.icon && <item.icon />}
                  <span>{t(`layout:${item.title}`)}</span>
                </SidebarMenuButton>
              </Link>
            );
          }

          const visibleSubItems = item.items?.filter((subItem) => menus.includes(subItem.url));

          if (!visibleSubItems || visibleSubItems.length === 0) {
            return null;
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={t(`layout:${item.title}`)}>
                    {item.icon && <item.icon />}
                    <span>{t(`layout:${item.title}`)}</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      if (!menus.includes(subItem.url)) return null;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{t(`layout:${subItem.title}`)}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
