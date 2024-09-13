import React from 'react';
import { Typography, Grid } from '@mui/material';
import Slider from 'react-slick';
import CustomCard from './CustomCard';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './signalsSection.css'; // Add custom CSS styles

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

const LossSection = () => {
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
        Break Evens Section
      </Typography>
      <Slider {...settings}>
        <Grid item>
          <CustomCard
           image="image4_url"
           title1="Minimizing Losses"
           title2="Risk-Reward Ratio Strategy"
           title3="Maximize Profit Potential"
           description="Smart Forex Traders - 6.7K views • 6 hours ago"
         />
        </Grid>
        <Grid item>
          <CustomCard
           image="image4_url"
           title1="Minimizing Losses"
           title2="Risk-Reward Ratio Strategy"
           title3="Maximize Profit Potential"
           description="Smart Forex Traders - 6.7K views • 6 hours ago"
         />
        </Grid>
        <Grid item>
          <CustomCard
             image="image3_url"
             title1="How to Recover from"
             title2="a Series of Losses"
             title3="Psychology of Trading"
             description="Mindset Traders - 8.1K views • 1 day ago"
           />
        </Grid>
        <Grid item>
          <CustomCard
            image="image4_url"
            title1="AUD/USD Signal"
            title2="Long Position"
            title3="Entry: 0.7250 | TP: 0.7300"
            description="Forex Masters - 8.1K views • 5 hours ago"
          />
        </Grid>
        <Grid item>
          <CustomCard
           image="image2_url"
           title1="Avoiding Overtrading"
           title2="How to Manage Losses"
           title3="With a Trading Plan"
           description="Pip Hunters - 7.3K views • 2 days ago"
         />
        </Grid>
        <Grid item>
          <CustomCard
            image="image1_url" // Replace with an appropriate forex-related image
            title1="Cutting Losses Quickly"
            title2="The Importance of Stop-Loss"
            title3="Secure Your Capital"
            description="Forex Academy - 5.9K views • 4 days ago"
          />
        </Grid>
      </Slider>
    </div>
  );
};

export default LossSection;
