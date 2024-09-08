import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import useAxios from '../../../../routes/useAxios';

const TradingTrackerList = () => {
  const api = useAxios(); // Axios instance
  const [signals, setSignals] = useState([]); // State to store signals
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch signals from the backend
  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await api.get('/tracker/tradetracker/');
        setSignals(response.data);
      } catch (err) {
        console.error('Error fetching signals:', err);
        setError('Failed to fetch trading signals');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSignals();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Currency Pair</TableCell>
            <TableCell>Signal Image</TableCell>
            <TableCell>Monday Image</TableCell>
            <TableCell>Tuesday Image</TableCell>
            <TableCell>Wednesday Image</TableCell>
            <TableCell>Thursday Image</TableCell>
            <TableCell>Friday Image</TableCell>
            <TableCell>Pips Gained</TableCell>
            <TableCell>Pips Lost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {signals.map((signal, index) => (
            <TableRow key={signal.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{signal.currency_pair}</TableCell>
              <TableCell>
                <img src={signal.signal_image} alt="Signal" style={{ width: '50px', height: 'auto' }} />
              </TableCell>
              <TableCell>
                <img src={signal.monday_image} alt="Monday Signal" style={{ width: '50px', height: 'auto' }} />
              </TableCell>
              <TableCell>
                <img src={signal.tuesday_image} alt="Tuesday Signal" style={{ width: '50px', height: 'auto' }} />
              </TableCell>
              <TableCell>
                <img src={signal.wednesday_image} alt="Wednesday Signal" style={{ width: '50px', height: 'auto' }} />
              </TableCell>
              <TableCell>
                <img src={signal.thursday_image} alt="Thursday Signal" style={{ width: '50px', height: 'auto' }} />
              </TableCell>
              <TableCell>
                <img src={signal.friday_image} alt="Friday Signal" style={{ width: '50px', height: 'auto' }} />
              </TableCell>
              <TableCell>{signal.pips_gained}</TableCell>
              <TableCell>{signal.pips_lost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradingTrackerList;
