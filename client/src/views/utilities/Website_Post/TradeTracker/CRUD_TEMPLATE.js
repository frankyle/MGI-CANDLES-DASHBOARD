import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Input
} from '@mui/material';
import { AddCircleOutline} from '@mui/icons-material';
import useAxios from '../../../../routes/useAxios';

const TradingSignalTracker = () => {
  const api = useAxios();
  const [signals, setSignals] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newSignal, setNewSignal] = useState({
    currency_pair: '',
    date: '',
    day_of_week: '',
    image: null,
    pips_gained: 0,
    pips_lost: 0
  });

  const fetchSignals = async () => {
    try {
      const response = await api.get('/trade/trading-signals/');
      setSignals(response.data);
    } catch (error) {
      console.error('Error fetching trading signals:', error);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, [api]);

  const handleAddSignal = async () => {
    const formData = new FormData();
    for (const key in newSignal) {
      formData.append(key, newSignal[key]);
    }

    try {
      await api.post('/trade/trading-signals/', formData);
      fetchSignals();
      setAddModalOpen(false);
      setNewSignal({
        currency_pair: '',
        date: '',
        day_of_week: '',
        image: null,
        pips_gained: 0,
        pips_lost: 0
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
    setNewSignal((prev) => ({ ...prev, image: e.target.files[0] }));
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
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Currency Pair</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Day of Week</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Pips Gained</TableCell>
              <TableCell>Pips Lost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {signals.map((signal, index) => (
              <TableRow key={signal.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{signal.currency_pair}</TableCell>
                <TableCell>{signal.date}</TableCell>
                <TableCell>{signal.day_of_week}</TableCell>
                <TableCell>
                  <img src={signal.image} alt="Signal" style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell>{signal.pips_gained}</TableCell>
                <TableCell>{signal.pips_lost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={newSignal.date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Day of Week"
            type="text"
            fullWidth
            name="day_of_week"
            value={newSignal.day_of_week}
            onChange={handleChange}
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
          <Input
            type="file"
            fullWidth
            onChange={handleImageChange}
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

export default TradingSignalTracker;
