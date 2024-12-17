import ItemRow from './itemRow';

const Customers = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Customer Name</th>
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

export default Customers;
