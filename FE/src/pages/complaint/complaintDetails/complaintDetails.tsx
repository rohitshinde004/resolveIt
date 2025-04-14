import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import "./complaintDetails.scss";
import Instance from "../../../utils/axios";
import { CommonButton } from "../../../components/common/commonButton/commonButton";

interface ComplaintData {
  _id: string;
  topic: string;
  desc: string;
  image?: {
    type: string;
    data: number[];
  };
  location: string;
  pincode: string;
  status: string;
  date: string;
  userId: string;
  adminId: string;
  chatId: string;
  id: number;
}

export const ComplaintDetails = () => {
  const [searchParams] = useSearchParams();
  const [complaint, setComplaint] = useState<ComplaintData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchComplaintDetails = async () => {
    try {
      const id = searchParams.get("id");
      if (!id) {
        console.error("No complaint ID found in URL");
        return;
      }

      const response = await Instance.get(`complaint/${id}`);
      setComplaint(response.data);
    } catch (error) {
      console.error("Error fetching complaint details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintDetails();
  }, [searchParams]);

  const convertBufferToBase64 = (imageData: {
    type: string;
    data: number[];
  }) => {
    if (!imageData || !imageData.data) return "";

    // Convert Uint8Array to base64
    const binary = imageData.data.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${window.btoa(binary)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#ffc01d";
      case "in progress":
        return "#2196f3";
      case "resolved":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
      >
        <CircularProgress style={{ color: "#ffc01d", minHeight: "100%" }} />
      </Box>
    );
  }

  if (!complaint) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h5">Complaint not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Complaint #{complaint.id}
            </Typography>
            <Chip
              label={complaint.status.toUpperCase()}
              sx={{
                backgroundColor: getStatusColor(complaint.status),
                color: "white",
                fontWeight: "bold",
                mb: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              Topic: {complaint.topic}
            </Typography>
            <Typography variant="body1" paragraph>
              {complaint.desc}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Location Details:
              </Typography>
              <Typography variant="body2">
                Location: {complaint.location}
              </Typography>
              <Typography variant="body2">
                Pincode: {complaint.pincode}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Additional Information:
              </Typography>
              <Typography variant="body2">
                Date: {new Date(complaint.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Time: {new Date(complaint.date).toLocaleTimeString()}
              </Typography>
              <CommonButton onClickCallBack={()=>{} } buttonLabel={"Reply"} className={"replyButton"}/>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {complaint.image && (
              <Box
                component="img"
                src={convertBufferToBase64(complaint.image)}
                alt="Complaint"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
