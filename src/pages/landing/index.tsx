import { AddTrashBin, FindTrashBin, TrashBin } from '@assets/img';
import TrashBinCard from '@components/card';
import './landing.scss'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@hooks/hooks';
import { binListGetter, trashTypeGetter } from '@core/coreSlice';
import { TrashBinRes } from '@core/interface';
import { BIN_APPROVE_STATUS, BIN_STATUS, TRASH_TYPES } from '@constant/index';
import GeocodingAutocomplete from '@components/autocomplete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DirectionContainer from '@components/map';
import { useAddReviewTrashBinMutation } from '@api/trashBin';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import { getSession } from '@utils/index';

const TrashBinList = () => {
  const binList = useAppSelector(binListGetter);
  const trashgType = useAppSelector(trashTypeGetter);
  const [show, setShow] = useState(false);
  const [selectedbin, setSelectedbin] = useState<TrashBinRes | null>(null);
  const [completeDispose, setCompleteDispose] = useState(false);
  const [comment, setComment] = useState('');
  const [latestStatus, setLatestStaus] = useState<BIN_STATUS>(0);
  const [rating, setRating] = useState<number>(3);
  const [showError, setShowError] = useState(false);
  const [addReview, { isError, isLoading, isSuccess, data }] = useAddReviewTrashBinMutation();
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (isError) setShowError(true);
    if (isSuccess) {
      setShow(false);
      setCompleteDispose(false);
      navigate('/')
    };
  }, [isError, isSuccess])

  const binHighlight = (bin: TrashBinRes) => {
    if (bin.glass && trashgType == TRASH_TYPES.GLASS) return 'glass'
    if (bin.paper && trashgType == TRASH_TYPES.PAPER) return 'paper'
    if (bin.plastic && trashgType == TRASH_TYPES.PLASTIC) return 'plastic'
    if (bin.organic && trashgType == TRASH_TYPES.ORGANIC) return 'organic'
    else return ''
  }

  const trashTypeRender = (bin: TrashBinRes) => {
    let trash = '';
    if (bin.glass) trash += 'glass '
    if (bin.paper) trash += 'paper '
    if (bin.plastic) trash += 'plastic '
    if (bin.organic) trash += 'organic '

    return trash;
  }

  const addReviewAssync = async () => {
    if (session && selectedbin)
      await addReview({ comment, latestFeedback: latestStatus, ratings: rating, trashBinId: selectedbin?.id, userId: session?.id });
    else setShowError(true)
  }

  const findRouteClick = (bin: TrashBinRes) => {
    setSelectedbin(bin)
    setShow(true);
  }
  const onComleteReview = (e: any) => {
    e.preventDefault();
    addReviewAssync();
  }
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

    return (<input
      type="text"
      className="form-control p-2 mb-2"
      placeholder={statusText}
      disabled
    />);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >

        {!completeDispose ? <div>
          <DirectionContainer lat={selectedbin?.latitude} lng={selectedbin?.longitude} />
          <div className='px-4 pb-4'>
            <Button variant="success" className='mt-2 w-100' onClick={() => setCompleteDispose(true)}>
              Complete Trash Dispose
            </Button>
          </div>
        </div> :
          <div className='p-4'>
            <h4 className='text-success mb-2'>Give feedback & Review</h4>
            {showError &&
              <div className="alert alert-danger close-container" role="alert">
                Error, Please retry to review ..!
                <span aria-hidden="true" className='close-icn' onClick={() => setShowError(false)}>&times;</span>
              </div>
            }
            <form onSubmit={onComleteReview}>
              <div className="form-group d-flex flex-column align-items-start mb-2">
                <label htmlFor="exampleInputEmail1" className='mb-2'>Review</label>
                <textarea
                  // type="text"
                  className="form-control p-3 mb-2"
                  placeholder="Add your review"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="form-group d-flex flex-column align-items-start mb-2">
                <label htmlFor="exampleInputEmail1" className='mb-2'>Rating</label>
                <Rating
                  name="star-rating"
                  value={rating}
                  onChange={(event: any, newValue: any) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <div className="form-group d-flex flex-column align-items-start mb-2">
                <label htmlFor="exampleInputEmail1" className='mb-2'>Bin status</label>
                <select name="bin-status" className='form-select' onChange={(e) => setLatestStaus(parseInt(e.target.value))}>
                  <option value={BIN_STATUS.EMPTY}>EMPTY</option>
                  <option value={BIN_STATUS.QUARTER}>QUARTER</option>
                  <option value={BIN_STATUS.HALF}>HALF</option>
                  <option value={BIN_STATUS.THREEQUARTER}>THREEQUARTER</option>
                  <option value={BIN_STATUS.FULL}>FULL</option>
                </select>
              </div>
              <Button variant="success" type={'submit'} className='mt-2 w-100'>
                Complete
              </Button>
            </form>
          </div>}
      </Modal>
      {binList && binList.length > 0 ?
        binList.map((bin: TrashBinRes) =>
          bin.trashBinStatus == BIN_APPROVE_STATUS.APPROVED && !bin.suggestedBin &&
            <TrashBinCard key={bin.id}>
              <>
                <div className={`d-flex flex-column justify-content-center align-items-center gap-5`}>
                  <div className={`home-trash-bin-wrapper p-4 ${binHighlight(bin)}`}>
                    <div className='home-trash-bin-img-wrapper'>
                      <img className='home-trash-bin-img-wrapper list-bin-image' src={bin.imageUrl} />
                    </div>
                    <div style={{ backgroundImage: `url(${TrashBin})` }} className='list-trash-bin pt-3'>
                      <button type="button" className="btn btn-outline-secondary mt-4" onClick={() => findRouteClick(bin)}>Find Route</button>
                    </div>
                    <div className='list-trash-bin-text-container d-flex flex-column justify-content-center align-items-center gap-2 mt-6'>
                      <GeocodingAutocomplete initialLat={bin.latitude} initialLng={bin.longitude} disabled />
                      {binStatusRender(bin?.feedbacks[0]?.latestFeedback)}
                      <div>
                        <p >
                          Trash Type Available to dispose
                          <br />
                          {trashTypeRender(bin)}
                        </p>
                        {bin.feedbacks[0] ?
                          <Rating
                            name="read-only"
                            readOnly
                            value={bin.feedbacks[0].ratings}
                          /> : <Rating name="no-value" value={null} disabled />
                        }
                      </div>
                    </div>
                  </div>
                </div>

              </>
            </TrashBinCard>
        )
        :
        <TrashBinCard title='No Trash bin Were Found'>
          <div className='d-flex flex-column justify-content-center align-items-center gap-5'>
            You can suggest trash bin in the near area by clicking add trash bin
          </div>
        </TrashBinCard>
      }
    </>
  )
}

export default TrashBinList;