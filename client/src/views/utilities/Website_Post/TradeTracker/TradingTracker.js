import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import useAxios from '../../../../routes/useAxios';
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

  const handleAddSignal = async () => {
    const formData = new FormData();
    for (const key in newSignal) {
      formData.append(key, newSignal[key]);
    }

    try {
      await api.post('/trade/trading-signals/', formData);
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
      console.error('Error adding trading signal:', error);
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
          <TextField
            margin="dense"
            label="Currency Pair"
            type="text"
            fullWidth
            name="currency_pair"
            value={newSignal.currency_pair}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Signal Image"
            type="file"
            fullWidth
            name="signal_image"
            onChange={handleImageChange}
          />
          <TextField
            margin="dense"
            label="Monday Image"
            type="file"
            fullWidth
            name="monday_image"
            onChange={handleImageChange}
          />
          <TextField
            margin="dense"
            label="Tuesday Image"
            type="file"
            fullWidth
            name="tuesday_image"
            onChange={handleImageChange}
          />
          <TextField
            margin="dense"
            label="Wednesday Image"
            type="file"
            fullWidth
            name="wednesday_image"
            onChange={handleImageChange}
          />
          <TextField
            margin="dense"
            label="Thursday Image"
            type="file"
            fullWidth
            name="thursday_image"
            onChange={handleImageChange}
          />
          <TextField
            margin="dense"
            label="Friday Image"
            type="file"
            fullWidth
            name="friday_image"
            onChange={handleImageChange}
          />
          <TextField
            margin="dense"
            label="Pips Gained"
            type="number"
            fullWidth
            name="pips_gained"
            value={newSignal.pips_gained}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Pips Lost"
            type="number"
            fullWidth
            name="pips_lost"
            value={newSignal.pips_lost}
            onChange={handleChange}
          />
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
