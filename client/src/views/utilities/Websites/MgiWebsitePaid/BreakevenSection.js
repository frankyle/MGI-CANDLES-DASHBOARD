import React from "react";
import { Grid, Typography } from "@mui/material";
import "./signalsSection.css";
import image1 from "./../../../../assets/images/websites/hero/EURNZD_Output.JPG";

const signalsData = [
  {
    title: "EUR/USD Signal",
    position: "Short Position",
    entry: "Entry: 1.1825 | TP: 1.1750",
    views: "5.8K views • 3 days ago",
    image: image1,
  },
  {
    title: "GBP/USD Signal",
    position: "Long Position",
    entry: "Entry: 1.3920 | TP: 1.4000",
    views: "7.4K views • 2 days ago",
    image: image1,
  },
  {
    title: "USD/JPY Signal",
    position: "Short Position",
    entry: "Entry: 110.75 | TP: 110.00",
    views: "6.2K views • 1 day ago",
    image: image1,
  },
  {
    title: "AUD/USD Signal",
    position: "Long Position",
    entry: "Entry: 0.7250 | TP: 0.7300",
    views: "8.1K views • 5 hours ago",
    image: image1,
  },
  {
    title: "EUR/GBP Signal",
    position: "Short Position",
    entry: "Entry: 0.8580 | TP: 0.8500",
    views: "4.9K views • 1 day ago",
    image: image1,
  },
  {
    title: "USD/CAD Signal",
    position: "Long Position",
    entry: "Entry: 1.2580 | TP: 1.2650",
    views: "3.7K views • 4 hours ago",
    image: image1,
  },
  {
    title: "NZD/USD Signal",
    position: "Short Position",
    entry: "Entry: 0.6800 | TP: 0.6750",
    views: "4.0K views • 2 days ago",
    image: image1,
  },
  {
    title: "EUR/JPY Signal",
    position: "Long Position",
    entry: "Entry: 129.80 | TP: 130.50",
    views: "3.5K views • 1 day ago",
    image: image1,
  },
];

const BreakevenSection = () => {
  return (
    <div className="signals-section">
      <Typography variant="h2" component="h1" align="center" gutterBottom className="section-title">
        Breakeven Trades
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {signalsData.map((signal, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className="signal-card">
              <img src={signal.image} alt={signal.title} className="signal-image" />
              <div className="signal-info">
                <Typography variant="h6" className="signal-title">{signal.title}</Typography>
                <Typography>{signal.position}</Typography>
                <Typography>{signal.entry}</Typography>
                <Typography variant="body2" color="textSecondary">{signal.views}</Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BreakevenSection;
