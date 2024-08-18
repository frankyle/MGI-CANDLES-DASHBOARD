import React, { useEffect, useState } from 'react';
import useAxios from '../../../../routes/useAxios';
import { 
  Box, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  '& .MuiTableCell-root': {
    fontWeight: 'bold',
    border: '1px solid #ddd',
  }
}));

function TradersIdeasList() {
  const api = useAxios();
  const [tradersIdeas, setTradersIdeas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTradersIdeas = async () => {
      try {
        const response = await api.get('/newidea/traderideas/');
        if (response.status === 200) {
          setTradersIdeas(response.data);
        } else {
          setMessage('Error fetching traders ideas.');
        }
      } catch (error) {
        console.error('Error fetching traders ideas:', error);
        setMessage(`Error fetching traders ideas: ${error.message}`);
      }
    };

    fetchTradersIdeas();
  }, [api]);

  return (
    <Box sx={{ m: 9 }}>
      <Typography variant="h4" gutterBottom>
        Traders Ideas List
      </Typography>
      {message && <Typography color="error">{message}</Typography>}
      {tradersIdeas.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>Trading Idea</TableCell>
                <TableCell>Trade Signal</TableCell>
                <TableCell>Currency Pair</TableCell>
                <TableCell>Post Date and Time</TableCell>
                <TableCell>Publisher Trader</TableCell>
                <TableCell>Trader Platform</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {tradersIdeas.map((idea, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {idea.trader_idea && (
                      <img src={idea.trader_idea} alt="Trading Idea" style={{ width: '100px', height: 'auto' }} />
                    )}
                  </TableCell>
                  <TableCell>{idea.trade_signal}</TableCell>
                  <TableCell>{idea.currency_pair}</TableCell>
                  <TableCell>{idea.post_date_time}</TableCell>
                  <TableCell>{idea.publisher_trader}</TableCell>
                  <TableCell>{idea.trader_platform}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No traders ideas found.</Typography>
      )}
    </Box>
  );
}

export default TradersIdeasList;
