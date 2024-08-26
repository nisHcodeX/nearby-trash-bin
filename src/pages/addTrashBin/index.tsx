import { TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useRef, useState } from 'react'
import './index.scss';
import { TRASH_TYPES } from '@constant/index';

const AddTrashBin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('e', e)
  }
  return (
    <TrashBinCard title='Add Trash Bin'>
      <form onSubmit={onSubmit}>
        <div className="form-group d-flex flex-column align-items-start mb-2">
          <label htmlFor="exampleInputEmail1" className='mb-2'>Name</label>
          <input
            type="file"
            className="form-control p-3 mb-2"
            // id="exampleInputEmail1" 
            // aria-describedby="emailHelp" 
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group d-flex flex-column align-items-start mb-2">
          <label className='mb-2'>Longitude</label>
          <input
            type="text"
            className="form-control p-3 mb-2"
            // id="exampleInputEmail1" 
            // aria-describedby="emailHelp" 
            placeholder="Add Longitude"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group d-flex flex-column align-items-start">
          <label className='mb-2'>Lattitude</label>
          <input
            type="text"
            className="form-control p-3 mb-2"
            placeholder="Add Lattitude"
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
          <button type="submit" className="btn btn-primary w-100 p-2 mt-2">SIGNUP</button>
        </div>
      </form>
    </TrashBinCard>
  )
}

export default AddTrashBin;