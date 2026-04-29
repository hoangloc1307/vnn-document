import { BadgeInfo, Boxes, FileQuestionMark, MessageCircleQuestionMark } from 'lucide-react';
import type { NavItem } from '~/components/nav-main';
import type { NavSecondaryItem } from '~/components/nav-secondary';
import PATHS from '~/constants/paths';

const MAIN = [
  {
    title: 'master',
    url: '',
    icon: Boxes,
    items: [
      {
        title: 'items',
        url: PATHS.ITEMS,
      },
      {
        title: 'warehouses',
        url: PATHS.WAREHOUSES,
      },
      {
        title: 'zones',
        url: PATHS.ZONES,
      },
    ],
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
