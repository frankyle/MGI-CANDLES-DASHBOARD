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



// <!-- slider section -->
// <section class=" slider_section position-relative">
//   <div class="number-box">
//     <div class="num-box">
//       <h6>01</h6>
//     </div>
//     <div class="num-box">
//       <h6>01</h6>
//     </div>
//   </div>
//   <div class="container">
//     <div class="row">
//       <div class="col-lg-7 col-md-10">
//         <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
//           <div class="carousel-inner">
//             <div class="carousel-item active">
//               <div class="detail-box">
//                 <h1>
//                   interior <br />
//                   design
//                 </h1>
//                 <p>
//                   There are many variations of passages of Lorem Ipsum
//                   available, but the majority have suffered alteration in some
//                   form, by
//                 </p>
//                 <div>
//                   <a href="">
//                     Contact us
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div class="carousel-item">
//               <div class="detail-box">
//                 <h1>
//                   interior <br />
//                   design
//                 </h1>
//                 <p>
//                   There are many variations of passages of Lorem Ipsum
//                   available, but the majority have suffered alteration in some
//                   form, by
//                 </p>
//                 <div>
//                   <a href="">
//                     Contact us
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div class="carousel-item">
//               <div class="detail-box">
//                 <h1>
//                   interior <br />
//                   design
//                 </h1>
//                 <p>
//                   There are many variations of passages of Lorem Ipsum
//                   available, but the majority have suffered alteration in some
//                   form, by
//                 </p>
//                 <div>
//                   <a href="">
//                     Contact us
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//             <span class="sr-only">Previous</span>
//           </a>
//           <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//             <span class="sr-only">Next</span>
//           </a>
//         </div>

//       </div>
//     </div>
//   </div>
// </section>

// <!-- end slider section -->