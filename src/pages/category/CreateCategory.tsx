import { FilePlus } from 'lucide-react';
import { type UseFormReturn } from 'react-hook-form';
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
import { Switch } from '~/components/ui/switch';
import type { CreateCategoryFormValues } from '~/validations/category.validation';

interface CreateCategoryProps {
  form: UseFormReturn<CreateCategoryFormValues>;
}

export default function CreateCategory({ form }: CreateCategoryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <FilePlus /> Create
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]' onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Please enter the name and details for the new asset category below. Click save to
            finalize.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='description'
            control={form.control}
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
          <FormField
            name='maintenanceIntervalHours'
            control={form.control}
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
          <FormField
            name='status'
            control={form.control}
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
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit((v) => {
              console.log(v);
            })}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
