import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';
import { chartData, valueFormatter } from './webUsageStats';
import TrashBinCard from '@components/card';
import { LineChart } from '@mui/x-charts';
import { Button } from '@mui/material';
import { useFeedbackListMutation, useTrashBinListMutation, useUserListMutation } from '@api/admin';
import { useEffect, useState } from 'react';
import Loader from '@components/loader';
import { BIN_APPROVE_STATUS } from '@constant/index';


const AdminHome = () => {
    const [radius, setRadius] = useState(70);
    const [itemNb, setItemNb] = useState(5);
    const [skipAnimation, setSkipAnimation] = useState(true);
    const [showError, setShowError] = useState(true);
    const [data, setData] = useState({ feedbacks: 3, users: 6, aBins: 5, pBins: 4, sBins: 2, total: 0 });
    const [getFeedbacks, { isError: isFeedbackError, isLoading: isFeedbackLoading, data: feedbacks }] = useFeedbackListMutation();
    const [getUsers, { isError: isUsersError, isLoading: isUsersLoading, data: users }] = useUserListMutation();
    const [getTrashBins, { isError: isTrashBinsError, isLoading: isTrashBinsLoading, data: trashbins }] = useTrashBinListMutation();

    useEffect(() => {
        getFeedbacks();
        getUsers();
        getTrashBins();
    }, []);

    useEffect(() => {
        if (feedbacks?.length) {
            setData(prev => ({ ...prev, feedbacks: feedbacks.length, total: prev.total + feedbacks.length }));
        }
        if (users?.length) {
            setData(prev => ({ ...prev, users: users.length, total: prev.total + users.length  }));
        }
        if (trashbins?.length) {
            const pending = trashbins.filter((bin) => bin.trashBinStatus == BIN_APPROVE_STATUS.PENDING)
            setData(prev => ({ ...prev, pBins: pending.length, total: prev.total + pending.length }));
            const approved = trashbins.filter((bin) => bin.trashBinStatus == BIN_APPROVE_STATUS.APPROVED)
            setData(prev => ({ ...prev, aBinsBins: approved.length, total: prev.total + approved.length }));
        }

    }, [feedbacks, users, trashbins]);

    useEffect(() => {
        if (isFeedbackError || isUsersError || isTrashBinsError) {
            setShowError(true)
        } else setShowError(false)
    }, [isFeedbackError, isUsersError, isTrashBinsError]);

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

    if (isFeedbackLoading || isUsersLoading || isTrashBinsLoading) return <Loader lg />;

    return (
        <TrashBinCard title='Admin Home'>
            <>
                {showError &&
                    <div className='d-flex justify-content-center'>
                        <div className="alert alert-danger close-container" role="alert" style={{ width: '400px' }}>
                            Error, Loading data try again..!
                            <span aria-hidden="true" className='close-icn' onClick={() => setShowError(false)}>&times;</span>
                        </div>
                    </div>
                }
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
                                    data: chartData(data).slice(0, itemNb),
                                    innerRadius: radius,
                                    // arcLabel: (params: any) => params.label ?? '',
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
            </>
        </TrashBinCard>
    );
}

export default AdminHome;