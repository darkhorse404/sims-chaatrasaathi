import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Person, Class, School, Badge } from '@mui/icons-material';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <ProfileHeader>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
          Student Profile
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          View your personal and academic information
        </Typography>
      </ProfileHeader>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileCard elevation={0}>
            <CardContent>
              <AvatarWrapper>
                <StyledAvatar>
                  {String(currentUser.name).charAt(0)}
                </StyledAvatar>
              </AvatarWrapper>
              <Typography variant="h5" sx={{ textAlign: 'center', color: '#fff', fontWeight: 600, mt: 2 }}>
                {currentUser.name}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', color: '#a0aec0', mt: 1 }}>
                Roll No: {currentUser.rollNum}
              </Typography>
            </CardContent>
          </ProfileCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <ProfileCard elevation={0}>
            <CardContent>
              <SectionTitle>Academic Information</SectionTitle>
              <InfoGrid>
                <InfoItem>
                  <IconBox style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    <Person />
                  </IconBox>
                  <InfoContent>
                    <InfoLabel>Full Name</InfoLabel>
                    <InfoValue>{currentUser.name}</InfoValue>
                  </InfoContent>
                </InfoItem>

                <InfoItem>
                  <IconBox style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <Badge />
                  </IconBox>
                  <InfoContent>
                    <InfoLabel>Roll Number</InfoLabel>
                    <InfoValue>{currentUser.rollNum}</InfoValue>
                  </InfoContent>
                </InfoItem>

                <InfoItem>
                  <IconBox style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <Class />
                  </IconBox>
                  <InfoContent>
                    <InfoLabel>Class</InfoLabel>
                    <InfoValue>{sclassName.sclassName}</InfoValue>
                  </InfoContent>
                </InfoItem>

                <InfoItem>
                  <IconBox style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                    <School />
                  </IconBox>
                  <InfoContent>
                    <InfoLabel>College Name</InfoLabel>
                    <InfoValue>{studentSchool.schoolName}</InfoValue>
                  </InfoContent>
                </InfoItem>
              </InfoGrid>
            </CardContent>
          </ProfileCard>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StudentProfile

const ProfileHeader = styled(Box)`
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

const ProfileCard = styled(Card)`
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

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const StyledAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
  box-shadow: 0 8px 24px rgba(79, 172, 254, 0.3);
  font-size: 3rem !important;
`;

const SectionTitle = styled(Typography)`
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  color: #fff !important;
  margin-bottom: 24px !important;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(79, 172, 254, 0.2);
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(79, 172, 254, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(79, 172, 254, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(79, 172, 254, 0.1);
    border-color: rgba(79, 172, 254, 0.2);
    transform: translateX(8px);
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const InfoLabel = styled(Typography)`
  font-size: 0.85rem !important;
  color: #a0aec0 !important;
  font-weight: 500 !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled(Typography)`
  font-size: 1.1rem !important;
  color: #fff !important;
  font-weight: 600 !important;
`;