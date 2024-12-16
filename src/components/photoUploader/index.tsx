import { DefaulTImage } from '@assets/img';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './index.scss'

const CameraComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
    } else {
      console.error("Webcam reference is null");
    }
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
      <h2>Take a Photo</h2>
      <Webcam
        className='rounded'
        default
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
      />
      <button className='btn btn-primary p-2 cap-btn' onClick={capturePhoto}>Capture</button>
        {photo ? (
          <div>
            <h3>Trashbin Photo</h3>
            <img className='mb-2 rounded' src={photo} alt="Captured-trashbin" />
          </div>
        ) : <img src={DefaulTImage} alt="Captured" width={350} className='mb-2 rounded' />
        }
    </div>
  );
};

export default CameraComponent;