import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <WelcomeBox>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                    Welcome Back, Admin
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Here's what's happening with your school today
                </Typography>
            </WelcomeBox>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <StyledPaper elevation={0}>
                        <IconWrapper style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            <StyledImage src={Students} alt="Students" />
                        </IconWrapper>
                        <Box sx={{ mt: 2 }}>
                            <Title>Total Students</Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </Box>
                        <ProgressBar>
                            <ProgressFill width="75%" color="#667eea" />
                        </ProgressBar>
                    </StyledPaper>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <StyledPaper elevation={0}>
                        <IconWrapper style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            <StyledImage src={Classes} alt="Classes" />
                        </IconWrapper>
                        <Box sx={{ mt: 2 }}>
                            <Title>Total Classes</Title>
                            <Data start={0} end={numberOfClasses} duration={5} />
                        </Box>
                        <ProgressBar>
                            <ProgressFill width="60%" color="#f5576c" />
                        </ProgressBar>
                    </StyledPaper>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <StyledPaper elevation={0}>
                        <IconWrapper style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            <StyledImage src={Teachers} alt="Teachers" />
                        </IconWrapper>
                        <Box sx={{ mt: 2 }}>
                            <Title>Total Teachers</Title>
                            <Data start={0} end={numberOfTeachers} duration={2.5} />
                        </Box>
                        <ProgressBar>
                            <ProgressFill width="85%" color="#00f2fe" />
                        </ProgressBar>
                    </StyledPaper>
                </Grid>

                {/* <Grid item xs={12} sm={6} md={6} lg={3}>
                    <StyledPaper elevation={0}>
                        <IconWrapper style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                            <StyledImage src={Fees} alt="Fees" />
                        </IconWrapper>
                        <Box sx={{ mt: 2 }}>
                            <Title>Fees Collection</Title>
                            <Data start={0} end={23000} duration={2.5} prefix="$" />
                        </Box>
                        <ProgressBar>
                            <ProgressFill width="90%" color="#38f9d7" />
                        </ProgressBar>
                    </StyledPaper>
                </Grid> */}

                <Grid item xs={12}>
                    <NoticePaper elevation={0}>
                        <SeeNotice />
                    </NoticePaper>
                </Grid>
            </Grid>
        </Container>
    );
};

// Styled components
const WelcomeBox = styled(Box)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 32px;
    border-radius: 16px;
    margin-bottom: 32px;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
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
    border: 1px solid rgba(102, 126, 234, 0.1);
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
        background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
        border-color: rgba(102, 126, 234, 0.3);

        &::before {
            opacity: 1;
        }
    }

    animation: fadeInUp 0.6s ease-out;
    animation-fill-mode: both;

    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }

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
`;

const Data = styled(CountUp)`
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    line-height: 1.2;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 4px;
    background: rgba(102, 126, 234, 0.1);
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

const NoticePaper = styled(Paper)`
    padding: 24px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(102, 126, 234, 0.1);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out 0.5s;
    animation-fill-mode: both;

    &:hover {
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
        border-color: rgba(102, 126, 234, 0.2);
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

export default AdminHomePage;