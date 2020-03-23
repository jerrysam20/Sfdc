import React from 'react';
import './ExplorePage.css';
import CardComponent from '../../Components/Card/Card';
import img1 from '../../assets/jdk-logo.png';
import img2 from '../../assets/sap-hybris-logo.png';
import img3 from '../../assets/logicon.png';

const ExplorePage = () => (
  <div className="body-container">
    <h1>Choose from the below categories:</h1>
    <div className="block_container">
      <div className="card-section">
        <CardComponent
          imageUrl={img1}
          buttonText="Scan"
          headerText="JDK"
          subtitleText="Scan hybris code"
          onButtonClick={() => {
            window.location.href = '/scan/jdk';
          }}
        />
      </div>
      <div className="card-section">
        <CardComponent
          imageUrl={img2}
          buttonText="Scan"
          headerText="Hybris"
          subtitleText="Scan Hybris source code"
          onButtonClick={() => {
            window.location.href = '/scan/hybris';
          }}
        />
      </div>
      <div className="card-section">
        <CardComponent
          imageUrl={img3}
          buttonText="Scan"
          headerText="Log"
          subtitleText="Scan Log files"
          onButtonClick={() => {
            window.location.href = '/scan/log';
          }}
        />
      </div>
    </div>
  </div>
);

ExplorePage.defaultProps = {
  match: ''
};

export default ExplorePage;
