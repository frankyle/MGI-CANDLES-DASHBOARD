// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Footer = () => (
  <div class=" footer_section">
    <div class="info_social">
      <div>
        <a href="">
          <img src="./assets/images/fb.png" alt=""/>
        </a>
      </div>
      <div>
        <a href="">
          <img src="./assets/images/twitter.png" alt=""/>
        </a>
      </div>
      <div>
        <a href="">
          <img src="./assets/images/linkedin.png" alt=""/>
        </a>
      </div>
      <div>
        <a href="">
          <img src="./assets/images/instagram.png" alt=""/>
        </a>
      </div>
    </div>
    <p>
      &copy; <span id="displayYear"></span> All Rights Reserved. Design by
      <a href="">Muhammad SamiUllah</a>
    </p>
  </div>
);

export default Footer;
