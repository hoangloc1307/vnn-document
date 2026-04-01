import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
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
  desktop: {
    label: 'Desktop Traffic',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile Traffic',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function BarChartExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
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
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar stackId='a' dataKey='desktop' fill='var(--color-desktop)' />
            <Bar stackId='a' dataKey='mobile' fill='var(--color-mobile)'>
              <LabelList
                content={(props) => {
                  const { x, y, width, index } = props;

                  const row = chartData[index as number];
                  const d = Number(row.desktop ?? 0);
                  const m = Number(row.mobile ?? 0);
                  const total = d + m;

                  const cx = (typeof x === 'number' ? x + Number(width) / 2 : x) as number;
                  const cy = (typeof y === 'number' ? y - 6 : y) as number;

                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor='middle'
                      fill='var(--foreground)'
                      fontSize={12}
                      fontWeight={600}
                    >
                      {total}
                    </text>
                  );
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
