// ==============================|| WIDGET - SEO 4 CHART ||============================== //
import { Props } from 'react-apexcharts';

const chartData: Props = {
    type: 'line',
    height: 30,
    options: {
        chart: {
            id: 'user-analytics-chart',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 2
        },
        yaxis: {
            min: -2,
            max: 5,
            labels: {
                show: false
            }
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: (seriesName: string) => 'Analytics '
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: [2, 1, 2, 1, 1, 3, 0]
        }
    ]
};
export default chartData;
