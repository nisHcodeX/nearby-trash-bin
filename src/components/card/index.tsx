import React, { ReactElement } from 'react'
import './card.scss';

const TrashBinCard: React.FC<{children: ReactElement, title: string}> = ({children, title}) => {
  return (
    <div className='trash-bin-card-wrapper'>
        <div><h4 className='mt-3 text-success mb-5'>{title}</h4></div>
        {children}
        </div>
  )
}

export default TrashBinCard