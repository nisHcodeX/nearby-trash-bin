import { DefaulTImage, TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useEffect, useRef, useState } from 'react'
import './index.scss';
import { TRASH_TYPES } from '@constant/index';
import CameraComponent from '@components/photoUploader';

const AddTrashBin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState('');
  const [binUplaodType, setBinUplaodType] = useState(1);

  useEffect(() => {
    console.log('binUplaodType', binUplaodType);
    console.log('photo', photo);
  }, [binUplaodType, photo])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('e', e)
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

        {/* <div className="form-group d-flex flex-column align-items-start mb-2">
          <label className='mb-2'>Longitude</label>
          <input
            type="text"
            className="form-control p-3 mb-2"
            // id="exampleInputEmail1" 
            // aria-describedby="emailHelp" 
            placeholder="Add Longitude"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div> */}
        <div className="form-group d-flex flex-column align-items-start">
          <label className='mb-2'>Location</label>
          <input
            type="text"
            className="form-control p-3 mb-2"
            placeholder="Search location here"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group d-flex mt-3 mb-4 ">

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={TRASH_TYPES.ORGANIC} />
            <label className="form-check-label" htmlFor="inlineCheckbox1">ORGANIC</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value={TRASH_TYPES.PAPER} />
            <label className="form-check-label" htmlFor="inlineCheckbox2">PAPER</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value={TRASH_TYPES.PLASTIC} />
            <label className="form-check-label" htmlFor="inlineCheckbox3">PLASTIC</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value={TRASH_TYPES.GLASS} />
            <label className="form-check-label" htmlFor="inlineCheckbox4">GLASS</label>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 p-2 mt-2">Add trash bin</button>
        </div>
      </form>
    </TrashBinCard>
  )
}

export default AddTrashBin;