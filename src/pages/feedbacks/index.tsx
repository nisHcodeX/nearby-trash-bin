import { useFeedbackListMutation, useUserListMutation } from '@api/admin';
import ItemRow from './itemRow';
import { useEffect } from 'react';
import Loader from '@components/loader';
import { FeedbackRes, UserDetail } from '@core/interface';
import { USER_TYPES } from '@constant/index';
import TrashBinCard from '@components/card';

const Feedbacks = () => {
  const [getFeedbacks, { isError, isLoading, isSuccess, data }] = useFeedbackListMutation();

  useEffect(() => {
    getFeedbacks();
  }, []);

  if (isLoading) return <div className='mt-6'><Loader lg /></div>

  return (
    <TrashBinCard title='Feedback List'>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Feedback Id</th>
              <th scope="col">Bin Id</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Comment</th>
              <th scope="col">Ratings</th>
              <th scope="col">Bin Status</th>
              <th scope="col">Feedback Date</th>
              {/* <th scope="col">Ratings</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((feedback: FeedbackRes) => (
              <ItemRow key={feedback.id} feedback={feedback} />
            ))}
          </tbody>
        </table>
      </div>
    </TrashBinCard>
  );
};

export default Feedbacks;
