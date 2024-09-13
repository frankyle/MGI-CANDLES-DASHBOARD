import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import useAxios from '../../../../routes/useAxios';
import MgiStrategyEditForm from './MgiStrategyEditForm';

const MgiStrategyList = () => {
  const api = useAxios();
  const [candles, setCandles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candleToDelete, setCandleToDelete] = useState(null);

  const fetchCandles = async () => {
    try {
      const response = await api.get('/mgi/mgicandles/');
      setCandles(response.data);
    } catch (error) {
      console.error('Error fetching MGI candles:', error);
    }
  };

  useEffect(() => {
    fetchCandles();
  }, []);

  const handleDelete = (id) => {
    setCandleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/mgi/mgicandles/${candleToDelete}/`);
      setCandles(candles.filter(candle => candle.id !== candleToDelete));
      setDeleteDialogOpen(false);
      setCandleToDelete(null);
    } catch (error) {
      console.error('Error deleting candle:', error);
    }
  };

  const handleEdit = (candle) => {
    setSelectedCandle(candle);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCandle(null);
    setEditModalOpen(false);
  };

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>MGI Candles</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        component={Link}
        to="/mgistrategy"
      >
        Create New Candle
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Currency Pair</TableCell>
              <TableCell>Trade Signal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Candle Pattern</TableCell>
              <TableCell>Fibonacci Level</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>4hr Flip Candle</TableCell>
              <TableCell>4hr Break of Structure</TableCell>
              <TableCell>5Min Break of Structure</TableCell>
              <TableCell>5Min Order Block</TableCell>
              <TableCell>UT Alert (Change Color )</TableCell>
              <TableCell>2hr Candle</TableCell>
              <TableCell>Signal Candle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candles.map((candle, index) => (
              <TableRow key={candle.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{candle.currency_pair}</TableCell>
                <TableCell>{candle.trade_signal}</TableCell>
                <TableCell>
                  <span style={{ color: candle.is_active ? 'green' : 'red' }}>
                    {candle.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>{candle.candle_pattern}</TableCell>
                <TableCell>{candle.fibonacci_level}</TableCell>
                <TableCell>{candle.session}</TableCell>
                <TableCell>
              <span style={{ color: candle.flip_four_hour_candle ? 'blue' : 'red' }}>
                {candle.flip_four_hour_candle ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span style={{ color: candle.four_hour_break_of_structure ? 'blue' : 'red' }}>
                {candle.four_hour_break_of_structure ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span style={{ color: candle.five_min_break_of_structure ? 'blue' : 'red' }}>
                {candle.five_min_break_of_structure ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span style={{ color: candle.five_min_order_block ? 'blue' : 'red' }}>
                {candle.five_min_order_block ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span style={{ color: candle.change_color_ut_alert ? 'blue' : 'red' }}>
                {candle.change_color_ut_alert ? 'Yes' : 'No'}
              </span>
            </TableCell>
              <TableCell>
                  <img src={candle.hour_candle} alt="Hour Candle" style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell>
                  <img src={candle.signal_candle} alt="Signal Candle" style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(candle)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(candle.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Candle Modal */}
      <MgiStrategyEditForm
        open={editModalOpen}
        onClose={handleCloseModal}
        candleToEdit={selectedCandle}
        fetchCandles={fetchCandles}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this candle?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MgiStrategyList;
