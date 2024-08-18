import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useAxios from '../../../../routes/useAxios';

const TradingTrackerList = () => {
  const api = useAxios();
  const [signals, setSignals] = useState([]);

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
