import { DataTable } from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import { columns, type Category } from '~/pages/category/columns';

export default function CategoryPage() {
  const data = [
    {
      id: '1',
      name: 'Laptop',
      status: true,
    },
    {
      id: '2',
      name: 'Máy tính bàn',
      maintenanceIntervalHours: 4320,
      status: true,
    },
    {
      id: '3',
      name: 'Máy in',
      status: false,
    },
    {
      id: '4',
      name: 'Camera',
      status: true,
    },
    {
      id: '5',
      name: 'Chuột',
      status: true,
    },
    {
      id: '6',
      name: 'Bàn phím',
      status: true,
    },
    {
      id: '7',
      name: 'Màn hình',
      status: true,
    },
    {
      id: '8',
      name: 'RAM',
      status: true,
    },
    {
      id: '9',
      name: 'SSD',
      status: true,
    },
    {
      id: '10',
      name: 'HDD',
      status: true,
    },
    {
      id: '11',
      name: 'Máy chiếu',
      status: true,
    },
  ] satisfies Category[];

  return (
    <>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Categrory</h2>
          <p className='text-muted-foreground'>Here's a list of your asset category!</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button variant={'outline'}>Import</Button>
          <Button>Create Category</Button>
        </div>
      </div>

      <div className='flex-1'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
