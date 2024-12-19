import { PieChart } from '@mui/x-charts/PieChart';
import { chartData, valueFormatter } from './webUsageStats';
import TrashBinCard from '@components/card';
import { BarChart, LineChart } from '@mui/x-charts';
import { Button } from '@mui/material';
import { useFeedbackListMutation, useTrashBinListMutation, useUserListMutation } from '@api/admin';
import { useEffect, useState } from 'react';
import Loader from '@components/loader';
import { BIN_APPROVE_STATUS, BIN_STATUS } from '@constant/index';
import { exportToExcel } from './excellExporter';
import { FeedbackRes, UserDetail } from '@core/interface';
import { onExportFeedbacks, onExportSugestedTrashBins, onExportTrashBins, onExportUsers } from './exportFunction';


const AdminHome = () => {
    const [radius, setRadius] = useState(70);
    const [itemNb, setItemNb] = useState(5);
    const [skipAnimation, setSkipAnimation] = useState(true);
    const [showError, setShowError] = useState(true);
    const [pData, setPData] = useState<number[]>([]);
    const [xLabels, setXLabels] = useState<number[]>([]);
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
            setData(prev => ({ ...prev, users: users.length, total: prev.total + users.length }));
        }
        if (trashbins?.length) {
            const pending = trashbins.filter((bin) => (bin.trashBinStatus == BIN_APPROVE_STATUS.PENDING && !bin.suggestedBin))
            setData(prev => ({ ...prev, pBins: pending.length, total: prev.total + pending.length }));
            const approved = trashbins.filter((bin) => (bin.trashBinStatus == BIN_APPROVE_STATUS.APPROVED && !bin.suggestedBin))
            setData(prev => ({ ...prev, aBinsBins: approved.length, total: prev.total + approved.length }));
            const suggested = trashbins.filter((bin) => bin.suggestedBin)
            setData(prev => ({ ...prev, sBins: suggested.length, total: prev.total + suggested.length }));
        }

    }, [feedbacks, users, trashbins]);

    useEffect(() => {
        if (trashbins?.length) {
            const approved = trashbins.filter(
                (bin) => bin.trashBinStatus === BIN_APPROVE_STATUS.APPROVED
            );

            approved.forEach((bin) => {
                if (!bin.suggestedBin) {
                    setXLabels((prev) => [...prev, bin.id]);
                    setPData((prev) => [
                        ...prev,
                        binStatusRender(bin.feedbacks[0]?.latestFeedback ?? BIN_STATUS.EMPTY),
                    ]);
                }
            });
        }


    }, [trashbins]);

    const binStatusRender = (status: BIN_STATUS): number => {
        let statusText = 0;
        switch (status) {
            case BIN_STATUS.EMPTY:
                statusText = 0
                break;
            case BIN_STATUS.HALF:
                statusText = 50
                break;
            case BIN_STATUS.QUARTER:
                statusText = 25
                break;
            case BIN_STATUS.FULL:
                statusText = 100
                break;
            case BIN_STATUS.THREEQUARTER:
                statusText = 75
                break;
            default: statusText = 0
        }
        return statusText;
    };

    useEffect(() => {
        if (isFeedbackError || isUsersError || isTrashBinsError) {
            setShowError(true)
        } else setShowError(false)
    }, [isFeedbackError, isUsersError, isTrashBinsError]);

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
                        <BarChart
                            width={500}
                            height={300}
                            series={[
                                { data: pData, label: 'bin status', id: 'pvId' },
                            ]}
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
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
                        <h4 className='mt-3 text-success mb-2'> Export data</h4>
                        <Button variant="outlined" onClick={() => trashbins && onExportTrashBins(trashbins)}>Export TrashBin List</Button>
                        <Button variant="outlined" onClick={() => users && onExportUsers(users)}>Export User List</Button>
                        <Button variant="outlined" onClick={() => feedbacks && onExportFeedbacks(feedbacks)}>Export Feddbacks List</Button>
                        <Button variant="outlined" onClick={() => trashbins && onExportSugestedTrashBins(trashbins)}>Export Suggested Bin List</Button>
                    </div>
                </div>
            </>
        </TrashBinCard>
    );
}

export default AdminHome;