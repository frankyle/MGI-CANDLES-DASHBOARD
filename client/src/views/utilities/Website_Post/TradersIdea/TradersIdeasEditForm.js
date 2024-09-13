import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Typography,
} from '@mui/material';
import useAxios from '../../../../routes/useAxios';

function TradersIdeasEditForm({ open, onClose, candleToEdit, fetchCandles }) {
  const api = useAxios();
  const [formData, setFormData] = useState({
    trade_signal: '',
    currency_pair: '',
    post_date_time: '',
    publisher_trader: '',
    trader_platform: '',
    trader_idea: '', // Image URL
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (candleToEdit) {
      setFormData({
        trade_signal: candleToEdit.trade_signal || '',
        currency_pair: candleToEdit.currency_pair || '',
        post_date_time: candleToEdit.post_date_time || '',
        publisher_trader: candleToEdit.publisher_trader || '',
        trader_platform: candleToEdit.trader_platform || '',
        trader_idea: candleToEdit.trader_idea || '',
      });
    }
  }, [candleToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Store the file
  };

  const handleSubmit = async () => {
    // Create form data for image upload
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('trade_signal', formData.trade_signal);
    formDataToSubmit.append('currency_pair', formData.currency_pair);
    formDataToSubmit.append('post_date_time', formData.post_date_time);
    formDataToSubmit.append('publisher_trader', formData.publisher_trader);
    formDataToSubmit.append('trader_platform', formData.trader_platform);

    if (imageFile) {
      formDataToSubmit.append('trader_idea', imageFile); // Include the new image file
    }

    try {
      // Make the API call to update the data
      await api.put(`/newidea/traderideas/${candleToEdit.id}/`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchCandles(); // Refresh the list after edit
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating trader idea:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Trader Idea</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Trade Signal"
            name="trade_signal"
            value={formData.trade_signal}
            onChange={handleInputChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Currency Pair</InputLabel>
            <Select
              name="currency_pair"
              value={formData.currency_pair}
              onChange={handleInputChange}
            >
              <MenuItem value="AUDUSD">AUDUSD</MenuItem>
              <MenuItem value="EURUSD">EURUSD</MenuItem>
              {/* Add more currency pairs here */}
            </Select>
          </FormControl>

          <TextField
            label="Publisher Trader"
            name="publisher_trader"
            value={formData.publisher_trader}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Trader Platform"
            name="trader_platform"
            value={formData.trader_platform}
            onChange={handleInputChange}
            fullWidth
          />

          <Typography variant="body1">Current Image</Typography>
          {formData.trader_idea && (
            <img
              src={formData.trader_idea}
              alt="Trader Idea"
              style={{ width: '150px', height: '100px' }}
            />
          )}

          <Button variant="contained" component="label">
            Upload New Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TradersIdeasEditForm;
