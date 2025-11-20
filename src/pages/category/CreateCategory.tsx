import { zodResolver } from '@hookform/resolvers/zod';
import { FilePlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';
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
import { Switch } from '~/components/ui/switch';
import {
  createCategorySchema,
  type CreateCategoryFormValues,
} from '~/validations/category.validation';

export default function CreateCategory() {
  const [open, setOpen] = useState<boolean>(false);

  const createForm = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      maintenanceIntervalHours: null,
      status: true,
    },
  });

  const onSubmit = (values: CreateCategoryFormValues) => {
    setOpen(false);
    toast.success('Create successfully', {
      description: (
        <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
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
          <FilePlus /> Create
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[425px]'
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Please enter the name and details for the new asset category below. Click save to
            finalize.
          </DialogDescription>
        </DialogHeader>
        <Form {...createForm}>
          <FormField
            name='name'
            control={createForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='required'>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='description'
            control={createForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-10 gap-6'>
            <div className='col-span-7'>
              <FormField
                name='maintenanceIntervalHours'
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Interval (Hours)</FormLabel>
                    <FormControl>
                      <NumericFormat
                        value={field.value ?? ''}
                        customInput={Input}
                        thousandSeparator
                        allowNegative={false}
                        decimalScale={0}
                        onValueChange={(values) => {
                          field.onChange(values.floatValue ?? null);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                name='status'
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          id='status'
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(Boolean(val))}
                        />
                        <Label htmlFor='status'>{field.value ? 'Active' : 'Inactive'}</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
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
