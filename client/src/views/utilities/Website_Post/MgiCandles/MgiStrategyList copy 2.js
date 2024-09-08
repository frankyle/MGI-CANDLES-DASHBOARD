import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import useAxios from '../../../../routes/useAxios';
import { Link } from 'react-router-dom';
import { AddCircleOutline } from '@mui/icons-material';

function MgiStrategyList() {
  const api = useAxios();
  const [traderIdeas, setTraderIdeas] = useState([]);
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedIdeaToEdit, setSelectedIdeaToEdit] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedIdeaToDelete, setSelectedIdeaToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trader ideas
        const traderIdeasResponse = await api.get('/mgi/traderideas/');
        setTraderIdeas(traderIdeasResponse.data);

        // Fetch candles
        const candlesResponse = await api.get('/mgi/mgicandles/');
        setCandles(candlesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  const handleOpenImageModal = (idea) => {
    if (idea.trader_idea) {
      setSelectedImage(idea.trader_idea);
      setOpenImageModal(true);
    }
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage(null);
  };

  const handleOpenEditModal = (idea) => {
    setSelectedIdeaToEdit(idea);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedIdeaToEdit(null);
  };

  const handleOpenDeleteModal = (idea) => {
    setSelectedIdeaToDelete(idea);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedIdeaToDelete(null);
  };

  const handleEditIdea = async (idea) => {
    // Implement your edit logic here
    console.log('Editing idea:', idea);
    handleCloseEditModal();
  };

  const handleDeleteIdea = async (idea) => {
    try {
      // Implement your delete logic here
      await api.delete(`/mgi/traderideas/${idea.id}/`);
      const updatedTraderIdeas = traderIdeas.filter((i) => i.id !== idea.id);
      setTraderIdeas(updatedTraderIdeas);
    } catch (error) {
      console.error('Error deleting idea:', error);
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
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

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>2hr Candle</TableCell>
                <TableCell>Signal Candle</TableCell>
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {traderIdeas.map((candle, index) => (
                <TableRow key={candle.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell onClick={() => handleOpenImageModal(candle)}>
                    {candle.trader_idea && (
                      <img
                        src={candle.hour_candle}
                        alt="Hour Idea"
                        style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                      />
                    )}
                  </TableCell>
                  <TableCell onClick={() => handleOpenImageModal(candle)}>
                    {candle.trader_idea && (
                      <img
                        src={candle.signal_candle}
                        alt="Signal Idea"
                        style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                      />
                    )}
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
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(candle)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleOpenDeleteModal(candle)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Image Modal */}
      <Dialog open={openImageModal} onClose={handleCloseImageModal}>
        <DialogTitle>Trader Idea Image</DialogTitle>
        <DialogContent>
          {selectedImage ? (
            <DialogContentText>
              <img src={selectedImage} alt="Trading Idea" style={{ width: '100%' }} />
            </DialogContentText>
          ) : (
            <DialogContentText>No image available for this idea.</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Trader Idea</DialogTitle>
        <DialogContent>
          {/* Implement your edit form here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={() => handleEditIdea(selectedIdeaToEdit)}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete Trader Idea</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this trader idea?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDeleteIdea(selectedIdeaToDelete)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MgiStrategyList;
