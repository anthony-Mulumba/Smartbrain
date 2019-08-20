//jshint6 version:6
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div >
      <p className='f3'>
        {'This Magic Brain will detect face in your picture. give it a try!'}
      </p>
      <div className='center'>
        <div className='center form pa4 br3 shadow-5'>
          <input
          className='f3 pa2 w-70 center'
          type='text'
          onChange={onInputChange}
           />
          <button
          className='w-30 ma3 grow f4 link ph3 pv2 dib white bg-light-purple'
          onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}
export default ImageLinkForm;
