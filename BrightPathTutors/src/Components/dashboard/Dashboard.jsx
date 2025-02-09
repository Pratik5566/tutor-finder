import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext.jsx";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import "./Dashboard.css";
import Payment from "../Payment/Payment.jsx";
import axios from "axios";
import { ClassNames } from "@emotion/react";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const { authUser, isTutor, isUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("sent");
  useEffect(() => {
    if (isUser) {
      fetchStudentRequests();
    } else if (isTutor) {
      fetchTutorRequests();
    }
  }, [isUser, isTutor]);

  const fetchStudentRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/student-requests/student/${authUser._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student requests");
      }
      const data = await response.json();
      setRequests(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching student requests:", error);
    }
  };

  const fetchTutorRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/student-requests/tutor/${authUser._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tutor requests");
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching tutor requests:", error);
    }
  };
  const formatTimeAgo = (timestamp) => {
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(timestamp);
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };
  const handleWithdraw = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/student-requests/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to withdraw request");
      }
      // Reload requests
      if (isUser) {
        fetchStudentRequests();
      } else if (isTutor) {
        fetchTutorRequests();
      }
    } catch (error) {
      console.error("Error withdrawing request:", error);
    }
  };

  const handleIgnore = async (requestId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/student-requests/reject/${requestId}`);
      if (response.status !== 200) {
        throw new Error("Failed to ignore request");
      }
      // Reload requests
      if (isUser) {
        fetchStudentRequests();
      } else if (isTutor) {
        fetchTutorRequests();
      }
    } catch (error) {
      console.error("Error ignoring request:", error);
    }
  };

  return (
    <div className="Dashboard-background">
            <Typography variant="h4" sx={{ marginLeft: "3%", marginTop: "1%" }}>
              Requests
            </Typography>
      {isUser && (
        <>
          
            <div className="dashboard-button-group">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue);
                }}
                TabIndicatorProps={{ style: { backgroundColor: "#B9B4C7" } }}
              >
                <Tab
                  label="Sent Request"
                  onClick={() => setActiveTab("sent")}
                />
                <Tab
                  label="Accepted Requests"
                  onClick={() => setActiveTab("accepted")}
                />
              </Tabs>
            </div>
            {activeTab === 'sent' && (
              <>
            <ul>
              {requests
                .filter((request) => request.status === "pending")
                .map((request) => (
                  <Card
                    key={request._id}
                    variant="outlined"
                    sx={{
                      marginBottom: "1%",
                      marginRight: "1.5%",
                      backgroundColor: "#d3d3d3",
                      transition: "ease 0.3s",
                      ":hover": { border: "1px solid #2b2e33" },
                    }}
                  >
                    <CardContent>
                      <div className="Dashboard-Student">
                        {console.log(request)}
                        <Avatar
                          alt={request.tutorName}
                          src="{request.Avatar}"
                          sx={{ width: 45, height: 45 }}
                        ></Avatar>
                        <div style={{ marginLeft: "1%" }}>
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: 500,
                              color: "#1d1d1f",
                            }}
                          >
                            {request.tutorName}
                          </Typography>
                          <Typography sx={{ fontSize: 14, color: "#787c7f" }}>
                            Sent {formatTimeAgo(request.created_at)}
                          </Typography>
                        </div>
                        <Button
                          onClick={() => handleWithdraw(request._id)}
                          variant="outlined"
                          sx={{
                            position: "absolute",
                            right: "5%",
                            color: "#1d1d1f",
                            marginTop: "1.2vh",
                            border: "1px solid black",
                            cursor: "pointer", // Add cursor pointer style
                          }}
                        >
                          Withdraw
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </ul>
          </>
          )}
          {activeTab === 'accepted' && (
          <>
            <ul>
              {requests
                .filter((request) => request.status === "accepted")
                .map((request) => (
                  <Card
                    key={request._id}
                    variant="outlined"
                    sx={{
                      marginBottom: "1%",
                      marginRight: "1.5%",
                      backgroundColor: "#d3d3d3",
                      transition: "ease 0.3s",
                      ":hover": { border: "1px solid #2b2e33" },
                    }}
                  >
                    <CardContent>
                      <div className="Dashboard-Student">
                        {console.log(request)}
                        <Avatar
                          alt={request.tutorName}
                          src="{request.Avatar}"
                          sx={{ width: 45, height: 45 }}
                        ></Avatar>
                        <div style={{ marginLeft: "1%" }}>
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: 500,
                              color: "#1d1d1f",
                            }}
                          >
                            {request.tutorName}
                          </Typography>
                          <Typography sx={{ fontSize: 14, color: "#787c7f" }}>
                            Sent {formatTimeAgo(request.created_at)}
                          </Typography>
                        </div>
                        <Button
                          variant="outlined"
                          sx={{
                            position: "absolute",
                            alignContent: "center",
                            marginTop: ".8%",
                            borderRadius: 20,
                            right: "13%",
                            ":hover": {
                              border: "1px solid #10239b",
                              color: "#10239b",
                            },
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            position: "absolute",
                            marginTop: ".8%",
                            right: "5%",
                            borderRadius: 20,
                          }}
                          disabled
                        >
                          Accepted
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </ul>
          </>
          )}
        </>
      )}
      {isTutor && (
        <div className="Dashboard-background">
          <Typography variant="h5" sx={{ marginLeft: "3%", marginTop: "1%" }}>
            Recieved Requests:
          </Typography>
          <ul>
            {requests.map((request) => (
              <Card
                key={request._id}
                variant="outlined"
                sx={{
                  marginBottom: "1%",
                  marginRight: "1.5%",
                  backgroundColor: "#d3d3d3",
                  transition: "ease 0.3s",
                  ":hover": { border: "1px solid #2b2e33" },
                }}
              >
                <CardContent>
                  <div className="Dashboard-Student">
                    <Avatar
                      alt={request.studentName}
                      src="{request.Avatar}"
                      sx={{ width: 45, height: 45 }}
                    ></Avatar>
                    <div style={{ marginLeft: "1%" }}>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 500,
                          color: "#1d1d1f",
                        }}
                      >
                        {request.studentName}
                      </Typography>
                      <Typography sx={{ fontSize: 14, color: "#787c7f" }}>
                        Sent {formatTimeAgo(request.created_at)}
                      </Typography>
                    </div>
                    {request.status === "accepted" && <>
                        <Button
                          variant="outlined"
                          sx={{
                            position: "absolute",
                            marginTop: ".8%",
                            right: "5%",
                            borderRadius: 20,
                          }}
                          disabled
                        >
                          Accepted
                        </Button>
                      </>
                    }
                    {request.status === "pending" && <>
                        <Button
                          variant="outlined"
                          sx={{
                            position: "absolute",
                            alignContent: "center",
                            marginTop: ".8%",
                            right: "12%",
                            color: "#1d1d1f",
                            border: "1px solid rgb(41, 40, 40)",
                            ":hover": {
                              border: "1px solid grey",
                            },
                          }}
                          onClick={() => handleIgnore(request._id)}
                        >
                          Ignore
                        </Button>
                        <Payment
                          amount={500} // Example amount
                          currency="INR"
                          receiptId={request._id} // Example receipt ID
                          studentID={request.student}
                          tutorID={request.tutor}
                        />
                      </>
                      }
                      {request.status === "rejected" && <><Button
                          variant="outlined"
                          sx={{
                            position: "absolute",
                            marginTop: ".8%",
                            right: "5%",
                            borderRadius: 20,
                          }}
                          disabled
                        >
                          Ignored
                        </Button>
                      </>
                      }
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
