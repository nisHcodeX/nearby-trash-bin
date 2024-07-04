import { TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useRef, useState } from 'react'
import './index.scss';

const FindTrashBin: React.FC = () => {

  return (
    <TrashBinCard title='Find Trash Bin'>
      <>
        <div className="select-trash-wrapper">
          <div className="trash-type-text">
            <h5 className='text-success'>Select the trash type you Have</h5>
          </div>
          <div className="trash-type-btn-container">
            {/* <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Organic</button>
            <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Paper</button>
            <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Plastic</button>
            <button type="button" classNameName="btn btn-outline-secondary mt-4 mb-5" onClick={onAddTrashBinClick}>Glass</button> */}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="trashBinOrganic" checked/>
              <label className="form-check-label" htmlFor="trashBinOrganic">
                Organic
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="trashBinPaper"  />
              <label className="form-check-label" htmlFor="trashBinPaper">
                Paper
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="trashBinPlastic"  />
              <label className="form-check-label" htmlFor="trashBinPlastic">
                Plastic
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="trashBinGlass"  />
              <label className="form-check-label" htmlFor="trashBinGlass">
                Glass
              </label>
            </div>
          </div>
        </div>
      </>
    </TrashBinCard>
  )
}

export default FindTrashBin;