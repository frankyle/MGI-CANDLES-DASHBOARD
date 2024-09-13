import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import useAxios from '../../../../routes/useAxios'; // Your custom Axios hook
import "./signalsSection.css";

const SetupsSection = () => {
  const [signalsData, setSignalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const api = useAxios(); // Initialize the custom Axios instance

  // Fetch data from the database using Axios
  useEffect(() => {
    const fetchSignalsData = async () => {
      try {
        const response = await api.get('/mgi/mgicandles/'); // Fetch data from your custom endpoint
        setSignalsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching signals data:", error);
        setError("Error fetching signals data");
        setLoading(false);
      }
    };

    fetchSignalsData();
  }, [api]);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center">{error}</Typography>;
  }

  return (
    <div className="signals-section">
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        className="section-title"
      >
        Weekly Setups
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {signalsData.map((signal, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className="signal-card">
              <img src={signal.image} alt={signal.title} className="signal-image" />
              <div className="signal-info">
                <Typography variant="h6" className="signal-title">
                  {signal.title}
                </Typography>
                <Typography>{signal.position}</Typography>
                <Typography>{signal.entry}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {signal.views}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SetupsSection;
