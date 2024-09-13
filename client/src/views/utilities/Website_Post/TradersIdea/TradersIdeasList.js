import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, MenuItem } from '@mui/material';
import useAxios from '../../../../routes/useAxios';
import TradersIdeasEditForm from './TradersIdeasEditForm'; // Import the edit form component

function TradersIdeaList() {
  const api = useAxios();   
  const [traderIdeas, setTraderIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedIdeaToEdit, setSelectedIdeaToEdit] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedIdeaToDelete, setSelectedIdeaToDelete] = useState(null);
  
  // New state for filters
  const [publisherFilter, setPublisherFilter] = useState('');
  const [currencyPairFilter, setCurrencyPairFilter] = useState('');

  useEffect(() => {
    const fetchTraderIdeas = async () => {
      try {
        const response = await api.get('/newidea/traderideas/');
        setTraderIdeas(response.data);
      } catch (error) {
        console.error('Error fetching Trader Ideas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTraderIdeas();
  }, []);

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
    setSelectedIdeaToEdit(idea); // Set the idea to edit
    setOpenEditModal(true); // Open the modal
  };


  const fetchCandles = () => {
    // Re-fetch the ideas after editing to refresh the list
    const fetchTraderIdeas = async () => {
      try {
        const response = await api.get('/newidea/traderideas/');
        setTraderIdeas(response.data);
      } catch (error) {
        console.error('Error fetching Trader Ideas:', error);
      }
    };
    fetchTraderIdeas();
  };


  
  const handleCloseEditModal = () => {
    setOpenEditModal(false); // Close the modal
    setSelectedIdeaToEdit(null); // Clear the selected idea after closing
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
    console.log('Editing idea:', idea);
    handleCloseEditModal();
  };

  const handleDeleteIdea = async (idea) => {
    try {
      await api.delete(`/newidea/traderideas/${idea.id}/`);
      setTraderIdeas(traderIdeas.filter((i) => i.id !== idea.id));
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting trader idea:', error);
    }
  };

  // Apply filters to the traderIdeas
  const filteredTraderIdeas = traderIdeas.filter((idea) => {
    return (
      (publisherFilter === '' || idea.publisher_trader.toLowerCase().includes(publisherFilter.toLowerCase())) &&
      (currencyPairFilter === '' || idea.currency_pair === currencyPairFilter)
    );
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Traders' Ideas
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Filter by Publisher"
          variant="outlined"
          value={publisherFilter}
          onChange={(e) => setPublisherFilter(e.target.value)}
          sx={{ mr: 2, mb: 2 }}
        />

        <TextField
          select
          label="Filter by Currency Pair"
          variant="outlined"
          value={currencyPairFilter}
          onChange={(e) => setCurrencyPairFilter(e.target.value)}
          sx={{ mr: 2, mb: 2 }}
        >
          <MenuItem value="">All</MenuItem>
          
          <MenuItem value="AUDUSD">AUDUSD</MenuItem>
            <MenuItem value="AUDJPY">AUDNZD</MenuItem>
            <MenuItem value="AUDJPY">AUDJPY</MenuItem>
            <MenuItem value="BTCUSD">BTCUSD</MenuItem>
            <MenuItem value="CADJPY">CADJPY</MenuItem>
            <MenuItem value="CHFJPY">CHFJPY</MenuItem>
            <MenuItem value="EURCAD">EURCAD</MenuItem>
            <MenuItem value="EURUSD">EURUSD</MenuItem>
            <MenuItem value="EURCHF">EURCHF</MenuItem>
            <MenuItem value="EURNZD">EURNZD</MenuItem>
            <MenuItem value="EURJPY">EURJPY</MenuItem>
            <MenuItem value="EURCAD">EURCAD</MenuItem>
            <MenuItem value="GBPAUD">GBPAUD</MenuItem>
            <MenuItem value="GBPCAD">GBPCAD</MenuItem>
            <MenuItem value="GBPCHF">GBPCHF</MenuItem>
            <MenuItem value="GBPJPY">GBPJPY</MenuItem>
            <MenuItem value="GBPNZD">GBPNZD</MenuItem>
            <MenuItem value="GBPUSD">GBPUSD</MenuItem>
            <MenuItem value="NZDCAD">NZDCAD</MenuItem>
            <MenuItem value="NZDJPY">NZDJPY</MenuItem>
            <MenuItem value="NZDUSD">NZDUSD</MenuItem>
            <MenuItem value="USDCAD">USDCAD</MenuItem>
            <MenuItem value="USDCHF">USDCHF</MenuItem>
            <MenuItem value="USDJPY">USDJPY</MenuItem>
            <MenuItem value="USOIL">USOIL</MenuItem>
            <MenuItem value="XAGUSD">XAGUSD</MenuItem>
            <MenuItem value="XAUUSD">XAUUSD</MenuItem>

           {/* Add more currency pairs as needed */}
        </TextField>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Image (Click to View)</TableCell>
                <TableCell>Trade Signal</TableCell>
                <TableCell>Currency Pair</TableCell>
                <TableCell>Post Date and Time</TableCell>
                <TableCell>Publisher Trader</TableCell>
                <TableCell>Trader Platform</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTraderIdeas.map((idea, index) => (
                <TableRow key={idea.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell onClick={() => handleOpenImageModal(idea)}>
                    {idea.trader_idea && (
                      <img
                        src={idea.trader_idea}
                        alt="Trading Idea"
                        style={{ cursor: 'pointer', width: '150px', height: '100px' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{idea.trade_signal}</TableCell>
                  <TableCell>{idea.currency_pair}</TableCell>
                  <TableCell>{new Date(idea.post_date_time).toLocaleString()}</TableCell>
                  <TableCell>{idea.publisher_trader}</TableCell>
                  <TableCell>{idea.trader_platform}</TableCell>
                  <TableCell>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenEditModal(idea)} // Open edit modal with idea data
                    >
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleOpenDeleteModal(idea)}>
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

        {/* Render the TradersIdeasEditForm component */}
        {selectedIdeaToEdit && (
        <TradersIdeasEditForm
          open={openEditModal} // Control modal open/close state
          onClose={handleCloseEditModal} // Handle closing the modal
          candleToEdit={selectedIdeaToEdit} // Pass the selected idea to the form
          fetchCandles={fetchCandles} // Refresh the data after editing
        />
      )}

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

export default TradersIdeaList;
