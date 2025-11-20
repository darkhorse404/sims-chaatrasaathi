import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button, Typography, Chip } from "@mui/material";
import styled from "styled-components";
import studentImage from "../assets/students.png";
import { School, People, Assessment, Security, TrendingUp, EmojiEvents } from "@mui/icons-material";

const Homepage = () => {
  const features = [
    { icon: <School />, title: "Smart Management", desc: "Effortless administration" },
    { icon: <People />, title: "Unified Platform", desc: "One place for everyone" },
    { icon: <Assessment />, title: "Real-time Analytics", desc: "Track progress instantly" },
    { icon: <Security />, title: "Secure & Reliable", desc: "Your data protected" },
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <HeroContent>
                <BrandChip label="🎓 Education Reimagined" />
                <HeroTitle>
                  ChaatraSaathi
                  <GradientText> College Management</GradientText>
                </HeroTitle>
                <HeroSubtitle>
                  Transform your educational institution with India's most intuitive college management system. 
                  Empowering admins, teachers, and students with seamless collaboration.
                </HeroSubtitle>
                
                <ButtonGroup>
                  <StyledLink to="/choose">
                    <PrimaryButton variant="contained" size="large">
                      Get Started
                    </PrimaryButton>
                  </StyledLink>
                  <StyledLink to="/Adminregister">
                    <SecondaryButton variant="outlined" size="large">
                      Admin Signup
                    </SecondaryButton>
                  </StyledLink>
                </ButtonGroup>

                <StatsRow>
                  <StatItem>
                    <StatNumber>50K+</StatNumber>
                    <StatLabel>Students</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>1000+</StatNumber>
                    <StatLabel>Teachers</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>200+</StatNumber>
                    <StatLabel>Institutions</StatLabel>
                  </StatItem>
                </StatsRow>
              </HeroContent>
            </Grid>

            <Grid item xs={12} md={6}>
              <HeroImageWrapper>
                <FloatingCard delay="0s">
                  <img src={studentImage} alt="ChaatraSaathi - Students" />
                </FloatingCard>
                <GlowEffect />
              </HeroImageWrapper>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <Container maxWidth="lg">
          <SectionTitle>
            Why Choose <span style={{ color: '#667eea' }}>ChaatraSaathi</span>?
          </SectionTitle>
          <SectionSubtitle>
            Everything you need to manage your institution efficiently
          </SectionSubtitle>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard delay={`${index * 0.1}s`}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDesc>{feature.desc}</FeatureDesc>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeaturesSection>

      {/* CTA Section */}
      <CTASection>
        <Container maxWidth="md">
          <CTAContent>
            <EmojiEvents sx={{ fontSize: 60, color: '#ffd700', mb: 2 }} />
            <CTATitle>Ready to Transform Your Institution?</CTATitle>
            <CTASubtitle>
              Join thousands of institutions already using ChaatraSaathi
            </CTASubtitle>
            <StyledLink to="/choose">
              <CTAButton variant="contained" size="large">
                Start Your Journey
              </CTAButton>
            </StyledLink>
          </CTAContent>
        </Container>
      </CTASection>

      {/* Footer */}
      <Footer>
        <Typography variant="body2" sx={{ color: '#a0aec0' }}>
          © 2025 ChaatraSaathi. Empowering education across India.
        </Typography>
      </Footer>
    </PageWrapper>
  );
};

export default Homepage;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #0f0f23 100%);
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 20px 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-50px, 50px); }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const BrandChip = styled(Chip)`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%) !important;
  color: #667eea !important;
  border: 1px solid rgba(102, 126, 234, 0.3) !important;
  font-weight: 600 !important;
  margin-bottom: 24px !important;
  padding: 20px 16px !important;
  animation: slideInLeft 0.8s ease-out;

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;
  animation: slideInLeft 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #a0aec0;
  margin-bottom: 40px;
  line-height: 1.8;
  max-width: 540px;
  animation: slideInLeft 0.8s ease-out 0.4s both;

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ButtonGroup = styled(Box)`
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  animation: slideInLeft 0.8s ease-out 0.6s both;

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  padding: 14px 40px !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  text-transform: none !important;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4) !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5) !important;
  }
`;

const SecondaryButton = styled(Button)`
  color: #667eea !important;
  border: 2px solid #667eea !important;
  padding: 14px 40px !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  text-transform: none !important;
  background: rgba(102, 126, 234, 0.05) !important;
  transition: all 0.3s ease !important;

  &:hover {
    background: rgba(102, 126, 234, 0.15) !important;
    transform: translateY(-4px);
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 48px;
  animation: slideInLeft 0.8s ease-out 0.8s both;

  @media (max-width: 768px) {
    gap: 24px;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #a0aec0;
  margin-top: 4px;
`;

const HeroImageWrapper = styled.div`
  position: relative;
  animation: slideInRight 1s ease-out;

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const FloatingCard = styled.div`
  background: #1a1a2e;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.2);
  animation: float 6s ease-in-out infinite;
  animation-delay: ${props => props.delay};

  img {
    width: 100%;
    height: auto;
    border-radius: 16px;
    display: block;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
  z-index: -1;
  animation: pulse 4s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 100px 20px;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #a0aec0;
  text-align: center;
  margin-bottom: 48px;
`;

const FeatureCard = styled.div`
  background: #1a1a2e;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
  animation-delay: ${props => props.delay};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(102, 126, 234, 0.3);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
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

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);

  svg {
    font-size: 28px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
`;

const FeatureDesc = styled.p`
  font-size: 0.95rem;
  color: #a0aec0;
  line-height: 1.6;
`;

const CTASection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-top: 1px solid rgba(102, 126, 234, 0.2);
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
`;

const CTAContent = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: #1a1a2e;
  border-radius: 24px;
  border: 1px solid rgba(102, 126, 234, 0.2);
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  color: #a0aec0;
  margin-bottom: 32px;
`;

const CTAButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  padding: 16px 48px !important;
  font-size: 1.2rem !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  text-transform: none !important;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4) !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5) !important;
  }
`;

const Footer = styled.footer`
  padding: 40px 20px;
  text-align: center;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
