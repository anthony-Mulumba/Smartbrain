import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className='center'>
      <div className='absolute ma'>
        <img id='inputimage' alt='Face_Recognition' src={imageUrl} width='500px' heigh='auto' />
        <div className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol,}}>
        </div>
      </div>
    </div>
  )
}
export default FaceRecognition;
