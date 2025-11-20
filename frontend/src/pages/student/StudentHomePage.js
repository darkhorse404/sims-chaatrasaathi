import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <WelcomeBox>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                        Welcome Back, {currentUser.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Class {currentUser.sclassName?.sclassName} • Roll No: {currentUser.rollNum}
                    </Typography>
                </WelcomeBox>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <StyledPaper elevation={0}>
                            <IconWrapper style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                <StyledImage src={Subject} alt="Subjects" />
                            </IconWrapper>
                            <Box sx={{ mt: 2, width: '100%' }}>
                                <Title>Total Subjects</Title>
                                <Data start={0} end={numberOfSubjects} duration={2.5} />
                            </Box>
                            <ProgressBar>
                                <ProgressFill width="75%" color="#00f2fe" />
                            </ProgressBar>
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <StyledPaper elevation={0}>
                            <IconWrapper style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                <StyledImage src={Assignment} alt="Assignments" />
                            </IconWrapper>
                            <Box sx={{ mt: 2, width: '100%' }}>
                                <Title>Total Assignments</Title>
                                <Data start={0} end={15} duration={4} />
                            </Box>
                            <ProgressBar>
                                <ProgressFill width="60%" color="#f5576c" />
                            </ProgressBar>
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AttendancePaper elevation={0}>
                            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
                                Attendance Overview
                            </Typography>
                            <ChartContainer>
                                {
                                    response ?
                                        <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                                            No Attendance Found
                                        </Typography>
                                        :
                                        <>
                                            {loading
                                                ? (
                                                    <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                                                        Loading...
                                                    </Typography>
                                                )
                                                :
                                                <>
                                                    {
                                                        subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                            <>
                                                                <CustomPieChart data={chartData} />
                                                                <AttendanceStats>
                                                                    <StatItem>
                                                                        <StatValue style={{ color: '#43e97b' }}>
                                                                            {overallAttendancePercentage.toFixed(1)}%
                                                                        </StatValue>
                                                                        <StatLabel>Present</StatLabel>
                                                                    </StatItem>
                                                                    <StatItem>
                                                                        <StatValue style={{ color: '#f5576c' }}>
                                                                            {overallAbsentPercentage.toFixed(1)}%
                                                                        </StatValue>
                                                                        <StatLabel>Absent</StatLabel>
                                                                    </StatItem>
                                                                </AttendanceStats>
                                                            </>
                                                        )
                                                            :
                                                            <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                                                                No Attendance Found
                                                            </Typography>
                                                    }
                                                </>
                                            }
                                        </>
                                }
                            </ChartContainer>
                        </AttendancePaper>
                    </Grid>

                    <Grid item xs={12}>
                        <NoticePaper elevation={0}>
                            <SeeNotice />
                        </NoticePaper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

// Styled Components
const WelcomeBox = styled(Box)`
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
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 200px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.5), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(79, 172, 254, 0.3);
        border-color: rgba(79, 172, 254, 0.3);

        &::before {
            opacity: 1;
        }
    }

    animation: fadeInUp 0.6s ease-out;
    animation-fill-mode: both;

    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }

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

const AttendancePaper = styled(Paper)`
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 200px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.6s ease-out 0.3s;
    animation-fill-mode: both;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(79, 172, 254, 0.3);
        border-color: rgba(79, 172, 254, 0.3);
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

const IconWrapper = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;

    ${StyledPaper}:hover & {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    }
`;

const StyledImage = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    filter: brightness(0) invert(1);
`;

const Title = styled.p`
    font-size: 0.9rem;
    color: #a0aec0;
    margin: 0 0 8px 0;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
`;

const Data = styled(CountUp)`
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    line-height: 1.2;
    text-align: center;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 4px;
    background: rgba(79, 172, 254, 0.1);
    border-radius: 2px;
    margin-top: auto;
    overflow: hidden;
`;

const ProgressFill = styled.div`
    width: ${props => props.width};
    height: 100%;
    background: ${props => props.color};
    border-radius: 2px;
    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    animation: progressAnimation 1.5s ease-out;

    @keyframes progressAnimation {
        from {
            width: 0;
        }
        to {
            width: ${props => props.width};
        }
    }
`;

const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const AttendanceStats = styled.div`
    display: flex;
    gap: 24px;
    margin-top: 16px;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatValue = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
`;

const StatLabel = styled.div`
    font-size: 0.85rem;
    color: #a0aec0;
    margin-top: 4px;
`;

const NoticePaper = styled(Paper)`
    padding: 24px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out 0.4s;
    animation-fill-mode: both;

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

export default StudentHomePage;