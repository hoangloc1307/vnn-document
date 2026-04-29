import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '~/components/ui/combobox';
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
import { useCreateZone, useUpdateZone } from '~/hooks/mutations/useZoneMutations';
import { useGetAllWarehouses } from '~/hooks/queries/useWarehouses';
import type { Warehouse } from '~/types/warehouse';
import { zoneSchema, type ZoneFormValues } from '~/validations/zone.validation';

const defaultValues: ZoneFormValues = {
  warehouseCode: '',
  code: '',
  name: '',
  note: '',
};

export default function ZoneDialog({
  zone,
  open,
  setOpen,
}: {
  zone: ZoneFormValues | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [action, setAction] = useState<'create' | 'update'>('create');
  const { t } = useTranslation(['common', 'zone']);
  const createZoneMutation = useCreateZone();
  const updateZoneMutation = useUpdateZone();
  const { data: warehouses } = useGetAllWarehouses();

  const zoneForm = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open && zone) {
      zoneForm.reset(zone);
      setAction('update');
    } else if (open) {
      zoneForm.reset(defaultValues);
      setAction('create');
    }
  }, [zone, open, zoneForm]);

  const onSubmit = (values: ZoneFormValues) => {
    if (action === 'create') {
      createZoneMutation.mutate(values, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    } else if (action === 'update' && zone) {
      updateZoneMutation.mutate(values, {
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
          <DialogTitle className='capitalize'>{t(`zone:${action}_title`)}</DialogTitle>
          <DialogDescription>{t(`zone:${action}_description`)}</DialogDescription>
        </DialogHeader>
        <Form {...zoneForm}>
          <div className='grid grid-cols-12 gap-4'>
            {/* ---------- Zone Code ---------- */}
            <div className='col-span-6'>
              <FormField
                name='code'
                control={zoneForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('zone:code')}</FormLabel>
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
            {/* ---------- Zone Name ---------- */}
            <div className='col-span-6'>
              <FormField
                name='name'
                control={zoneForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('zone:name')}</FormLabel>
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
            {/* ---------- Warehouse Code ---------- */}
            <div className='col-span-12'>
              <FormField
                name='warehouseCode'
                control={zoneForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('zone:warehouse_code')}</FormLabel>
                    <FormControl>
                      <Combobox
                        items={['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']}
                        onValueChange={(e) => console.log(e)}
                      >
                        <ComboboxInput placeholder='Select a framework' />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item} onClick={(e) => console.log(e)}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
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
                control={zoneForm.control}
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
          <Button onClick={zoneForm.handleSubmit(onSubmit)}>{t('common:save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
