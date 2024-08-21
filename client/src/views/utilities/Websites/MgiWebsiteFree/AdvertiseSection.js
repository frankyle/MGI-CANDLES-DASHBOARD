// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const AdvertiseSection = () => (
  <div class="concept_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>
          OUR CONCEPT
        </h2>
        <p>
          There are many variations of passages of Lorem Ipsum
        </p>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="box">
            <div class="img-box">
              <img src="./assets/images/c-1.png" alt=""/>
              <div class="search-box" data-toggle="modal" data-bigimage="images/c-1.png" data-target="#myModal">
                <img src="./assets/images/serch-icon.png" alt=""/>
              </div>
            </div>
            <div class="detail-box">
              <h5>
                tempor incididunt ut labore et dolore
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="box">
            <div class="img-box">
              <img src="./assets/images/c-2.png" alt=""/>
              <div class="search-box" data-bigimage="images/c-2.png" data-toggle="modal" data-target="#myModal">
                <img src="./assets/images/serch-icon.png" alt=""/>
              </div>
            </div>
            <div class="detail-box">
              <h5>
                tempor incididunt ut labore et dolore
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdvertiseSection;
