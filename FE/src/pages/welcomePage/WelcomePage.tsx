import React from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff8e7 0%, #ffffff 100%)",
        py: 8,
        display: "flex",
        alignItems: "center",
        padding: "0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  mb: 2,
                }}
              >
                Welcome to Resolve It
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "black",
                  mb: 3,
                }}
              >
                Your Road Complaint Management System
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "black",
                  mb: 4,
                }}
              >
                Report road-related issues, track their status, and get
                real-time updates from area administrators. Together, we can
                make our roads safer and better.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#ffc01d",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#e6ad1a",
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#ffc01d",
                    color: "black",
                    "&:hover": {
                      borderColor: "#e6ad1a",
                    },
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                bgcolor: "#fff8e7",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
                Key Features
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "Submit road complaints with images",
                  "Track complaint status in real-time",
                  "Get responses from area administrators",
                  "View complaint history",
                  "Easy-to-use interface",
                ].map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#ffc01d",
                      }}
                    />
                    <Typography variant="body1" sx={{ color: "black" }}>
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WelcomePage;
