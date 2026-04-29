import { FilePlusIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useDeleteWarehouse } from '~/hooks/mutations/useWarehouseMutations';
import { useGetAllWarehouses } from '~/hooks/queries/useWarehouses';
import { getWarehouseColumns } from '~/pages/warehouses/columns';
import WarehouseDialog from '~/pages/warehouses/WarehouseDialog';
import type { Warehouse } from '~/types/warehouse';
import { warehouseSchema, type WarehouseFormValues } from '~/validations/warehouse.validation';

export default function WarehousesPage() {
  const { t } = useTranslation(['common', 'warehouse']);
  const { data: warehouses, isFetching: warehousesLoading } = useGetAllWarehouses();
  const deleteWarehouseMutation = useDeleteWarehouse();
  const columns = getWarehouseColumns(t, {
    onEdit: handleEdit,
    onDelete: handleDelete,
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const editWarehouse = useRef<WarehouseFormValues | null>(null);

  const table = useDatatable({
    columns,
    data: warehouses,
    pagination: {
      type: 'client',
    },
    sorting: {},
    export: {
      filename: 'warehouses.xlsx',
    },
  });

  function handleEdit(warehouse: Warehouse) {
    editWarehouse.current = warehouseSchema.parse(warehouse);
    setOpenDialog(true);
  }

  function handleDelete(warehouse: Warehouse) {
    deleteWarehouseMutation.mutate(warehouse.code);
  }

  return (
    <section>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{t('warehouse:title')}</h2>
          <p className='text-muted-foreground'>{t('warehouse:description')}</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button size={'sm'} onClick={() => setOpenDialog(true)}>
            <FilePlusIcon /> {t('common:create')}
          </Button>
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} loading={warehousesLoading} />
      </div>

      <WarehouseDialog
        open={openDialog}
        setOpen={(value) => {
          if (!value) {
            editWarehouse.current = null;
          }
          setOpenDialog(value);
        }}
        warehouse={editWarehouse.current}
      />
    </section>
  );
}
