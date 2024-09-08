import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import useAxios from '../../../../routes/useAxios';

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
    setSelectedImage(null); // Clear selected image on close
  };

  const handleOpenEditModal = (idea) => {
    setSelectedIdeaToEdit(idea);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedIdeaToEdit(null); // Clear selected idea to edit on close
  };

  const handleOpenDeleteModal = (idea) => {
    setSelectedIdeaToDelete(idea);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedIdeaToDelete(null); // Clear selected idea to delete on close
  };

  const handleEditIdea = async (idea) => {
    // Implement your edit logic here, potentially using a modal or form to update the idea
    console.log('Editing idea:', idea);
    // After successful editing, update the traderIdeas state and close the modal
    handleCloseEditModal();
  };

  const handleDeleteIdea = async (idea) => {
    // Implement your delete logic here, using an API call to remove the idea
    
    console.log('Deleting idea:', idea);
    // After successful deletion, remove the idea from the traderIdeas state and close the modal
    const updatedTraderIdeas = traderIdeas.filter((i) => i.id !== idea.id);
    setTraderIdeas(updatedTraderIdeas);
    handleCloseDeleteModal();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Traders' Ideas
      </Typography>

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
              {traderIdeas.map((idea, index) => (
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
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(idea)}>
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

export default TradersIdeaList;