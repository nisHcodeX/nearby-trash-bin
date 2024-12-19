import GeocodingAutocomplete from '@components/autocomplete';
import { BIN_APPROVE_STATUS } from '@constant/index';
import { TrashBinRes } from '@core/interface';
import { Button } from '@mui/material';
import { HighlightOff, CheckCircleOutlineOutlined } from '@mui/icons-material';

const ItemRow = ({ bin, onRejectClick, onApproveClick }: { bin: TrashBinRes, onRejectClick: () => void, onApproveClick: () => void }) => {

  const trashTypeRender = (bin: TrashBinRes) => {
    let trash = '';
    if (bin.glass) trash += 'glass '
    if (bin.paper) trash += 'paper '
    if (bin.plastic) trash += 'plastic '
    if (bin.organic) trash += 'organic '

    return trash;
  }
  const trashBinStatusRender = (status: BIN_APPROVE_STATUS) => {
    let binStatus = '';
    if (status == BIN_APPROVE_STATUS.APPROVED) binStatus = 'APPROVED'
    if (status == BIN_APPROVE_STATUS.PENDING) binStatus = 'PENDING'
    if (status == BIN_APPROVE_STATUS.REJECTED) binStatus = 'REJECTED'

    return binStatus;
  }
  return (

    <tr>
      <th scope="row">{bin.id}</th>
      <td>{bin.appUserId}</td>
      <td><GeocodingAutocomplete initialLat={bin.latitude} initialLng={bin.longitude} disabled /></td>
      <td>{trashBinStatusRender(bin.trashBinStatus)}</td>
      <td>{trashTypeRender(bin)}</td>
      <td><img src={bin.imageUrl} height={100} /></td>
      <td className="d-flex justify-content-end gap-2" style={{ height: '117px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: 'auto' }}>
          <Button variant="outlined" startIcon={<CheckCircleOutlineOutlined />} onClick={onApproveClick}>
            Approve
          </Button>
          <Button variant="outlined" startIcon={<HighlightOff />} onClick={onRejectClick}>
            Reject
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ItemRow;
