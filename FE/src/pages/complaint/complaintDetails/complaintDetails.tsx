import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import "./complaintDetails.scss";
import Instance from "../../../utils/axios";
import { CommonButton } from "../../../components/common/commonButton/commonButton";
import FilterAutocomplete from "../../../components/common/textBox/autoComplete";
import TextBox from "../../../components/common/textBox/textfield";
import { Form, Formik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import {
  addComplaintChat,
  getComplaintChats,
} from "../../../constant/apiUrls";

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
  // Constands
  const userInfo: any = JSON.parse(localStorage.getItem("user") || "{}");
  const statusOptions = ["Pending", "In Progress", "Resolved"];
  const initialValues = {
    comment: "",
  };
  const validationSchema = Yup.object({
    comment: Yup.string().required("Message is required"),
  });
  // UseStates
  const [searchParams] = useSearchParams();
  const [complaint, setComplaint] = useState<ComplaintData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>(userInfo.role);
  const [showTextBox, setShowTextBox] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: string; content: string; timestamp: string }[]
  >([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchComplaintDetails = async () => {
    try {
      const id = searchParams.get("id");
      if (!id) {
        console.error("No complaint ID found in URL");
        return;
      }

      const response = await Instance.get(`complaint/${id}`);

      switch (response.data.status) {
        case "pending":
          response.data.status = "Pending";
          break;
        case "inprogress":
          response.data.status = "In Progress";
          break;
        case "completed":
          response.data.status = "Resolved";
          break;
      }
      setComplaint(response.data);
      console.log("Fetched complaint details:", response.data);
      fetchChats(response.data.chatId);
    } catch (error) {
      console.error("Error fetching complaint details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChats = async (chatId: string) => {
    try {
      const response = await Instance.get(`${getComplaintChats}/${chatId}`);
      console.log("Fetched chat messages:", response.data);
      setChatMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const addChatMessage = async (message: string) => {
    try {
      const response = await Instance.post(
        `${addComplaintChat}/${complaint?.chatId}`,
        {
          senderId: userInfo._id,
          content: message,
        }
      );
      fetchChats(complaint?.chatId || "");
      console.log("Added chat message:", response.data);
    } catch (error) {
      console.error("Error adding chat message:", error);
    }
  };
  const handleStatusChange = async (newStatus: any) => {
    console.log("New status:", newStatus);
    let status = "";
    switch (newStatus) {
      case "Pending":
        status = "pending";
        break;
      case "In Progress":
        status = "inprogress";
        break;
      case "Resolved":
        status = "completed";
        break;
    }

    if (!complaint) return; // Ensure complaint is not null
    try {
      await Instance.patch(`complaint/${complaint?.id}/status`, {
        status: status,
      });
      setComplaint((prev) => (prev ? { ...prev, status: newStatus } : null));
      setSnackbar({
        open: true,
        message: "Status updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating complaint status:", error);
      setSnackbar({
        open: true,
        message: "Failed to update status.",
        severity: "error",
      });
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
    <>
      <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Complaint #{complaint.id}
              </Typography>
              {userRole === "ADMIN" ? (
                <FilterAutocomplete
                  label={"Status"}
                  option={statusOptions}
                  className="statusDropDown"
                  value={complaint.status} // Pass the current status as value
                  onChange={(event: any, newValue: string) => {
                    console.log("Selected status:", newValue);
                    complaint.status = newValue; // Update the status in the complaint object
                    console.log("Updated complaint:", complaint);
                    handleStatusChange(newValue); // Pass the new value to the handler
                  }}
                  sx={{
                    backgroundColor: getStatusColor(complaint.status),
                    color: "white",
                    "& .MuiSelect-icon": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    width: "50%",
                    mb: 2,
                  }}
                />
              ) : (
                <Chip
                  label={complaint.status.toUpperCase()}
                  sx={{
                    backgroundColor: getStatusColor(complaint.status),
                    color: "white",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                />
              )}
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
                <CommonButton
                  onClickCallBack={() => {
                    setShowTextBox(!showTextBox);
                  }}
                  buttonLabel={"Reply"}
                  className={"replyButton"}
                />
              </Box>
              {showTextBox && (
                <>
                  <Formik
                    onSubmit={async (values, { resetForm }) => {
                      console.log("Comment submitted:", values.comment);
                      resetForm();
                      await addChatMessage(values.comment);
                    }}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                  >
                    {(formik) => (
                      <Form>
                        <TextBox
                          formikRef={formik}
                          name="comment"
                          className="commentTextBox"
                          value={formik.values.comment}
                          placeholder="Write your message..."
                          onChangeCallBack={(value: string) => {
                            formik.setFieldValue("comment", value);
                          }}
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={() => {
                                  formik.handleSubmit();
                                  // formik.resetForm(); // Reset the form after submission
                                }}
                              >
                                <SendIcon className="chatIconColor" />
                              </IconButton>
                            ),
                          }}
                        />
                      </Form>
                    )}
                  </Formik>
                  <Box sx={{ mt: 2 }}>
                    {chatMessages.map((message, index) => (
                      <Paper
                        key={index}
                        sx={{
                          padding: "10px 10px",
                          mb: 1,
                          borderRadius: 4,
                          boxShadow:
                            "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
                          backgroundColor:
                            message.sender === userInfo._id
                              ? "#e3f2fd"
                              : "#f1f8e9",
                          alignSelf:
                            message.sender === userInfo._id
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {message.sender === userInfo._id
                            ? "You"
                            : userInfo.role === "ADMIN"
                            ? "Citizen"
                            : "Admin"}
                        </Typography>
                        <Typography variant="body1">
                          {message.content}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                          {new Date(message.timestamp).toLocaleDateString(
                            "en-US"
                          )}{" "}
                          {new Date(message.timestamp).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </>
              )}
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
