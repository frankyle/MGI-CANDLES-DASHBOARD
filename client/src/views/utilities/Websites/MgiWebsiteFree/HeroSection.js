import React from 'react';
import Slider from 'react-slick';
import { Typography, Box } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from "./../../../../assets/images/websites/hero/hero1.jpg"
import image4 from "./../../../../assets/images/websites/hero/hero4.jpg"
import image5 from "./../../../../assets/images/websites/hero/hero5.jpg"

const images = [
  { src: image1, alt: 'Hero Image 1', content: 'Hero Content 1' },
  { src: image4, alt: 'Hero Image 2', content: 'Hero Content 2' },
  { src: image5, alt: 'Hero Image 3', content: 'Hero Content 3' },
];

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 80,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} position="relative">
            <img src={image.src} alt={image.alt} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              color="white"
              textAlign="center"
              bgcolor="rgba(0, 0, 0, 0.5)"
              p={2}
              borderRadius={2}
            >
              <Typography variant="h4">{image.content}</Typography>
            </Box>
          </Box>
        ))}
      </Slider>
  );
};

export default HeroSection;
