import { IcApprove, IcReject } from 'assets/icons';

const ItemRow = () => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>John Doe</td>
      <td>03, Awissawella Road, Malabe</td>
      <td>Pending</td>
      <td>View</td>
      <td className="d-flex justify-content-end">
        <button type="button" className="btn btn-outline-success me-1" style={{ padding: '6px' }}>
          <IcApprove />
        </button>
        <button type="button" className="btn btn-outline-danger" style={{ padding: '6px' }}>
          <IcReject />
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;
