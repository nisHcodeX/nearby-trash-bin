import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

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
    <div>
      <h2>Take a Photo</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
      />
      <button onClick={capturePhoto}>Capture</button>

      {photo && (
        <div>
          <h3>Your Photo:</h3>
          <img src={photo} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CameraComponent;