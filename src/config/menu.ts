import {
  BadgeInfo,
  ChartNoAxesCombined,
  ClipboardList,
  FilePlus,
  FileQuestionMark,
  MessageCircleQuestionMark,
  NotebookTabs,
} from 'lucide-react';

const MENU = {
  MAIN: [
    {
      title: 'Dashboard',
      url: '#',
      icon: ChartNoAxesCombined,
      isActive: true,
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
      isActive: true,
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
      isActive: true,
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
  ],
  OTHER: [
    {
      title: 'User Guide',
      url: '#',
      icon: FileQuestionMark,
    },
    {
      title: 'Version Info',
      url: '#',
      icon: BadgeInfo,
    },
    {
      title: 'Support',
      url: '#',
      icon: MessageCircleQuestionMark,
    },
  ],
};

export default MENU;
