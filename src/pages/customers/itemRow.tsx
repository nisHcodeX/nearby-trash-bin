import { IcApprove, IcReject } from '@assets/icons';
import { UserDetail } from '@core/interface';

const ItemRow = ({user} : {user: UserDetail}) => {
  return (
    <tr>
      <td scope="row">{user.id}</td>
      <td scope="row">{user.userName}</td>
      <td scope="row">{user.email}</td>
      <td scope="row">{user.phoneNumber}</td>
    </tr>
  );
};

export default ItemRow;
