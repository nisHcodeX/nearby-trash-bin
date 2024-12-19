import { useFeedbackListMutation, useUserListMutation } from '@api/admin';
import ItemRow from './itemRow';
import { useEffect } from 'react';
import Loader from '@components/loader';
import { UserDetail } from '@core/interface';
import { USER_TYPES } from '@constant/index';
import TrashBinCard from '@components/card';

const Feedbacks = () => {
  const [getFeedbacks, { isError, isLoading, isSuccess, data }] = useFeedbackListMutation();

  useEffect(() => {
    getFeedbacks()
  }, []);
  console.log('data', data)
  if (isLoading) return <div className='mt-6'><Loader lg /></div>

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
            {/* {data?.map((feedback: ) => (
              user.userType == USER_TYPES.USER && <ItemRow key={user.id} user={user} />
            ))} */}
          </tbody>
        </table>
      </div>
    </TrashBinCard>
  );
};

export default Feedbacks;
