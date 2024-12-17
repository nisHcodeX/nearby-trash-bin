import { TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useRef, useState } from 'react'
import './index.scss';

const TrashBinContactUs: React.FC = () => {
  return (
    <TrashBinCard title='Contact Us'>
      <div className='login-container'>
        <div className='login-image-container mb-4'>
          <img src={TrashBinLogo} className='login-img-logo' />
        </div>
        <p className='text-justify' style={{ textAlign: 'justify' }}>
          We value your feedback and inquiries! Feel free to reach out to us for support or to share your suggestions for improving the "Nearby Trash Bin System." You can contact us via:
        </p>
        <p style={{ textAlign: 'justify' }}>
          Email: support@nearbytrashbinsystem.com
        </p>
        <p style={{ textAlign: 'justify' }}>
          Phone: +94 775145763
        </p>
        <p style={{ textAlign: 'justify' }}>
          Alternatively, visit our website at www.nearbytrashbinsystem.com to explore our FAQ section, user guides, and other resources. Together, let's make waste management smarter and our environment cleaner!
        </p>
      </div>
    </TrashBinCard>
  )
}

export default TrashBinContactUs;