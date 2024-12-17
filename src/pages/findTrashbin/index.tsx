import { TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useEffect, useRef, useState } from 'react'
import './index.scss';
import { TRASH_TYPES } from '@constant/index';
import GeocodingAutocomplete from '@components/autocomplete';
import { LocationData } from '@core/interface';
import { getSession } from '@utils/index';
import { useFindTrashBinMutation } from '@api/trashBin';
import Loader from '@components/loader';
import { useAppDispatch } from '@hooks/hooks';
import { setTrashBinList, setTrasType } from '@core/coreSlice';
import { useNavigate } from 'react-router-dom';

const FindTrashBin: React.FC = () => {
  const [isOrganic, setOrganic] = useState<null | TRASH_TYPES.ORGANIC>(null);
  const [isPaper, setPaper] = useState<null | TRASH_TYPES.PAPER>(null);
  const [isPlastic, setPastic] = useState<null | TRASH_TYPES.PLASTIC>(null);
  const [isGlass, setGlass] = useState<null | TRASH_TYPES.GLASS>(null);
  const [showError, setShowError] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | undefined>(undefined);
  const [searchTrashBin, { isError, isLoading, isSuccess, data }] = useFindTrashBinMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    isError && setShowError(true);
    if (data) {
      dispatch(setTrashBinList(data));
      navigate('/list');
    }
  }, [isError, data])

  const onTrashTypeClick = (trashType: TRASH_TYPES) => {
    dispatch(setTrasType(trashType))
    if (trashType === TRASH_TYPES.ORGANIC)
      setOrganic(prev => prev ? null : trashType)
    else if (trashType === TRASH_TYPES.PAPER)
      setPaper(prev => prev ? null : trashType)
    else if (trashType === TRASH_TYPES.PLASTIC)
      setPastic(prev => prev ? null : trashType)
    else if (trashType === TRASH_TYPES.GLASS)
      setGlass(prev => prev ? null : trashType)
  };

  const btnDisableSetter = (): boolean => {
    if (isOrganic) return false
    else if (isPaper) return false
    else if (isPlastic) return false
    else if (isGlass) return false
    else return true
  };

  const findTrashBinAssync = async () => {
    if (locationData && session?.id)
      await searchTrashBin({ lat: locationData.lat, lng: locationData?.lng, radius: 10 })
    else setShowError(true);
  }
  const onSubmit = () => {
    findTrashBinAssync();
  }

  return (
    <TrashBinCard title='Find Trash Bin'>
      <>
        <div className="select-trash-wrapper">
          {showError &&
            <div className="alert alert-danger close-container" role="alert">
              Error, Find Trashbin Try again..!
              <span aria-hidden="true" className='close-icn' onClick={() => setShowError(false)}>&times;</span>
            </div>
          }
          <div className="trash-type-text">
            <h5 className='text-success'>Select the trash type you have</h5>
          </div>
          <div className="trash-type-btn-container d-flex mt-4">
            {/* <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Organic</button>
            <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Paper</button>
            <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Plastic</button>
            <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Glass</button> */}
            <div className={`trash-type mt-3 ${isOrganic && 'selected-trash-type'}`} onClick={() => onTrashTypeClick(TRASH_TYPES.ORGANIC)}>
              <label className="form-check-label" htmlFor="trashBinOrganic">
                Organic
              </label>
            </div>
            <div className={`trash-type paper mt-3 ${isPaper && 'selected-trash-type'}`} onClick={() => onTrashTypeClick(TRASH_TYPES.PAPER)}>
              <label className="form-check-label" htmlFor="trashBinPaper">
                Paper
              </label>
            </div>
            <div className={`trash-type plastic mt-3 ${isPlastic && 'selected-trash-type'}`} onClick={() => onTrashTypeClick(TRASH_TYPES.PLASTIC)}>
              <label className="form-check-label" htmlFor="trashBinPlastic">
                Plastic
              </label>
            </div>
            <div className={`trash-type glass mt-3 ${isGlass && 'selected-trash-type'}`} onClick={() => onTrashTypeClick(TRASH_TYPES.GLASS)}>
              <label className="form-check-label" htmlFor="trashBinGlass">
                Glass
              </label>
            </div>
            <div className='mb-2'></div>
            <GeocodingAutocomplete
              results={(data) => setLocationData(data)}
            // initialLat={6.053519} initialLng={80.220978}
            />
            <div className='d-flex w-100'>
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-primary w-100 p-2 mt-3 mb-3 login-btn d-flex align-items-center justify-content-center"
                disabled={btnDisableSetter() || isLoading}
              > {isLoading && <Loader white />} FIND</button>
            </div>
          </div>
        </div>
      </>
    </TrashBinCard>
  )
}

export default FindTrashBin;