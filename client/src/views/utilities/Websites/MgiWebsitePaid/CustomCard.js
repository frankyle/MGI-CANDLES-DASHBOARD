import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const CustomCard = ({ image, title1, title2, title3, description }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="Card Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title1}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {title2}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {title3}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
