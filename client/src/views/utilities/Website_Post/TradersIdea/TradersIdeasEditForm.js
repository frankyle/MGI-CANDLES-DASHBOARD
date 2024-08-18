import React, { useState, useEffect } from 'react';
import useAxios from '../../../../routes/useAxios';
import { 
  Box, Typography, IconButton, Button, FormControl, 
  InputLabel, Select, MenuItem, TextField, Checkbox, 
  FormControlLabel, Modal, Paper, Grid 
} from '@mui/material';
import UploadFile from '@mui/icons-material/UploadFile';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const TradersIdeasEditForm = ({ open, onClose, candleToEdit, fetchCandles }) => {
  const api = useAxios();
  const [candle, setCandle] = useState({
    signal_candle: null,
    hour_candle: null,
    trade_signal: '',
    is_active: false,
    candle_pattern: '',
    fibonacci_level: '',
    five_min_order_block: false,
    flip_four_hour_candle: false,
    four_hour_break_of_structure: false,
    five_min_break_of_structure: false,
    currency_pair: '',
    session: '',
    change_color_ut_alert: false,
  });
  const [signalCandleUrl, setSignalCandleUrl] = useState(null);
  const [hourCandleUrl, setHourCandleUrl] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (candleToEdit) {
      setCandle(candleToEdit);
      setSignalCandleUrl(candleToEdit.signal_candle);
      setHourCandleUrl(candleToEdit.hour_candle);
    }
  }, [candleToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCandle({
      ...candle,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCandle({
      ...candle,
      [name]: files[0],
    });
    if (name === 'signal_candle') {
      setSignalCandleUrl(URL.createObjectURL(files[0]));
    } else if (name === 'hour_candle') {
      setHourCandleUrl(URL.createObjectURL(files[0]));
    }
  };

  const validateForm = () => {
    if (!candle.trade_signal || !candle.currency_pair) {
      setMessage('Trade Signal and Currency Pair are required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    Object.keys(candle).forEach(key => {
      formData.append(key, candle[key]);
    });

    try {
      const response = await api.put(`/mgi/mgicandles/${candle.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Response:', response);
      setMessage('MGI Strategy updated successfully!');
      fetchCandles();
      onClose();
    } catch (error) {
      console.error('Error saving MGI Strategy:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setMessage(`Error saving MGI Strategy: ${JSON.stringify(error.response.data)}`);
      } else {
        setMessage('Error saving MGI Strategy.');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ width: '80%', margin: '50px auto', padding: 2, backgroundColor: 'white', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Edit MGI Strategy</Typography>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
        {message && <Typography color={message.includes('successfully') ? 'primary' : 'error'}>{message}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Currency Pair</InputLabel>
                <Select name="currency_pair" value={candle.currency_pair} onChange={handleChange}>
                  <MenuItem value="AUDUSD">AUDUSD</MenuItem>
                  <MenuItem value="AUDJPY">AUDJPY</MenuItem>
                  <MenuItem value="AUDCAD">AUDCAD</MenuItem>
                  <MenuItem value="CADJPY">CADJPY</MenuItem>
                  <MenuItem value="GBPUSD">GBPUSD</MenuItem>
                  <MenuItem value="GBPCAD">GBPCAD</MenuItem>
                  <MenuItem value="GBPCHF">GBPCHF</MenuItem>
                  <MenuItem value="GBPJPY">GBPJPY</MenuItem>
                  <MenuItem value="EURUSD">EURUSD</MenuItem>
                  <MenuItem value="EURJPY">EURJPY</MenuItem>
                  <MenuItem value="EURCAD">EURCAD</MenuItem>
                  <MenuItem value="USDCAD">USDCAD</MenuItem>
                  <MenuItem value="USDCHF">USDCHF</MenuItem>
                  <MenuItem value="NZDUSD">NZDUSD</MenuItem>
                  <MenuItem value="NZDCAD">NZDCAD</MenuItem>
                  <MenuItem value="XAUUSD">XAUUSD</MenuItem>
                  <MenuItem value="USOIL">USOIL</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Trade Signal</InputLabel>
                <Select name="trade_signal" value={candle.trade_signal} onChange={handleChange}>
                  <MenuItem value="buy">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ArrowUpward color="primary" fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>Buy</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="sell">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ArrowDownward color="error" fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>Sell</Typography>
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
                name="candle_pattern"
                value={candle.candle_pattern}
                onChange={handleChange}
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
                name="fibonacci_level"
                value={candle.fibonacci_level}
                onChange={handleChange}
                margin="normal"
              >
                {['38.2%', '50%', '61.8%', '78.6%'].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="session"
                select
                label="Trading Session"
                fullWidth
                variant="outlined"
                name="session"
                value={candle.session}
                onChange={handleChange}
                margin="normal"
              >
                {['london', 'newyork'].map((session) => (
                  <MenuItem key={session} value={session}>
                    {session.charAt(0).toUpperCase() + session.slice(1)} Session
                  </MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                control={
                  <Checkbox
                    name="five_min_order_block"
                    checked={candle.five_min_order_block}
                    onChange={handleChange}
                  />
                }
                label="5 Min Order Block"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="flip_four_hour_candle"
                    checked={candle.flip_four_hour_candle}
                    onChange={handleChange}
                  />
                }
                label="Flip 4 Hour Candle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="four_hour_break_of_structure"
                    checked={candle.four_hour_break_of_structure}
                    onChange={handleChange}
                  />
                }
                label="4 Hour Break of Structure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="five_min_break_of_structure"
                    checked={candle.five_min_break_of_structure}
                    onChange={handleChange}
                  />
                }
                label="5 Min Break of Structure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="change_color_ut_alert"
                    checked={candle.change_color_ut_alert}
                    onChange={handleChange}
                  />
                }
                label="Change Color UT Alert"
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="signal-candle-file"
                  type="file"
                  name="signal_candle"
                  onChange={handleFileChange}
                />
                <label htmlFor="signal-candle-file">
                  <IconButton color="primary" aria-label="upload signal candle image" component="span">
                    <UploadFile />
                  </IconButton>
                </label>
                {signalCandleUrl && <img src={signalCandleUrl} alt="Signal Candle" style={{ width: '50%', height: 'auto', marginLeft: '8px' }} />}
              </Box>
              <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="hour-candle-file"
                  type="file"
                  name="hour_candle"
                  onChange={handleFileChange}
                />
                <label htmlFor="hour-candle-file">
                  <IconButton color="primary" aria-label="upload hour candle image" component="span">
                    <UploadFile />
                  </IconButton>
                </label>
                {hourCandleUrl && <img src={hourCandleUrl} alt="Hour Candle" style={{ width: '50%', height: 'auto', marginLeft: '8px' }} />}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default TradersIdeasEditForm;
