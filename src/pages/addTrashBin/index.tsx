import { DefaulTImage, TrashBin, TrashBinLogo } from '@assets/img';
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
import { useImagRecognitionMutation } from '@api/imageReg';
import { Modal } from 'react-bootstrap';
import ImageWithBorder from './imagePredictor';

const defaulImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANcAAACUCAMAAAA3b0xFAAAAMFBMVEXp7vG6vsHP09a+wsXY3N/e4uXj6Ou3u77FyczJzdDV2d3m6+7BxcjL0NPg5ejs8fQ4HQBKAAACbUlEQVR4nO3b63acIBiFYZWTHNT7v9sOHqooZIrY+tG1n5+ZxDVvAEUzaRoAAAAAAAAAAAAAAAAAAACABDuKUuPbDRFcO1bKDeLtjLOOtU9g/O2QUKceyWpbRWrExmdGy2NvtxyZebiYK7P8cijNRO27tCzlfFc3vV2zm7t46Rua5lVKrsugK45+1+RlH4V6l+X9Z+9gZO5RiHdxNp/1FTM27yi0u8y+d+jyjkK6Sxx3VHmnEtJd/XFT5LLWGOUuEe72TM5RCHdNJshKrjARG0jKXV3YNcS/X7A+8lWiXfyPuz63NSoSRrRrXl88XF/ReSj8DYnqL1ORcpcM7jBZ7O5XuOVFfQ6j3NUMx+tXbBWNbntVn14h3WXZISxy1pPpbNJdjezXMMXE9S2OwWmlD3aQtLsa2blWqdYNkcecwoUPrvQxjHjXZ1C4MXyM7Ob3tRVbY+S7UiRT5y51CKu1S0afMu5TsdKu6yQ8hdXZlcrapyLRruvzw+OZQ6ayfNjyk0S7zuNldbuf6X98gr9ex+rosp8vum1/mJyEa9jgw+ro0v4Nu2XEfpiEa5j/a0MNXdO6/2V+i2i/ZVXTZfV2BWZj4rpVY5cd9rfseJ+qqa5r+NZRZ9dw2QbW3LVdl232aNHu2sYrf7Sq6LoxWjV03Rkt+l2TufcBFfJd3bcCdBGALnRRgK4U4l2NvckfhXJXCXT9K/91V+anhq6m+REWpa5lt9sXcr/PjFSMl/P2bSzzQ3B/1727rghVvEofZftnwlIf0HnNZIr/O4Wx1lFaXItJ8mLCkpqEAAAAAAAAAAAAAAAAAAAAAAAAAJDwC0gSLiS44c/CAAAAAElFTkSuQmCC`

const AddTrashBin: React.FC = () => {

  const [plastic, setPlastic] = useState(false);
  const [organic, setOrganic] = useState(false);
  const [paper, setPaper] = useState(false);
  const [glass, setGlass] = useState(false);
  const [suggestedBin, setSuggestedBin] = useState(false);
  const [photo, setPhoto] = useState('');
  const [show, setShow] = useState(false);
  const [binUplaodType, setBinUplaodType] = useState(1);
  const [addTrashBin, { isError, isLoading, isSuccess }] = useAddTrashBinMutation();
  const [getImageRes, { isError: isImageError, isLoading: isImageLoding, isSuccess: isImageSuccess, data }] = useImagRecognitionMutation();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | undefined>(undefined)
  const session = getSession();

  useEffect(() => {
    if (isError) setShowError(true);
    if (isSuccess) setShowSuccess(true);
  }, [isError, isSuccess])

  useEffect(() => {
    if (photo) {
      getImageRes(photo)
    }
  }, [binUplaodType, photo]);

  useEffect(() => {
    isImageLoding && setShow(true);
  }, [isImageLoding, data]);

  const addTrashBinAssync = async () => {
    if (locationData && session?.id)
      await addTrashBin({ Glass: glass, Image: photo ? photo : defaulImg, Plastic: plastic, Paper: paper, Latitude: locationData.lat, Longitude: locationData?.lng, Organic: organic, UserId: session.id, suggestedBin })
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
  };

  const onContinueClick = () => {
    setShow(false);
  };

  return (
    <TrashBinCard title='Add Trash Bin'>
      <>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          dialogClassName="custom-modal-styles"
          aria-labelledby="example-custom-modal-styling-title"
        >
          {isImageLoding && <Loader />}
          {data && photo ? <ImageWithBorder photo={photo} data={data} onContinueClick={onContinueClick}/>
            : <>{!isImageLoding && <div className='p-4'><h2>Try Again..!</h2></div>}</>
          }
        </Modal>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <div className="alert alert-success mb-2" role="alert" style={{ textAlign: 'justify' }}>
              By selecting the Suggested Bin button, you can recommend a trash bin for a specific location.
              <div className='d-flex gap-2 form-check mt-2'>
                <input className="form-check-input" type="checkbox" id="inlineCheckbox6" value={suggestedBin ? 1 : 0} onChange={() => setSuggestedBin(prev => !prev)} />
                <label className="form-check-label" htmlFor="inlineCheckbox6">Suggest Bin to the system</label>
              </div>
            </div>
          </div>
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
          {suggestedBin ? <></> :
            <>
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
                </div>}
              {binUplaodType == 2 &&
                <img src={photo ? photo : DefaulTImage} alt="Captured" width={350} className='mb-2 rounded' />}
            </>
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
      </>
    </TrashBinCard>
  )
}

export default AddTrashBin;