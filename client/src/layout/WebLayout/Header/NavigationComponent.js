import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationComponent = () => {

    const handleScroll = (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 70; // Adjust this offset to match your sticky header height
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    return (
        <div>
            <Button 
                color="inherit" 
                sx={{ marginRight: 2 }}
                component={Link} 
                to={"/mgiwebsitefree"}
            >
                Home
            </Button>
            <Button 
                color="inherit" 
                sx={{ marginRight: 2 }}
                onClick={() => handleScroll('service-section')}
            >
                Services
            </Button>
            <Button 
                color="inherit" 
                sx={{ marginRight: 2 }}
                onClick={() => handleScroll('about-section')}
            >
                About
            </Button>
            
            <Button 
                color="inherit" 
                sx={{ marginRight: 2 }}
                onClick={() => handleScroll('tutorial-section')}
            >
                Tutorials
            </Button>
            <Button 
                color="inherit" 
                sx={{ marginRight: 2 }}
                onClick={() => handleScroll('membership-section')}
            >
                Membership
            </Button>
            <Button 
                color="inherit" 
                onClick={() => handleScroll('contact-us')}
            >
                Contact Us
            </Button>
        </div>
    );
};

export default NavigationComponent;
