import React from 'react';
import { Typography, Grid } from '@mui/material';
import Slider from 'react-slick';
import CustomCard from './CustomCard';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './signalsSection.css'; // Add custom CSS styles
import image1 from './../../../../assets/images/websites/hero/hero1.jpg'
// Custom Arrows (Positioned beside the dots)
const PreviousArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow">
    <ArrowBackIos onClick={onClick} style={{ cursor: 'pointer' }} />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow">
    <ArrowForwardIos onClick={onClick} style={{ cursor: 'pointer' }} />
  </div> 
);

const BreakevenSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of visible slides
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: dots => (
      <div>
        <ul className="custom-dots"> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="signals-section">
       <Typography variant="h2" component="h1" gutterBottom align="center">
         Breakeven Trades
      </Typography>
      <Slider {...settings}>
        <Grid item>
          <CustomCard
            image= {image1} // Replace with actual image URL
            title1="EUR/USD Signal"
            title2="Short Position"
            title3="Entry: 1.1825 | TP: 1.1750"
            description="Forex Signals Provider - 5.8K views • 3 days ago"
          />
        </Grid>
        <Grid item>
          <CustomCard
            image= {image1}
            title1="GBP/USD Signal"
            title2="Long Position"
            title3="Entry: 1.3920 | TP: 1.4000"
            description="Daily Pips Academy - 7.4K views • 2 days ago"
          />
        </Grid>
        <Grid item>
          <CustomCard
            image={image1}
            title1="USD/JPY Signal"
            title2="Short Position"
            title3="Entry: 110.75 | TP: 110.00"
            description="Pro Forex Traders - 6.2K views • 1 day ago"
          />
        </Grid>
        <Grid item>
          <CustomCard
            image={image1}
            title1="AUD/USD Signal"
            title2="Long Position"
            title3="Entry: 0.7250 | TP: 0.7300"
            description="Forex Masters - 8.1K views • 5 hours ago"
          />
        </Grid>
        <Grid item>
          <CustomCard
            image={image1}
            title1="EUR/GBP Signal"
            title2="Short Position"
            title3="Entry: 0.8580 | TP: 0.8500"
            description="Pip Experts - 4.9K views • 1 day ago"
          />
        </Grid>
        <Grid item>
          <CustomCard
            image={image1}
            title1="USD/CAD Signal"
            title2="Long Position"
            title3="Entry: 1.2580 | TP: 1.2650"
            description="FX Masters - 3.7K views • 4 hours ago"
          />
        </Grid>
      </Slider>
    </div>
  );
};

export default BreakevenSection;
