import {
  BadgeInfo,
  Boxes,
  FileQuestionMark,
  MessageCircleQuestionMark,
  Wrench,
} from 'lucide-react';
import type { NavItem } from '~/components/nav-main';
import type { NavSecondaryItem } from '~/components/nav-secondary';
import PATHS from '~/constants/paths';

const MAIN = [
  {
    title: 'Asset',
    url: '',
    icon: Boxes,
    items: [
      {
        title: 'Category',
        url: PATHS.CATEGORY,
      },
    ],
  },
  {
    title: 'Maintenance',
    url: '',
    icon: Wrench,
  },
] as const satisfies NavItem[];

const SECONDARY = [
  {
    title: 'User Guide',
    url: '#',
    icon: FileQuestionMark,
  },
  {
    title: 'Version Info',
    url: PATHS.VERSION,
    icon: BadgeInfo,
  },
  {
    title: 'Support',
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
