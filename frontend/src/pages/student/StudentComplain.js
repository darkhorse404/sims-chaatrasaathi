import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Container, Paper, Button } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Send } from '@mui/icons-material';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <HeaderBox>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                    Submit a Complaint
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Share your concerns or report issues to the administration
                </Typography>
            </HeaderBox>

            <StyledPaper elevation={0}>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <StyledTextField
                            fullWidth
                            label="Select Date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)} 
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    background: 'rgba(79, 172, 254, 0.05)',
                                    '& fieldset': {
                                        borderColor: 'rgba(79, 172, 254, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(79, 172, 254, 0.3)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4facfe',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#a0aec0',
                                    '&.Mui-focused': {
                                        color: '#4facfe',
                                    },
                                },
                            }}
                        />
                        <StyledTextField
                            fullWidth
                            label="Write your complaint"
                            variant="outlined"
                            value={complaint}
                            onChange={(event) => {
                                setComplaint(event.target.value);
                            }}
                            required
                            multiline
                            rows={6}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    background: 'rgba(79, 172, 254, 0.05)',
                                    '& fieldset': {
                                        borderColor: 'rgba(79, 172, 254, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(79, 172, 254, 0.3)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4facfe',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#a0aec0',
                                    '&.Mui-focused': {
                                        color: '#4facfe',
                                    },
                                },
                            }}
                        />
                        <SubmitButton
                            fullWidth
                            size="large"
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Complaint"}
                        </SubmitButton>
                    </Stack>
                </form>
            </StyledPaper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default StudentComplain;

const HeaderBox = styled(Box)`
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    padding: 32px;
    border-radius: 16px;
    margin-bottom: 32px;
    box-shadow: 0 8px 32px rgba(79, 172, 254, 0.3);
    animation: fadeInDown 0.6s ease-out;

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const StyledPaper = styled(Paper)`
    padding: 32px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;

    &:hover {
        box-shadow: 0 8px 32px rgba(79, 172, 254, 0.2);
        border-color: rgba(79, 172, 254, 0.2);
    }

    @keyframes fadeInUp {
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

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        border-radius: 12px;
    }
`;

const SubmitButton = styled(Button)`
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
    color: white !important;
    padding: 12px 32px !important;
    border-radius: 12px !important;
    font-weight: 600 !important;
    text-transform: none !important;
    font-size: 1rem !important;
    box-shadow: 0 4px 16px rgba(79, 172, 254, 0.3) !important;
    transition: all 0.3s ease !important;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(79, 172, 254, 0.4) !important;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;