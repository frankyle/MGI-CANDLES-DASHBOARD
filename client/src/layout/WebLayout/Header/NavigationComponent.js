import React from 'react';
import { Button } from '@mui/material';

const NavigationComponent = () => {

    const handleScroll = (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Button 
                color="inherit" 
                sx={{ marginRight: 2 }}
                onClick={() => handleScroll('hero-section')}
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
                onClick={() => handleScroll('membership-section')}
            >
                Membership
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
                onClick={() => handleScroll('signal-section')}
            >
                Signals
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
