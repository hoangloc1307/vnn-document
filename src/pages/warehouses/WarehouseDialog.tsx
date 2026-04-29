import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useCreateWarehouse, useUpdateWarehouse } from '~/hooks/mutations/useWarehouseMutations';
import { warehouseSchema, type WarehouseFormValues } from '~/validations/warehouse.validation';

const defaultValues: WarehouseFormValues = {
  code: '',
  name: '',
  note: '',
};

export default function WarehouseDialog({
  warehouse,
  open,
  setOpen,
}: {
  warehouse: WarehouseFormValues | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [action, setAction] = useState<'create' | 'update'>('create');
  const { t } = useTranslation(['common', 'warehouse']);
  const createWarehouseMutation = useCreateWarehouse();
  const updateWarehouseMutation = useUpdateWarehouse();

  const warehouseForm = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open && warehouse) {
      warehouseForm.reset(warehouse);
      setAction('update');
    } else if (open) {
      warehouseForm.reset(defaultValues);
      setAction('create');
    }
  }, [warehouse, open, warehouseForm]);

  const onSubmit = (values: WarehouseFormValues) => {
    if (action === 'create') {
      createWarehouseMutation.mutate(values, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    } else if (action === 'update' && warehouse) {
      updateWarehouseMutation.mutate(values, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]' showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className='capitalize'>{t(`warehouse:${action}_title`)}</DialogTitle>
          <DialogDescription>{t(`warehouse:${action}_description`)}</DialogDescription>
        </DialogHeader>
        <Form {...warehouseForm}>
          <div className='grid grid-cols-12 gap-4'>
            {/* ---------- Warehouse Code ---------- */}
            <div className='col-span-6'>
              <FormField
                name='code'
                control={warehouseForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('warehouse:code')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={action === 'update'}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>
            {/* ---------- Warehouse Name ---------- */}
            <div className='col-span-6'>
              <FormField
                name='name'
                control={warehouseForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('warehouse:name')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>
            {/* ---------- Note ---------- */}
            <div className='col-span-12'>
              <FormField
                name='note'
                control={warehouseForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs'>{t('common:note')}</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value ?? ''} className='resize-none' />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>{t('common:cancel')}</Button>
          </DialogClose>
          <Button onClick={warehouseForm.handleSubmit(onSubmit)}>{t('common:save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
