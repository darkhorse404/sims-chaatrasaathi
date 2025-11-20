import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../redux/userRelated/userHandle";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { updateStudentFields } from "../../../redux/studentRelated/studentHandle";
import { underStudentControl } from "../../../redux/studentRelated/studentSlice";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  FormControl,
  Paper,
  Avatar,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import {
  Person,
  School,
  CalendarToday,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import styled from "styled-components";
import Popup from "../../../components/Popup";

const StudentAttendance = ({ situation }) => {
  const dispatch = useDispatch();
  const { currentUser, userDetails, loading } = useSelector(
    (state) => state.user
  );
  const { subjectsList } = useSelector((state) => state.sclass);
  const { response, error, statestatus } = useSelector(
    (state) => state.student
  );
  const params = useParams();

  const [studentID, setStudentID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [chosenSubName, setChosenSubName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === "Student") {
      setStudentID(params.id);
      const stdID = params.id;
      dispatch(getUserDetails(stdID, "Student"));
    } else if (situation === "Subject") {
      const { studentID, subjectID } = params;
      setStudentID(studentID);
      dispatch(getUserDetails(studentID, "Student"));
      setChosenSubName(subjectID);
    }
  }, [situation, dispatch, params]);

  useEffect(() => {
    if (userDetails && userDetails.sclassName && situation === "Student") {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails, situation]);

  const changeHandler = (event) => {
    const selectedSubject = subjectsList.find(
      (subject) => subject.subName === event.target.value
    );
    if (selectedSubject) {
      setSubjectName(selectedSubject.subName);
      setChosenSubName(selectedSubject._id);
    }
  };

  const fields = { subName: chosenSubName, status, date };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
  };

  useEffect(() => {
    if (response) {
      setLoader(false);
      setShowPopup(true);
      setMessage(response);
      dispatch(underStudentControl()); // Reset state
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Error marking attendance. Please try again.");
      dispatch(underStudentControl()); // Reset state
    } else if (statestatus === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Attendance marked successfully!");
      // Reset form
      setStatus("");
      setDate("");
      if (situation === "Student") {
        setSubjectName("");
        setChosenSubName("");
      }
      // Reset state after a short delay
      setTimeout(() => {
        dispatch(underStudentControl());
      }, 1000);
    }
  }, [response, statestatus, error, situation, dispatch]);

  // Get student initials for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size={60} sx={{ color: "#667eea" }} />
          <Typography variant="h6" sx={{ color: "#a0aec0", mt: 2 }}>
            Loading student details...
          </Typography>
        </LoadingContainer>
      ) : (
        <>
          {!userDetails || !userDetails.name ? (
            <ErrorContainer>
              <Alert severity="error" sx={{ mb: 2 }}>
                Student details could not be loaded. Please try again.
              </Alert>
            </ErrorContainer>
          ) : (
            <PageContainer>
              <ContentWrapper>
                <HeaderCard elevation={0}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <StyledAvatar>
                      {getInitials(userDetails?.name)}
                    </StyledAvatar>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}
                      >
                        {userDetails?.name || "Student Name"}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <InfoChip
                          icon={<School sx={{ fontSize: "1rem" }} />}
                          label={`Class: ${
                            userDetails?.sclassName?.sclassName || "N/A"
                          }`}
                        />
                        <InfoChip
                          icon={<Person sx={{ fontSize: "1rem" }} />}
                          label={`Roll: ${userDetails?.rollNum || "N/A"}`}
                        />
                        {currentUser?.teachSubject && (
                          <InfoChip
                            icon={<School sx={{ fontSize: "1rem" }} />}
                            label={currentUser.teachSubject.subName}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </HeaderCard>

                <FormCard elevation={0}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "#fff", mb: 3 }}
                  >
                    Mark Attendance
                  </Typography>
                  <Divider
                    sx={{ borderColor: "rgba(102, 126, 234, 0.1)", mb: 3 }}
                  />

                  <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                      {situation === "Student" && (
                        <StyledFormControl fullWidth>
                          <InputLabel>Select Subject</InputLabel>
                          <Select
                            value={subjectName}
                            label="Select Subject"
                            onChange={changeHandler}
                            required
                            startAdornment={
                              <School
                                sx={{ mr: 1, ml: 1, color: "#667eea" }}
                              />
                            }
                          >
                            {subjectsList && subjectsList.length > 0 ? (
                              subjectsList.map((subject, index) => (
                                <MenuItem key={index} value={subject.subName}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <School sx={{ fontSize: "1.2rem" }} />
                                    {subject.subName}
                                    <Chip
                                      label={subject.subCode}
                                      size="small"
                                      sx={{
                                        ml: "auto",
                                        height: "20px",
                                        fontSize: "0.75rem",
                                      }}
                                    />
                                  </Box>
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>
                                No subjects available
                              </MenuItem>
                            )}
                          </Select>
                        </StyledFormControl>
                      )}

                      <StyledFormControl fullWidth>
                        <InputLabel>Attendance Status</InputLabel>
                        <Select
                          value={status}
                          label="Attendance Status"
                          onChange={(event) => setStatus(event.target.value)}
                          required
                        >
                          <MenuItem value="Present">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <CheckCircle
                                sx={{ color: "#43e97b", fontSize: "1.2rem" }}
                              />
                              Present
                            </Box>
                          </MenuItem>
                          <MenuItem value="Absent">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Cancel
                                sx={{ color: "#f5576c", fontSize: "1.2rem" }}
                              />
                              Absent
                            </Box>
                          </MenuItem>
                        </Select>
                      </StyledFormControl>

                      <StyledFormControl fullWidth>
                        <StyledTextField
                          label="Select Date"
                          type="date"
                          value={date}
                          onChange={(event) => setDate(event.target.value)}
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            startAdornment: (
                              <CalendarToday
                                sx={{ mr: 1, color: "#667eea" }}
                              />
                            ),
                          }}
                        />
                      </StyledFormControl>

                      {status && (
                        <AttendancePreview
                          style={{
                            background:
                              status === "Present"
                                ? "rgba(67, 233, 123, 0.1)"
                                : "rgba(245, 87, 108, 0.1)",
                            borderColor:
                              status === "Present"
                                ? "rgba(67, 233, 123, 0.3)"
                                : "rgba(245, 87, 108, 0.3)",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "#a0aec0", mb: 1 }}
                          >
                            Preview
                          </Typography>
                          <Box
                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                          >
                            {status === "Present" ? (
                              <CheckCircle sx={{ color: "#43e97b" }} />
                            ) : (
                              <Cancel sx={{ color: "#f5576c" }} />
                            )}
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#fff",
                                fontWeight: 600,
                              }}
                            >
                              Marking as{" "}
                              <span
                                style={{
                                  color:
                                    status === "Present"
                                      ? "#43e97b"
                                      : "#f5576c",
                                }}
                              >
                                {status}
                              </span>{" "}
                              for {date}
                            </Typography>
                          </Box>
                        </AttendancePreview>
                      )}
                    </Stack>

                    <SubmitButton
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                      disabled={loader}
                    >
                      {loader ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <>
                          <CheckCircle sx={{ mr: 1 }} />
                          Submit Attendance
                        </>
                      )}
                    </SubmitButton>
                  </form>
                </FormCard>
              </ContentWrapper>
            </PageContainer>
          )}
          <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </>
      )}
    </>
  );
};

export default StudentAttendance;

// Styled Components
const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ContentWrapper = styled(Box)`
  width: 100%;
  max-width: 700px;
`;

const HeaderCard = styled(Paper)`
  padding: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 16px !important;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3) !important;
  animation: slideInDown 0.6s ease-out;

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 80px !important;
  height: 80px !important;
  font-size: 2rem !important;
  font-weight: 700 !important;
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const InfoChip = styled(Chip)`
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  font-weight: 500 !important;

  .MuiChip-icon {
    color: white !important;
  }
`;

const FormCard = styled(Paper)`
  padding: 32px;
  background: #1a1a2e !important;
  border-radius: 16px !important;
  border: 1px solid rgba(102, 126, 234, 0.1);
  animation: slideInUp 0.6s ease-out 0.2s;
  animation-fill-mode: both;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  .MuiInputLabel-root {
    color: #a0aec0;

    &.Mui-focused {
      color: #667eea;
    }
  }

  .MuiOutlinedInput-root {
    background: rgba(102, 126, 234, 0.05);
    border-radius: 8px;
    color: #fff;

    & fieldset {
      border-color: rgba(102, 126, 234, 0.2);
    }

    &:hover fieldset {
      border-color: rgba(102, 126, 234, 0.4);
    }

    &.Mui-focused fieldset {
      border-color: #667eea;
    }
  }

  .MuiSelect-icon {
    color: #a0aec0;
  }
`;

const StyledTextField = styled(TextField)`
  .MuiInputLabel-root {
    color: #a0aec0;

    &.Mui-focused {
      color: #667eea;
    }
  }

  .MuiOutlinedInput-root {
    background: rgba(102, 126, 234, 0.05);
    border-radius: 8px;
    color: #fff;

    & fieldset {
      border-color: rgba(102, 126, 234, 0.2);
    }

    &:hover fieldset {
      border-color: rgba(102, 126, 234, 0.4);
    }

    &.Mui-focused fieldset {
      border-color: #667eea;
    }
  }
`;

const AttendancePreview = styled(Box)`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid;
  transition: all 0.3s ease;
`;

const SubmitButton = styled.button`
  margin-top: 24px !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  text-transform: none !important;
  border-radius: 8px !important;
  padding: 14px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5) !important;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
`;