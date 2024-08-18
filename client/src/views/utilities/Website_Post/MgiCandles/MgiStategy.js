import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { 

  Card, Box, Typography, IconButton, Button, FormControl, 
  InputLabel, Select, MenuItem, TextField, Checkbox, 
  FormControlLabel, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import UploadFile from '@mui/icons-material/UploadFile';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import useAxios from './../../../../routes/useAxios';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// styles
const FormWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// =============================|| MGISTRATEGY IDEA ||============================= //

const MgiStrategy = () => {
  const api = useAxios();
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const [signalCandle, setSignalCandle] = useState(null);
  const [hourCandle, setHourCandle] = useState(null);
  const [signalCandleUrl, setSignalCandleUrl] = useState(null);
  const [hourCandleUrl, setHourCandleUrl] = useState(null);
  const [tradeSignal, setTradeSignal] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [candlePattern, setCandlePattern] = useState('');
  const [fibonacciLevel, setFibonacciLevel] = useState('');
  const [fiveMinOrderBlock, setFiveMinOrderBlock] = useState(false);
  const [flipFourHourCandle, setFlipFourHourCandle] = useState(false);
  const [fourHourBreakOfStructure, setFourHourBreakOfStructure] = useState(false);
  const [fiveMinBreakOfStructure, setFiveMinBreakOfStructure] = useState(false);
  const [currencyPair, setCurrencyPair] = useState('');
  const [session, setSession] = useState('');
  const [changeColorUTAlert, setChangeColorUTAlert] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user', user.id);
    formData.append('signal_candle', signalCandle);
    formData.append('hour_candle', hourCandle);
    formData.append('trade_signal', tradeSignal);
    formData.append('is_active', isActive);
    formData.append('candle_pattern', candlePattern);
    formData.append('fibonacci_level', fibonacciLevel);
    formData.append('session', session);  
    formData.append('currency_pair', currencyPair); 
    formData.append('five_min_order_block', fiveMinOrderBlock);
    formData.append('flip_four_hour_candle', flipFourHourCandle);
    formData.append('four_hour_break_of_structure', fourHourBreakOfStructure);
    formData.append('five_min_break_of_structure', fiveMinBreakOfStructure);
    formData.append('change_color_ut_alert', changeColorUTAlert);

    try {
      const response = await api.post('/mgi/mgicandles/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201) {
        setMessage('MGI Strategy submitted successfully!');
        setSignalCandle(null);
        setHourCandle(null);
        setSignalCandleUrl(null);
        setHourCandleUrl(null);
        setTradeSignal('');
        setIsActive(false);
        setCandlePattern('');
        setFibonacciLevel('');
        setSession('');  
        setCurrencyPair(''); 
        setFiveMinOrderBlock(false);
        setFlipFourHourCandle(false);
        setFourHourBreakOfStructure(false);
        setFiveMinBreakOfStructure(false);
        setChangeColorUTAlert(false); 

        // Add the submitted data to the state
        setSubmittedData(prevData => [
          ...prevData, 
          {
            tradeSignal,
            isActive,
            candlePattern,
            fibonacciLevel,
            session,
            currencyPair,
            fiveMinOrderBlock,
            flipFourHourCandle,
            fourHourBreakOfStructure,
            fiveMinBreakOfStructure,
            changeColorUTAlert,
            signalCandleUrl, 
            hourCandleUrl  
          }
        ]);

      } else {
        setMessage('Error submitting MGI Strategy. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting MGI Strategy:', error);
      setMessage(`Error submitting MGI Strategy: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleSignalCandleChange = (event) => {
    const file = event.target.files[0];
    setSignalCandle(file);
    setSignalCandleUrl(URL.createObjectURL(file));
  };

  const handleHourCandleChange = (event) => {
    const file = event.target.files[0];
    setHourCandle(file);
    setHourCandleUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (signalCandleUrl) {
        URL.revokeObjectURL(signalCandleUrl);
      }
      if (hourCandleUrl) {
        URL.revokeObjectURL(hourCandleUrl);
      }
    };
  }, [signalCandleUrl, hourCandleUrl]);

  // Styled TableHead for customization
  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main, // Use theme colors
    '& .MuiTableCell-root': {  // Style all cells within the header
      fontWeight: 'bold',
      border: '1px solid #ddd', // Add a border to each header cell
      color: theme.palette.text.primary, // Use theme text color
    }
  }));
  

  
  return (
    <MainCard
      title="MGI Strategy Trading"
    >
      <Card sx={{ overflow: 'hidden' }}>
        <FormWrapper>
        <Box sx={{ m: 9 }} component="form" onSubmit={handleSubmit}>
      {user && <p>Logged in as: {user.username}</p>}
      {message && <div className="alert alert-info">{message}</div>}

      <Box sx={{ mr: 4 }}>
        {/* Currency Pair Selector */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Currency Pair</InputLabel>
          <Select value={currencyPair} onChange={(e) => setCurrencyPair(e.target.value)}>
          <MenuItem value="AUDUSD">AUDUSD</MenuItem>
            <MenuItem value="AUDJPY">AUDNZD</MenuItem>
            <MenuItem value="AUDJPY">BTCUSD</MenuItem>
            <MenuItem value="AUDCAD">CADJPY</MenuItem>
            <MenuItem value="EURUSD">CHFJPY</MenuItem>
            <MenuItem value="EURUSD">EURCAD</MenuItem>
            <MenuItem value="EURUSD">EURUSD</MenuItem>
            <MenuItem value="EURUSD">EURCHF</MenuItem>
            <MenuItem value="EURUSD">EURNZD</MenuItem>
            <MenuItem value="EURJPY">EURJPY</MenuItem>
            <MenuItem value="EURCAD">EURCAD</MenuItem>
            <MenuItem value="GBPCAD">GBPAUD</MenuItem>
            <MenuItem value="GBPCAD">GBPCAD</MenuItem>
            <MenuItem value="GBPCAD">GBPCHF</MenuItem>
            <MenuItem value="GBPJPY">GBPJPY</MenuItem>
            <MenuItem value="GBPUSD">GBPNZD</MenuItem>
            <MenuItem value="GBPUSD">GBPUSD</MenuItem>
            <MenuItem value="USDCAD">NZDCAD</MenuItem>
            <MenuItem value="USDCAD">NZDJPY</MenuItem>
            <MenuItem value="USDCAD">NZDUSD</MenuItem>
            <MenuItem value="USDCAD">USDCAD</MenuItem>
            <MenuItem value="USOIL">USDCHF</MenuItem>
            <MenuItem value="USOIL">USDJPY</MenuItem>
            <MenuItem value="USOIL">USOIL</MenuItem>
            <MenuItem value="XAUUSD">XAUUSD</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Signal Candle
        </Typography>
        {signalCandleUrl && (
          <img
            src={signalCandleUrl}
            alt="Signal Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="signal-candle-input"
          type="file"
          onChange={handleSignalCandleChange}
        />
        <label htmlFor="signal-candle-input">
          <IconButton
            color="primary"
            aria-label="upload signal candle"
            component="span"
          >
            <UploadFile />
          </IconButton>
        </label>

        <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
          2-Hour Candle
        </Typography>
        {hourCandleUrl && (
          <img
            src={hourCandleUrl}
            alt="Hour Candle"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 4,
              border: '2px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="hour-candle-input"
          type="file"
          onChange={handleHourCandleChange}
        />
        <label htmlFor="hour-candle-input">
          <IconButton
            color="primary"
            aria-label="upload hour candle"
            component="span"
          >
            <UploadFile />
          </IconButton>
        </label>
      </Box>

      <Box sx={{ mt: 4 }}>
      <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Trade Signal</InputLabel>
          <Select value={tradeSignal} onChange={(e) => setTradeSignal(e.target.value)}>
            <MenuItem value="buy">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Buy
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem value="sell">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDownward color="error" fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Sell
                </Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>


        
      <TextField
          id="candle-pattern"
          select
          label="1 Hour Candle Pattern"
          fullWidth
          variant="outlined"
          value={candlePattern}
          onChange={(event) => setCandlePattern(event.target.value)}
          margin="normal"
        >
          {['engulfing', 'small', 'pinbar'].map((pattern) => (
            <MenuItem key={pattern} value={pattern}>
              {pattern.charAt(0).toUpperCase() + pattern.slice(1) + ' Candle'}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="fibonacci-level"
          select
          label="Fibonacci Level"
          fullWidth
          variant="outlined"
          value={fibonacciLevel}
          onChange={(event) => setFibonacciLevel(event.target.value)}
          margin="normal"
        >
          {['38.2%', '50%', '61.8%', '78.6%'].map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>

        {/* Trading Session Selector */}
        <TextField
          id="session"
          select
          label="Trading Session"
          fullWidth
          variant="outlined"
          value={session}
          onChange={(event) => setSession(event.target.value)}
          margin="normal"
        >
          {['london', 'newyork'].map((session) => (
            <MenuItem key={session} value={session}>
              {session.charAt(0).toUpperCase() + session.slice(1)} Session
            </MenuItem>
          ))}
        </TextField>

        {/* 5 Min Order Block */}
        <FormControlLabel
          control={
            <Checkbox
              checked={fiveMinOrderBlock}
              onChange={(e) => setFiveMinOrderBlock(e.target.checked)}
            />
          }
          label="5 Min Order Block"
          sx={{ mb: 2 }}
        />

        {/* Flip 4-Hour Candle */}
        <FormControlLabel
          control={
            <Checkbox
              checked={flipFourHourCandle}
              onChange={(e) => setFlipFourHourCandle(e.target.checked)}
            />
          }
          label="Flip 4-Hour Candle"
          sx={{ mb: 2 }}
        />

        {/* 4-Hour Break of Structure */}
        <FormControlLabel
          control={
            <Checkbox
              checked={fourHourBreakOfStructure}
              onChange={(e) => setFourHourBreakOfStructure(e.target.checked)}
            />
          }
          label="4-Hour Break of Structure"
          sx={{ mb: 2 }}
        />

        {/* 5 Min Break of Structure */}
        <FormControlLabel
          control={
            <Checkbox
              checked={fiveMinBreakOfStructure}
              onChange={(e) => setFiveMinBreakOfStructure(e.target.checked)}
            />
          }
          label="5 Min Break of Structure"
          sx={{ mb: 2 }}
        />

        {/* Change Color UT Alert */}
        <FormControlLabel
          control={
            <Checkbox
              checked={changeColorUTAlert}
              onChange={(e) => setChangeColorUTAlert(e.target.checked)}
            />
          }
          label="Change Color UT Alert"
          sx={{ mb: 2 }}
        />

         {/* Is Active */}
         <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Active"
          sx={{ mb: 2 }}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit MGI Strategy
        </Button>
      </Box>
    </Box>
          {submittedData.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Submitted Data</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>Trade Signal</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>Candle Pattern</TableCell>
                      <TableCell>Fibonacci Level</TableCell>
                      <TableCell>Session</TableCell>
                      <TableCell>Currency Pair</TableCell>
                      <TableCell>5 Min Order Block</TableCell>
                      <TableCell>Flip 4-Hour Candle</TableCell>
                      <TableCell>4-Hour Break of Structure</TableCell>
                      <TableCell>5 Min Break of Structure</TableCell>
                      <TableCell>Change Color UT Alert</TableCell>
                      <TableCell>Signal Candle</TableCell>
                      <TableCell>Hour Candle</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {submittedData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.tradeSignal}</TableCell>
                        <TableCell>{data.isActive ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.candlePattern}</TableCell>
                        <TableCell>{data.fibonacciLevel}</TableCell>
                        <TableCell>{data.session}</TableCell>
                        <TableCell>{data.currencyPair}</TableCell>
                        <TableCell>{data.fiveMinOrderBlock ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.flipFourHourCandle ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.fourHourBreakOfStructure ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.fiveMinBreakOfStructure ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.changeColorUTAlert ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.signalCandleUrl ? <img src={data.signalCandleUrl} alt="Signal Candle" style={{ width: '100px', height: 'auto' }} /> : 'No Image'}</TableCell>
                        <TableCell>{data.hourCandleUrl ? <img src={data.hourCandleUrl} alt="Hour Candle" style={{ width: '100px', height: 'auto' }} /> : 'No Image'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </FormWrapper>
      </Card>
    </MainCard>
  );
};

export default MgiStrategy;
