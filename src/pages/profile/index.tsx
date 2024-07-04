import { FindTrashBin, TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React from 'react'
import './index.scss';
const TrashBinProfile = () => {
    return (
        <TrashBinCard title='Welcome to Profile'>
            <div>
                <div className='pro-pic-container'>
                    <img src={TrashBinLogo} className='profile-img-logo'/>
                </div>
                <h3 className='mt-4 text-success'>user details</h3>
                <div className='mt-4' >my name</div>
                <div className='mt-4'>my email</div>
                <div className='mt-4'>my number</div>
                <h3 className='mt-4 text-success'>User activities</h3>
            </div>
        </TrashBinCard>
    )
}

export default TrashBinProfile;