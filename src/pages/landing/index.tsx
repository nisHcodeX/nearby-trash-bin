import { AddTrashBin, FindTrashBin, TrashBin } from '@assets/img';
import TrashBinCard from '@components/card';
import './landing.scss'
import React from 'react'

const TrashBinLanding = () => {
  return (
    <>
      <TrashBinCard title='Welcome to Nearby Trash bin'>
        <>
          <div className='d-flex flex-column justify-content-center align-items-center gap-5'>
            <div className='home-trash-bin-wrapper p-4'>
              <div className='home-trash-bin-img-wrapper'>
                  <img className='home-trash-bin-img-wrapper' src={FindTrashBin}/>
              </div>
              <div style={{ backgroundImage: `url(${TrashBin})` }} className='home-trash-bin  pt-3'>
                <button type="button" className="btn btn-outline-secondary mt-4">Find trash bin</button>
              </div>
              <div className='home-trash-bin-text-container d-flex flex-column justify-content-center align-items-center gap-2 mt-6'>
                <h4>Log in to the </h4>
                <p >
                  Clicking here your can find out nearrest garbage bin according to the trash type you have
                </p>
              </div>
            </div>
            <div className='home-trash-bin-wrapper p-4'>
            <div className='home-trash-bin-img-wrapper'>
                  <img className='home-trash-bin-img-wrapper' src={AddTrashBin}/>
              </div>
              <div style={{ backgroundImage: `url(${TrashBin})` }} className='home-trash-bin pt-3'>
                <button type="button" className="btn btn-outline-secondary mt-4 mb-5">Add trash bin</button>
              </div>
              <div className='home-trash-bin-text-container d-flex flex-column justify-content-center align-items-center gap-2 mt-6'>
                <h4>Add Trash bin</h4>
                <p>
                  Clicking here your can add trash bin to our system to help out other to find out trash bin easily
                </p>
              </div>
            </div>
          </div>

        </>
      </TrashBinCard>
    </>
  )
}

export default TrashBinLanding;