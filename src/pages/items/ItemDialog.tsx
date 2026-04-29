import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
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
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import { Textarea } from '~/components/ui/textarea';
import { useCreateItem, useUpdateItem } from '~/hooks/mutations/useItemMutations';
import { itemSchema, type ItemFormValues } from '~/validations/item.validation';

const defaultValues: ItemFormValues = {
  itemCode: '',
  productCode: '',
  name: '',
  unit: '',
  baseUnit: '',
  conversionFactor: 1,
  deliveryOnBaseUnit: true,
  note: '',
  trackingType: 'LABEL',
};

export default function ItemDialog({
  item,
  open,
  setOpen,
}: {
  item: ItemFormValues | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [action, setAction] = useState<'create' | 'update'>('create');
  const { t } = useTranslation(['common', 'item']);
  const createItemMutation = useCreateItem();
  const updateItemMutation = useUpdateItem();

  const itemForm = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open && item) {
      itemForm.reset(item);
      setAction('update');
    } else if (open) {
      itemForm.reset(defaultValues);
      setAction('create');
    }
  }, [item, open, itemForm]);

  const onSubmit = (values: ItemFormValues) => {
    if (action === 'create') {
      createItemMutation.mutate(values, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    } else if (action === 'update' && item) {
      updateItemMutation.mutate(values, {
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
          <DialogTitle className='capitalize'>{t(`item:${action}_title`)}</DialogTitle>
          <DialogDescription>{t(`item:${action}_description`)}</DialogDescription>
        </DialogHeader>
        <Form {...itemForm}>
          <div className='grid grid-cols-12 gap-4'>
            {/* ---------- Item Code ---------- */}
            <div className='col-span-6'>
              <FormField
                name='itemCode'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('item:item_code')}</FormLabel>
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
            {/* ---------- Product Code ---------- */}
            <div className='col-span-6'>
              <FormField
                name='productCode'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('item:product_code')}</FormLabel>
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
            {/* ---------- Name ---------- */}
            <div className='col-span-12'>
              <FormField
                name='name'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('item:name')}</FormLabel>
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
            {/* ---------- Unit ---------- */}
            <div className='col-span-4'>
              <FormField
                name='unit'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('item:unit')}</FormLabel>
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
            {/* ---------- Base Unit ---------- */}
            <div className='col-span-4'>
              <FormField
                name='baseUnit'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('item:base_unit')}</FormLabel>
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
            {/* ---------- Conversion Factor ---------- */}
            <div className='col-span-4'>
              <FormField
                name='conversionFactor'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>
                      {t('item:conversion_factor')}
                    </FormLabel>
                    <FormControl>
                      <NumericFormat
                        value={field.value}
                        customInput={Input}
                        thousandSeparator
                        allowNegative={false}
                        decimalScale={2}
                        onValueChange={(values) => {
                          field.onChange(values.floatValue ?? 1);
                        }}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>
            {/* ---------- Delivery On Base Unit ---------- */}
            <div className='col-span-6'>
              <FormField
                name='deliveryOnBaseUnit'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>
                      {t('item:delivery_on_base_unit')}
                    </FormLabel>
                    <FormControl className='h-9'>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          id='deliveryOnBaseUnit'
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(Boolean(val))}
                        />
                        <Label htmlFor='deliveryOnBaseUnit'>
                          {field.value ? t('common:yes') : t('common:no')}
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>

            {/* ---------- Tracking Type ---------- */}
            <div className='col-span-6'>
              <FormField
                name='trackingType'
                control={itemForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>{t('item:tracking_type')}</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className='w-full max-w-48'>
                          <SelectValue placeholder='Select tracking type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='LABEL'>Label</SelectItem>
                            <SelectItem value='QUANTITY'>Quantity</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                control={itemForm.control}
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
          <Button onClick={itemForm.handleSubmit(onSubmit)}>{t('common:save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
