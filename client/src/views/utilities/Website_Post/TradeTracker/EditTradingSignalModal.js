import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Grid, Typography, IconButton } from '@mui/material';
import UploadFile from '@mui/icons-material/UploadFile';

const EditTradingSignalModal = ({ open, handleClose, signal, handleInputChange, handleEditSubmit, handleImageChange }) => {
  if (!signal) return null; // If no signal is provided, return nothing.

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Trading Signal</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the selected trading signal.</DialogContentText>
        <TextField
          margin="dense"
          label="Currency Pair"
          name="currency_pair"
          fullWidth
          value={signal.currency_pair}
          onChange={handleInputChange}
        />

        {/* Repeat structure for images */}
        {['monday_image', 'tuesday_image', 'wednesday_image', 'thursday_image', 'friday_image'].map((day, index) => (
          <Grid item xs={12} key={index} style={{ marginTop: '16px' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
              {`${day.replace('_image', '').charAt(0).toUpperCase() + day.replace('_image', '').slice(1)} Image`}
            </Typography>
            {signal[day] && (
              <img
                src={URL.createObjectURL(signal[day])}
                alt={`${day}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: 4,
                  border: '2px solid #ccc',
                  objectFit: 'cover',
                }}
              />
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={`${day}-input`}
              type="file"
              name={day}
              onChange={handleImageChange}
            />
            <label htmlFor={`${day}-input`}>
              <IconButton color="primary" aria-label={`upload ${day}`} component="span">
                <UploadFile />
              </IconButton>
            </label>
          </Grid>
        ))}

        {/* Pips Gained and Lost */}
        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Pips Gained"
              type="number"
              fullWidth
              name="pips_gained"
              value={signal.pips_gained}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Pips Lost"
              type="number"
              fullWidth
              name="pips_lost"
              value={signal.pips_lost}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEditSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTradingSignalModal;
