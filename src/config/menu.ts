import {
  BadgeInfo,
  Boxes,
  FileQuestionMark,
  LayoutDashboard,
  MessageCircleQuestionMark,
  Wrench,
} from 'lucide-react';
import type { NavItem } from '~/components/nav-main';
import type { NavSecondaryItem } from '~/components/nav-secondary';
import PATHS from '~/constants/paths';

const MAIN = [
  {
    title: 'dashboard',
    url: PATHS.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'asset',
    url: '',
    icon: Boxes,
    items: [
      {
        title: 'category',
        url: PATHS.CATEGORY,
      },
    ],
  },
  {
    title: 'maintenance',
    icon: Wrench,
  },
] as const satisfies NavItem[];

const SECONDARY = [
  {
    title: 'user_guide',
    url: '#',
    icon: FileQuestionMark,
  },
  {
    title: 'version_info',
    url: PATHS.VERSION,
    icon: BadgeInfo,
  },
  {
    title: 'support',
    url: PATHS.SUPPORT,
    icon: MessageCircleQuestionMark,
  },
] as const satisfies NavSecondaryItem[];

const MENU: {
  MAIN: readonly NavItem[];
  SECONDARY: readonly NavSecondaryItem[];
} = {
  MAIN,
  SECONDARY,
};

export default MENU;
