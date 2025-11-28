import { type LucideIcon } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';

export type NavSecondaryItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type NavSecondaryProps = {
  items: readonly NavSecondaryItem[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>;

export function NavSecondary({ items, ...props }: NavSecondaryProps) {
  const { t } = useTranslation(['layout']);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size='sm' tooltip={t(`layout:${item.title}`)}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{t(`layout:${item.title}`)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
