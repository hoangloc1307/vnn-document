import { Monitor, Smartphone } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  visitors: {
    label: 'Total Visitors',
  },
  desktop: {
    label: 'Desktop Traffic',
    color: 'var(--chart-1)',
    icon: Monitor,
    // theme: {
    //   light: '#2563eb',
    //   dark: '#dc2626',
    // },
  },
  mobile: {
    label: 'Mobile Traffic',
    color: 'var(--chart-2)',
    icon: Smartphone,
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent labelKey='visitors' />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
        <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
