import { FilePlusIcon, FileUpIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useDeleteItem } from '~/hooks/mutations/useItemMutations';
import { useGetAllItems } from '~/hooks/queries/useItems';
import { getItemColumns } from '~/pages/items/columns';
import ItemDialog from '~/pages/items/ItemDialog';
import type { Item } from '~/types/item';
import { itemSchema, type ItemFormValues } from '~/validations/item.validation';

export default function ItemsPage() {
  const { t } = useTranslation(['common', 'item']);
  const { data: items, isFetching: itemsLoading } = useGetAllItems();
  const deleteItemMutation = useDeleteItem();
  const columns = getItemColumns(t, {
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCopy: handleCopy,
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const editItem = useRef<ItemFormValues | null>(null);

  const table = useDatatable({
    columns,
    data: items,
    pagination: {
      type: 'client',
    },
    sorting: {},
  });

  function handleEdit(item: Item) {
    editItem.current = itemSchema.parse(item);
    setOpenDialog(true);
  }

  function handleDelete(item: Item) {
    deleteItemMutation.mutate(item.itemCode);
  }

  async function handleCopy(item: Item) {
    try {
      await navigator.clipboard.writeText(JSON.stringify(item, null, 2));

      toast.success('Copied JSON to clipboard!');
    } catch {
      toast.error('Failed to copy');
    }
  }

  return (
    <section>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{t('item:title')}</h2>
          <p className='text-muted-foreground'>{t('item:description')}</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button variant={'outline'} size={'sm'} onClick={() => console.log('Import')}>
            <FileUpIcon /> Import
          </Button>

          <Button size={'sm'} onClick={() => setOpenDialog(true)}>
            <FilePlusIcon /> {t('common:create')}
          </Button>
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} loading={itemsLoading} />
      </div>

      <ItemDialog
        open={openDialog}
        setOpen={(value) => {
          if (!value) {
            editItem.current = null;
          }
          setOpenDialog(value);
        }}
        item={editItem.current}
      />
    </section>
  );
}
