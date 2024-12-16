import { FindTrashBin, TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useEffect } from 'react'
import './index.scss';
import { getSession } from '@utils/index';
import { useNavigate } from 'react-router-dom';
const TrashBinProfile = () => {

    const navigate = useNavigate();
    const session = getSession();
    useEffect(() => {
        if(!session) navigate('/login');;
    }, []);
    
    return (
        <TrashBinCard title='Welcome to Profile'>
            <div>
                <div className='pro-pic-container'>
                    <img src={TrashBinLogo} className='profile-img-logo'/>
                </div>
                <h3 className='mt-4 text-success'>user details</h3>
                <div className='mt-4' >{session?.name}</div>
                <div className='mt-4'>{session?.email}</div>
                <div className='mt-4'>{session?.phoneNumber}</div>
                <h3 className='mt-4 text-success'>User activities</h3>
                <div className='mt-4' >suggest trash bin for the system</div>
                <div className='mt-4'>successfully dispose trash to bin 78562</div>
                <div className='mt-4'>add a trash bin to system 7856</div>
            </div>
        </TrashBinCard>
    )
}

export default TrashBinProfile;