import { IcApprove, IcReject } from '@assets/icons';
import { BIN_STATUS } from '@constant/index';
import { FeedbackRes, UserDetail } from '@core/interface';
import { Rating } from '@mui/material';

const ItemRow = ({ feedback }: { feedback: FeedbackRes }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const binStatusRender = (status: BIN_STATUS) => {
    let statusText = "";
    switch (status) {
      case BIN_STATUS.EMPTY:
        statusText = 'EMPTY'
        break;
      case BIN_STATUS.HALF:
        statusText = 'HALF'
        break;
      case BIN_STATUS.QUARTER:
        statusText = 'QUARTER'
        break;
      case BIN_STATUS.FULL:
        statusText = 'FULL'
        break;
      case BIN_STATUS.THREEQUARTER:
        statusText = 'THREEQUARTER'
        break;
      default: statusText = 'EMPTY'
    }
    return statusText;
  };

  return (
    <tr>
      <td scope="row">{feedback.id}</td>
      <td scope="row">{feedback.trashBinId}</td>
      <td scope="row">{feedback.userId}</td>
      <td scope="row">{feedback.comment}</td>
      <td scope="row">
        <Rating
          name="star-rating"
          readOnly
          value={feedback.ratings}
        />
      </td>
      <td scope="row">{binStatusRender(feedback.latestFeedback)}</td>
      <td scope="row">{formatDate(feedback.updatedDate ?? feedback.createdDate)}</td>
    </tr>
  );
};

export default ItemRow;
