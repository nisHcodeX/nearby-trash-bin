import TrashBinCard from '@components/card';
import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { deprecations } from 'sass';
import { TrashBinLogo } from '@assets/img';

const containerStyle = {
  width: "100%",
  height: "100%",
};


const TrashBinAboutUs: React.FC = () => {

  return (
    <TrashBinCard title='About Us'>
      <div className='login-container'>
        <div className='login-image-container mb-4'>
          <img src={TrashBinLogo} className='login-img-logo' />
        </div>
        <p className='text-justify' style={{ textAlign: 'justify' }}>
          Our mission is to foster a cleaner, healthier environment by providing an innovative platform for responsible waste management.
          The "Nearby Trash Bin System" is designed to help users easily locate nearby trash bins suited for their specific waste types.
          By leveraging cutting-edge AI technologies like YOLOv5 for trash bin detection and integrating Google Maps for accurate navigation,
          we empower individuals and communities to adopt sustainable waste disposal practices. This system not only promotes environmental cleanliness but also contributes to the well-being of wildlife and supports urban sustainability.
        </p>
        <p style={{ textAlign: 'justify' }}>
          We are committed to bridging the gap between traditional waste management systems and modern technological advancements,
          ensuring accessibility for both urban and rural areas. Our user-friendly platform encourages community involvement,
          enabling users to add new bins, provide feedback, and access real-time directions to the nearest trash disposal facilities.
          Together, we aim to create a greener, more sustainable future for everyone.
        </p>
      </div>
    </TrashBinCard>
  );
};

export default TrashBinAboutUs;
