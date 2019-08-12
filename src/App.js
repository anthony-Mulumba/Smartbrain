//jshint esversion:6
import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigations/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
 apiKey: "4a4a7cdaa1d844b09780b0323a64c24d"
});
const particlesOptions = {
  particles: {
      number: {
        value:100,
        density: {
          enable: true,
          value_area: 800
        }
      },
    }
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box:{},
    }
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }

    // let squareParam = [];
    // const faceLocationArray = response.outputs[0].data.regions;
    // faceLocationArray.forEach( element => {
    //   squareParam.push(element.region_info.bounding_box);
    // });
  }

//About Getting
  displayFaceBox = (boxresult) => {
    //console.log(boxresult);
    this.setState({box: boxresult});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    //console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.calculateFaceLocation(response))
      //To get the location in percentage where the face is in the picture
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      //or .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .then(resp => this.displayFaceBox(resp))
    .catch(err => console.log(err));
  }
 render(){
    return (
      <div className="App">
      <Particles className='particles'
            params={particlesOptions}
          />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
        box={this.state.box}
        imageUrl={this.state.imageUrl}
        />

      </div>
    );
  }

}

export default App;
