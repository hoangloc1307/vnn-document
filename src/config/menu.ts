import {
  BadgeInfo,
  ChartNoAxesCombined,
  ClipboardList,
  FilePlus,
  FileQuestionMark,
  MessageCircleQuestionMark,
  NotebookTabs,
} from 'lucide-react';
import type { NavItem } from '~/components/nav-main';
import type { NavSecondaryItem } from '~/components/nav-secondary';
import PATHS from '~/constants/paths';

const MAIN = [
  {
    title: 'Dashboard',
    url: '#',
    icon: ChartNoAxesCombined,
    isActive: false,
    items: [
      {
        title: 'Abnormal A5',
        url: 'abnormal-a5-dashboard',
      },
    ],
  },
  {
    title: 'Create Request',
    url: '#',
    icon: FilePlus,
    isActive: true,
    items: [
      {
        title: 'Abnormal A5',
        url: 'abnormal-a5',
      },
    ],
  },
  {
    title: 'Task',
    url: '#',
    icon: ClipboardList,
    isActive: false,
    items: [
      {
        title: 'Task List',
        url: 'task',
      },
      {
        title: 'Delete Request',
        url: 'delete',
      },
    ],
  },
  {
    title: 'Document Management',
    url: '#',
    icon: NotebookTabs,
    isActive: false,
    items: [
      {
        title: 'Document List',
        url: 'document',
      },
      {
        title: 'Report',
        url: 'report',
      },
    ],
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
