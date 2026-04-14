import { IconDotsVertical } from '@tabler/icons-react';
import type { TFunction } from 'i18next';
import { Trans } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import type { Item } from '~/types/item';

export type ItemRowActions = {
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
  onCopy?: (item: Item) => void;
};

export default function ActionCell({
  item,
  actions,
  t,
}: {
  item: Item;
  actions?: ItemRowActions;
  t: TFunction;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='text-muted-foreground data-[state=open]:bg-muted flex size-8'
          size='icon'
        >
          <IconDotsVertical />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-32'>
        <DropdownMenuItem onClick={() => actions?.onEdit?.(item)}>
          {t('common:edit')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => actions?.onCopy?.(item)}>
          {t('common:copy')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* ==================== Delete Dialog ==================== */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem variant='destructive' onSelect={(e) => e.preventDefault()}>
              {t('common:delete')}
            </DropdownMenuItem>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('common:confirm_delete')}</AlertDialogTitle>

              <AlertDialogDescription>
                <Trans
                  i18nKey='item:delete_item_confirm'
                  values={{ code: item.itemCode }}
                  components={{
                    highlight: <strong className='text-destructive font-extrabold' />,
                  }}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>{t('common:cancel')}</AlertDialogCancel>

              <AlertDialogAction onClick={() => actions?.onDelete?.(item)}>
                {t('common:delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
