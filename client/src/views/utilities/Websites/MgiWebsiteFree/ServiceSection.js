// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const ServiceSection = () => (
  <div class="service_section layout_padding">
    <div class="container">
    <div class="heading_container">
      <h2>
        our services
      </h2>
      <p>
        There are many variations of passages of Lorem Ipsum
      </p>
    </div>
    <div class="service_container">
      <div class="box">
        <div class="img-box">
          <img src="./assets/images/cabinet.png" alt=""/>
        </div>
        <div class="detail-box">
          <h5>
            furnitures
          </h5>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the
          </p>
          <div>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="img-box">
          <img src="./assets/images/interior-design.png" alt=""/>
        </div>
        <div class="detail-box">
          <h5>
            office
          </h5>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the
          </p>
          <div>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="img-box">
          <img src="./assets/images/home.png" alt=""/>
        </div>
        <div class="detail-box">
          <h5>
            home
          </h5>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the
          </p>
          <div>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="img-box">
          <img src="./assets/images/stairs.png" alt=""/>
        </div>
        <div class="detail-box">
          <h5>
            bedroom
          </h5>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the
          </p>
          <div>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);

export default ServiceSection;
