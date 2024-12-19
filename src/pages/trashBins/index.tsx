import { useTrashBinListMutation, useUpdatetrashBinMutation } from '@api/admin';
import ItemRow from './itemRow';
import { useEffect } from 'react';
import Loader from '@components/loader';
import { TrashBinRes } from '@core/interface';
import TrashBinCard from '@components/card';
import { BIN_APPROVE_STATUS } from '@constant/index';

const TrashBins = () => {
  const [getTrashBins, { isError, isLoading, isSuccess, data }] = useTrashBinListMutation();
  const [updateTrashBin, { isError: isErrorUpdate, isLoading: isUpadateLoading, isSuccess: isUpdateSucess, }] = useUpdatetrashBinMutation();
  useEffect(() => {
    getTrashBins()
  }, []);

  useEffect(() => {
    getTrashBins()
  }, [isUpdateSucess]);

  const onApproveClick = async (bin: TrashBinRes) => {
    await updateTrashBin({ id: bin.id, status: BIN_APPROVE_STATUS.APPROVED })
  }
  const onRejectClick = async (bin: TrashBinRes) => {
    await updateTrashBin({ id: bin.id, status: BIN_APPROVE_STATUS.REJECTED })
  }
  if (isLoading || isUpadateLoading) return <div className='mt-6'><Loader lg /></div>
  return (
    <TrashBinCard title='Trashbin List'>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Bin Id</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Trash Types</th>
              <th scope="col">Bin Photo</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((bin: TrashBinRes) => (
              !bin.suggestedBin && <ItemRow key={bin.id} bin={bin} onApproveClick={() => onApproveClick(bin)} onRejectClick={() => onRejectClick(bin)} />
            ))}
          </tbody>
        </table>
      </div>
    </TrashBinCard>
  );
};

export default TrashBins;
