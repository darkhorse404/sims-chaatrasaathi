import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Send } from '@mui/icons-material';

const TeacherComplain = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle complaint submission logic here
    console.log('Complaint submitted:', complaint);
    setComplaint('');
  };

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
        <form onSubmit={handleSubmit}>
          <FormContent>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
              Complaint Details
            </Typography>
            
            <StyledTextField
              fullWidth
              multiline
              rows={8}
              variant="outlined"
              label="Describe your complaint"
              placeholder="Please provide detailed information about your complaint..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(240, 147, 251, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(240, 147, 251, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f093fb',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#a0aec0',
                  '&.Mui-focused': {
                    color: '#f093fb',
                  },
                },
              }}
            />

            <SubmitButton
              type="submit"
              variant="contained"
              endIcon={<Send />}
              disabled={!complaint.trim()}
            >
              Submit Complaint
            </SubmitButton>
          </FormContent>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default TeacherComplain;

const HeaderBox = styled(Box)`
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    padding: 32px;
    border-radius: 16px;
    margin-bottom: 32px;
    box-shadow: 0 8px 32px rgba(240, 147, 251, 0.3);
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
    border: 1px solid rgba(240, 147, 251, 0.1);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;

    &:hover {
        box-shadow: 0 8px 32px rgba(240, 147, 251, 0.2);
        border-color: rgba(240, 147, 251, 0.2);
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

const FormContent = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        background: rgba(240, 147, 251, 0.05);
        border-radius: 12px;
    }
`;

const SubmitButton = styled(Button)`
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
    color: white !important;
    padding: 12px 32px !important;
    border-radius: 12px !important;
    font-weight: 600 !important;
    text-transform: none !important;
    font-size: 1rem !important;
    box-shadow: 0 4px 16px rgba(240, 147, 251, 0.3) !important;
    transition: all 0.3s ease !important;
    align-self: flex-start;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(240, 147, 251, 0.4) !important;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;