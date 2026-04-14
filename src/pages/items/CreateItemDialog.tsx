import { zodResolver } from '@hookform/resolvers/zod';
import { FilePlusIcon } from 'lucide-react';
import { useState } from 'react';
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
  DialogTrigger,
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
import { useCreateItem } from '~/hooks/mutations/useItemMutations';
import { createItemSchema, type CreateItemFormValues } from '~/validations/item.validation';

export default function CreateItemDialog() {
  const { t } = useTranslation(['common']);
  const [open, setOpen] = useState<boolean>(false);
  const createItemMutation = useCreateItem();

  const createForm = useForm<CreateItemFormValues>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      itemCode: '',
      productCode: '',
      name: '',
      unit: '',
      baseUnit: '',
      conversionFactor: 1,
      deliveryOnBaseUnit: true,
      note: '',
      trackingType: 'LABEL',
    },
  });

  const onSubmit = (values: CreateItemFormValues) => {
    createItemMutation.mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          createForm.reset();
        }
        setOpen((prev) => !prev);
      }}
    >
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <FilePlusIcon /> {t('common:create')}
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[425px]'
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
          <DialogDescription>
            Please enter the name and details for the new item below. Click save to finalize.
          </DialogDescription>
        </DialogHeader>
        <Form {...createForm}>
          <div className='grid grid-cols-12 gap-4'>
            {/* ---------- Item Code ---------- */}
            <div className='col-span-6'>
              <FormField
                name='itemCode'
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Item Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Product Code</FormLabel>
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Name</FormLabel>
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Unit</FormLabel>
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Base Unit</FormLabel>
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Conversion Factor</FormLabel>
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Delivery On Base Unit</FormLabel>
                    <FormControl className='h-9'>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          id='deliveryOnBaseUnit'
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(Boolean(val))}
                        />
                        <Label htmlFor='deliveryOnBaseUnit'>{field.value ? 'Yes' : 'No'}</Label>
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required text-xs'>Tracking Type</FormLabel>
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
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs'>Note</FormLabel>
                    <FormControl>
                      <Textarea {...field} className='resize-none' />
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
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button onClick={createForm.handleSubmit(onSubmit)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
