import { FilePlusIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useDeleteZone } from '~/hooks/mutations/useZoneMutations';
import { useGetAllZones } from '~/hooks/queries/useZones';
import { getZoneColumns } from '~/pages/zones/columns';
import ZoneDialog from '~/pages/zones/ZoneDialog';
import type { Zone } from '~/types/zone';
import { zoneSchema, type ZoneFormValues } from '~/validations/zone.validation';

export default function ZonesPage() {
  const { t } = useTranslation(['common', 'zone']);
  const { data: zones, isFetching: zonesLoading } = useGetAllZones();
  const deleteZoneMutation = useDeleteZone();
  const columns = getZoneColumns(t, {
    onEdit: handleEdit,
    onDelete: handleDelete,
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const editZone = useRef<ZoneFormValues | null>(null);

  const table = useDatatable({
    columns,
    data: zones,
    pagination: {
      type: 'client',
    },
    sorting: {},
    export: {
      filename: 'zones.xlsx',
    },
  });

  function handleEdit(zone: Zone) {
    editZone.current = zoneSchema.parse(zone);
    setOpenDialog(true);
  }

  function handleDelete(zone: Zone) {
    deleteZoneMutation.mutate(zone.code);
  }

  return (
    <section>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{t('zone:title')}</h2>
          <p className='text-muted-foreground'>{t('zone:description')}</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button size={'sm'} onClick={() => setOpenDialog(true)}>
            <FilePlusIcon /> {t('common:create')}
          </Button>
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} loading={zonesLoading} />
      </div>

      <ZoneDialog
        open={openDialog}
        setOpen={(value) => {
          if (!value) {
            editZone.current = null;
          }
          setOpenDialog(value);
        }}
        zone={editZone.current}
      />
    </section>
  );
}
