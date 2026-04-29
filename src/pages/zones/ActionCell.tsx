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
import type { Zone } from '~/types/zone';

export type ZoneRowActions = {
  onEdit?: (row: Zone) => void;
  onDelete?: (row: Zone) => void;
};

export default function ActionCell({
  row,
  actions,
  t,
}: {
  row: Zone;
  actions?: ZoneRowActions;
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
        <DropdownMenuItem onClick={() => actions?.onEdit?.(row)}>
          {t('common:edit')}
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
                  i18nKey='warehouse:delete_confirm'
                  values={{ code: row.code }}
                  components={{
                    highlight: <strong className='text-destructive font-extrabold' />,
                  }}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>{t('common:cancel')}</AlertDialogCancel>

              <AlertDialogAction onClick={() => actions?.onDelete?.(row)}>
                {t('common:delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
