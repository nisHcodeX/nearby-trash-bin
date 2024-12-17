import ItemRow from './itemRow';

const TrashBins = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Bin Id</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Location</th>
            <th scope="col">Status</th>
            <th scope="col">Bin Photo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item) => (
            <ItemRow />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrashBins;
