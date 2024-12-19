
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';
import { mobileAndDesktopOS, valueFormatter } from './webUsageStats';
import TrashBinCard from '@components/card';
import { LineChart } from '@mui/x-charts';
import { Button } from '@mui/material';


const AdminHome = () => {
    const [radius, setRadius] = React.useState(70);
    const [itemNb, setItemNb] = React.useState(5);
    const [skipAnimation, setSkipAnimation] = React.useState(true);

    function CustomTooltipContent(props: { series: any; itemData: any }) {
        console.log('props', props)
        const { series, itemData } = props;

        const index = itemData?.index; // Get the index of the hovered data point
        const value = series?.data[index]; // Get the value from the series based on the index

        return (
            <div {...props}
                style={{
                    padding: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                }}
            >
                <strong>Custom Tooltip</strong>
                <br />
                <strong>Index:</strong> {index}
                <br />
                <strong>Value:</strong> {value}
            </div>
        );
    }
    return (
        <TrashBinCard title='Admin Home'>
            <div className='d-flex justify-content-center flex-wrap'>
                <div>
                    <h4 className='mt-3 text-success mb-5'> Trashbins status</h4>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]} // x-axis data
                        series={[
                            {
                                data: [2.5, 10, 2, 8.5, 1.5, 5], // series data
                            },
                        ]}
                        width={500}
                        height={300}
                        tooltip={{
                            trigger: 'item', // Tooltip triggers on item
                            slots: {
                                itemContent: CustomTooltipContent, // Use CustomTooltipContent for item tooltip
                                
                            },
                        }}
                    />
                </div>
                <div>
                    <h4 className='mt-3 text-success mb-5'> Overall status</h4>
                    <PieChart
                        height={300}
                        width={600}
                        series={[
                            {
                                data: mobileAndDesktopOS.slice(0, itemNb),
                                innerRadius: radius,
                                arcLabel: (params: any) => params.label ?? '',
                                arcLabelMinAngle: 20,
                                valueFormatter,
                            },
                        ]}
                        skipAnimation={skipAnimation}
                    />
                </div>
                <div className='d-flex flex-column gap-4'>
                    <Button variant="outlined">Export TrashBin List</Button>
                    <Button variant="outlined">Export User List</Button>
                    <Button variant="outlined">Export Feddbacks List</Button>
                </div>
            </div>
        </TrashBinCard>
    );
}

export default AdminHome;