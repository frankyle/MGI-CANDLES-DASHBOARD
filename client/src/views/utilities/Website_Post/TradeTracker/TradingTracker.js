import React, { useState } from 'react';
import {
  Box,
  Typography,
  InputLabel,
  Select,
  Button,
  Dialog,
  DialogActions,
  MenuItem,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  IconButton
} from '@mui/material';
import { AddCircleOutline, UploadFile } from '@mui/icons-material';
import useAxios from '../../../../routes/useAxios'; // Axios instance for API requests
import TradingTrackerList from './TradingTrackerList';

const TradingTracker = () => {
  const api = useAxios();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newSignal, setNewSignal] = useState({
    currency_pair: '',
    signal_image: null,
    monday_image: null,
    tuesday_image: null,
    wednesday_image: null,
    thursday_image: null,
    friday_image: null,
    pips_gained: 0,
    pips_lost: 0,
  });

 
  // Handle text field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSignal((prevSignal) => ({
      ...prevSignal,
      [name]: value,
    }));
  };

  // Handle submit of new trading signal
  const handleAddSignal = async () => {
    const formData = new FormData();

     // Add each field to FormData
    for (const key in newSignal) {
      formData.append(key, newSignal[key]);
    }

    try {
      await api.post('/tracker/tradetracker/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      setAddModalOpen(false);
      setNewSignal({
        currency_pair: '',
        signal_image: null,
        monday_image: null,
        tuesday_image: null,
        wednesday_image: null,
        thursday_image: null,
        friday_image: null,
        pips_gained: 0,
        pips_lost: 0,
      });
    } catch (error) {
      console.error('Error adding trading Tracker:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSignal((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setNewSignal((prev) => ({ ...prev, [name]: files[0] }));
  };

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Trading Signal Tracker</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={() => setAddModalOpen(true)}
      >
        Add New Signal
      </Button>

      <TradingTrackerList />

      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <DialogTitle>Add New Signal</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Currency Pair</InputLabel>
              <Select
                fullWidth
                name="currency_pair"
                value={newSignal.currency_pair}
                onChange={handleChange}
              >
                <MenuItem value="AUDUSD">AUDUSD</MenuItem>
                <MenuItem value="BTCUSD">BTCUSD</MenuItem>
                <MenuItem value="CADJPY">CADJPY</MenuItem>
                <MenuItem value="EURUSD">EURUSD</MenuItem>
                <MenuItem value="GBPUSD">GBPUSD</MenuItem>
                <MenuItem value="XAUUSD">XAUUSD</MenuItem>
              </Select>
            </Grid>

            {/* Signal Image Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
                Signal Image
              </Typography>
              {newSignal.signal_image && (
                <img
                  src={URL.createObjectURL(newSignal.signal_image)}
                  alt="Signal"
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
                id="signal-image-input"
                type="file"
                name="signal_image"
                onChange={handleImageChange}
              />
              <label htmlFor="signal-image-input">
                <IconButton color="primary" aria-label="upload signal image" component="span">
                  <UploadFile />
                </IconButton>
              </label>
            </Grid>

            {/* Repeat the same structure for other days */}
            {['monday_image', 'tuesday_image', 'wednesday_image', 'thursday_image', 'friday_image'].map((day, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
                  {`${day.replace('_image', '').charAt(0).toUpperCase() + day.replace('_image', '').slice(1)} Image`}
                </Typography>
                {newSignal[day] && (
                  <img
                    src={URL.createObjectURL(newSignal[day])}
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
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Pips Gained"
                type="number"
                fullWidth
                name="pips_gained"
                value={newSignal.pips_gained}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Pips Lost"
                type="number"
                fullWidth
                name="pips_lost"
                value={newSignal.pips_lost}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSignal} color="primary">
            Add Signal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TradingTracker;
