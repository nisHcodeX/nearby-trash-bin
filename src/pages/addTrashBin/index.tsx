import { DefaulTImage, TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useEffect, useRef, useState } from 'react'
import './index.scss';
import { TRASH_TYPES } from '@constant/index';
import CameraComponent from '@components/photoUploader';
import { useAddTrashBinMutation } from '@api/trashBin';
import GeocodingAutocomplete from '@components/autocomplete/index';
import { getSession } from '@utils/index';
import { LocationData } from '@core/interface';
import Loader from '@components/loader';

const AddTrashBin: React.FC = () => {

  const [plastic, setPlastic] = useState(false);
  const [organic, setOrganic] = useState(false);
  const [paper, setPaper] = useState(false);
  const [glass, setGlass] = useState(false);
  const [photo, setPhoto] = useState('');
  const [binUplaodType, setBinUplaodType] = useState(1);
  const [addTrashBin, { isError, isLoading, isSuccess }] = useAddTrashBinMutation();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [locationData, setLocationData] = React.useState<LocationData | undefined>(undefined)
  const session = getSession();

  useEffect(() => {
    if (isError) setShowError(true);
    if (isSuccess) setShowSuccess(true);
  }, [isError, isSuccess])

  useEffect(() => {
    console.log('binUplaodType', binUplaodType);
    console.log('photo', photo);
  }, [binUplaodType, photo]);

  const addTrashBinAssync = async () => {
    console.log('locationData', locationData)
    if (locationData && session?.id)
      await addTrashBin({ Glass: glass, Image: photo, Plastic: plastic, Paper: paper, Latitude: locationData.lat, Longitude: locationData?.lng, Organic: organic, UserId: session.id })
    else setShowError(true);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTrashBinAssync();
  }

  const onPhotoUplaod = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <TrashBinCard title='Add Trash Bin'>

      <form onSubmit={onSubmit}>
        {showError &&
          <div className="alert alert-danger close-container" role="alert">
            Error, adding Trashbin Try again..!
            <span aria-hidden="true" className='close-icn' onClick={() => setShowError(false)}>&times;</span>
          </div>
        }
        {showSuccess &&
          <div className="alert alert-success close-container" role="alert">
            Your Trashbin suggestion is added..!
            <span aria-hidden="true" className='close-icn' onClick={() => setShowSuccess(false)}>&times;</span>
          </div>
        }
        <select className="form-select mb-2 p-3" aria-label="Default select example"
          value={binUplaodType}
          onChange={(e) => setBinUplaodType(parseInt(e.target.value))}
        >
          <option value="1">Use Camera</option>
          <option value="2">Upload Photo</option>
        </select>
        {binUplaodType == 1 ? <CameraComponent /> :
          <div className="form-group d-flex flex-column align-items-start mb-2">
            <label className='mb-2'>Trash Bin Photo</label>
            <input
              type="file"
              className="form-control p-3 mb-2"
              // id="exampleInputEmail1" 
              // aria-describedby="emailHelp" 
              placeholder="Add Trash bin photo"
              onChange={onPhotoUplaod}
            />
          </div>
        }
        {binUplaodType == 2 &&
          <img src={photo ? photo : DefaulTImage} alt="Captured" width={350} className='mb-2 rounded' />
        }


        <div className="form-group d-flex flex-column align-items-start">
          <label className='mb-2'>Location</label>
          <GeocodingAutocomplete
            results={(data) => setLocationData(data)}
            // initialLat={6.053519} initialLng={80.220978}
          />
        </div>
        <div className="form-group d-flex mt-3 mb-4 ">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={TRASH_TYPES.ORGANIC} onChange={() => setOrganic(prev => !prev)} />
            <label className="form-check-label" htmlFor="inlineCheckbox1">ORGANIC</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value={TRASH_TYPES.PAPER} onChange={() => setPaper(prev => !prev)} />
            <label className="form-check-label" htmlFor="inlineCheckbox2">PAPER</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value={TRASH_TYPES.PLASTIC} onChange={() => setPlastic(prev => !prev)} />
            <label className="form-check-label" htmlFor="inlineCheckbox3">PLASTIC</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value={TRASH_TYPES.GLASS} onChange={() => setGlass(prev => !prev)} />
            <label className="form-check-label" htmlFor="inlineCheckbox4">GLASS</label>
          </div>
        </div>
        <div>
          <button
              type="submit"
              className="btn btn-primary w-100 p-2 mt-3 mb-3 login-btn d-flex align-items-center justify-content-center"
              disabled={isLoading ? true : false}
            > {isLoading && <Loader white />} Add trash bin</button>
        </div>
      </form>
    </TrashBinCard>
  )
}

export default AddTrashBin;