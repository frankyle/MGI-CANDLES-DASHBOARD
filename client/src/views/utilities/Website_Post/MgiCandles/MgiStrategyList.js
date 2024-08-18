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
import { AddCircleOutline, Edit, Delete, Visibility } from '@mui/icons-material';
import useAxios from '../../../../routes/useAxios';
import MgiStrategyView from './MgiStrategyView';
import MgiStrategyEditForm from './MgiStrategyEditForm';

const MgiStrategyList = () => {
  const api = useAxios();
  const [candles, setCandles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candleToDelete, setCandleToDelete] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [candleToView, setCandleToView] = useState(null);

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
  }, [api]);

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

  const handleView = (candle) => {
    setCandleToView(candle);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setCandleToView(null);
    setViewModalOpen(false);
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
                <TableCell>{index + 1 }</TableCell> 
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
                <TableCell>{candle.flip_four_hour_candle}</TableCell>
                <TableCell>{candle.four_hour_break_of_structure}</TableCell>
                <TableCell>{candle.five_min_break_of_structure}</TableCell>
                <TableCell>{candle.five_min_order_block}</TableCell>
                <TableCell>{candle.change_color_ut_alert}</TableCell>
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
                  <IconButton color="default" onClick={() => handleView(candle)}>
                    <Visibility />
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

      {/* View Candle Modal */}
      <MgiStrategyView
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        candleId={candleToView ? candleToView.id : null}
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
