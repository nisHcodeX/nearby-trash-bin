import { useUserListMutation } from '@api/admin';
import ItemRow from './itemRow';
import { useEffect } from 'react';
import Loader from '@components/loader';
import { UserDetail } from '@core/interface';
import { USER_TYPES } from '@constant/index';
import TrashBinCard from '@components/card';

const Customers = () => {
  const [getUsers, { isError, isLoading, isSuccess, data }] = useUserListMutation();

  useEffect(() => {
    getUsers()
  }, []);

  if (isLoading) return <Loader lg />

  return (
    <TrashBinCard title='Customer List'>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user: UserDetail) => (
              user.userType == USER_TYPES.USER && <ItemRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </TrashBinCard>
  );
};

export default Customers;
