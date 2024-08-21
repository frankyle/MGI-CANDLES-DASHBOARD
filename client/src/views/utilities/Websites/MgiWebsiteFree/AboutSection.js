// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const AboutSection = () => (

  <div class="about_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="img-box">
            <img src="./assets/images/about-img.png" alt=""/>
          </div>
        </div>
        <div class="col-md-6">
          <div class="detail-box">
            <div>
              <h2>
                About Us
              </h2>
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                alteration
                in some form, by injected humour, or randomised words which don't look even slightly believableThere are
                many variations of passages of Lorem Ipsum available, but the majority have able
              </p>
              <div class="d-flex justify-content-end">
                <a href="">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
