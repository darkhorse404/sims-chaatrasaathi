import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { 
    BottomNavigation, 
    BottomNavigationAction, 
    Container, 
    Paper, 
    Table, 
    TableBody, 
    TableHead, 
    Typography,
    Box,
    Chip,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import styled from 'styled-components';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import GradeIcon from '@mui/icons-material/Grade';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (currentUser?.sclassName?._id) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, currentUser]);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    // Calculate average marks
    const calculateAverage = () => {
        if (!subjectMarks || subjectMarks.length === 0) return 0;
        const validMarks = subjectMarks.filter(result => result.marksObtained);
        if (validMarks.length === 0) return 0;
        const total = validMarks.reduce((sum, result) => sum + result.marksObtained, 0);
        return (total / validMarks.length).toFixed(2);
    };

    // Calculate total marks
    const calculateTotal = () => {
        if (!subjectMarks || subjectMarks.length === 0) return 0;
        return subjectMarks.reduce((sum, result) => sum + (result.marksObtained || 0), 0);
    };

    const renderTableSection = () => {
        return (
            <TableContainer>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                        Subject Marks
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                        Your academic performance overview
                    </Typography>
                </Box>

                <StatsGrid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                <GradeIcon />
                            </StatIcon>
                            <Box>
                                <StatLabel>Average Marks</StatLabel>
                                <StatValue>{calculateAverage()}</StatValue>
                            </Box>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <SchoolIcon />
                            </StatIcon>
                            <Box>
                                <StatLabel>Total Marks</StatLabel>
                                <StatValue>{calculateTotal()}</StatValue>
                            </Box>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard>
                            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                <ClassIcon />
                            </StatIcon>
                            <Box>
                                <StatLabel>Subjects</StatLabel>
                                <StatValue>{subjectMarks.length}</StatValue>
                            </Box>
                        </StatCard>
                    </Grid>
                </StatsGrid>

                <StyledTablePaper elevation={0}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                                    Subject Name
                                </StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                                    Marks Obtained
                                </StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                                    Grade
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                
                                // Calculate grade based on marks
                                const getGrade = (marks) => {
                                    if (marks >= 90) return { grade: 'A+', color: '#43e97b' };
                                    if (marks >= 80) return { grade: 'A', color: '#4facfe' };
                                    if (marks >= 70) return { grade: 'B+', color: '#667eea' };
                                    if (marks >= 60) return { grade: 'B', color: '#f093fb' };
                                    if (marks >= 50) return { grade: 'C', color: '#feca57' };
                                    return { grade: 'F', color: '#f5576c' };
                                };

                                const gradeInfo = getGrade(result.marksObtained);

                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <SchoolIcon sx={{ fontSize: '1.2rem', color: '#4facfe' }} />
                                                {result.subName.subName}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <MarksChip 
                                                label={result.marksObtained} 
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <GradeChip 
                                                label={gradeInfo.grade}
                                                style={{ backgroundColor: gradeInfo.color }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </StyledTablePaper>
            </TableContainer>
        );
    };

    const renderChartSection = () => {
        return (
            <ChartContainer>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                        Performance Chart
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                        Visual representation of your marks
                    </Typography>
                </Box>
                <ChartPaper elevation={0}>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </ChartPaper>
            </ChartContainer>
        );
    };

    const renderClassDetailsSection = () => {
        const className = currentUser?.sclassName?.sclassName || sclassDetails?.sclassName || 'Not Available';
        
        return (
            <ClassDetailsContainer>
                <ClassHeader>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                        Class Details
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Your current class information and subjects
                    </Typography>
                </ClassHeader>

                <ClassInfoCard elevation={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <ClassIconWrapper>
                            <ClassIcon sx={{ fontSize: '2rem' }} />
                        </ClassIconWrapper>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>
                                Class {className}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                                Current Academic Class
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 2 }}>
                            Enrolled Subjects ({subjectsList?.length || 0})
                        </Typography>
                        
                        {subjectsList && subjectsList.length > 0 ? (
                            <SubjectsGrid container spacing={2}>
                                {subjectsList.map((subject, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <SubjectCard>
                                            <SubjectIconWrapper>
                                                <SchoolIcon />
                                            </SubjectIconWrapper>
                                            <Box sx={{ flex: 1 }}>
                                                <SubjectName>{subject.subName}</SubjectName>
                                                <SubjectCode>{subject.subCode}</SubjectCode>
                                            </Box>
                                        </SubjectCard>
                                    </Grid>
                                ))}
                            </SubjectsGrid>
                        ) : (
                            <EmptyState>
                                <SchoolIcon sx={{ fontSize: '3rem', color: '#a0aec0', mb: 2 }} />
                                <Typography variant="body1" sx={{ color: '#a0aec0' }}>
                                    No subjects found for your class
                                </Typography>
                            </EmptyState>
                        )}
                    </Box>
                </ClassInfoCard>
            </ClassDetailsContainer>
        );
    };

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <Typography variant="h6" sx={{ color: '#a0aec0' }}>
                        Loading your subjects...
                    </Typography>
                </LoadingContainer>
            ) : (
                <Container maxWidth="lg" sx={{ mt: 2, mb: 10 }}>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <BottomNav elevation={3}>
                                <BottomNavigation 
                                    value={selectedSection} 
                                    onChange={handleSectionChange} 
                                    showLabels
                                    sx={{
                                        backgroundColor: '#1a1a2e',
                                        '& .MuiBottomNavigationAction-root': {
                                            color: '#a0aec0',
                                            '&.Mui-selected': {
                                                color: '#4facfe',
                                            },
                                        },
                                    }}
                                >
                                    <BottomNavigationAction
                                        label="Table View"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart View"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </BottomNav>
                        </>
                    ) : (
                        renderClassDetailsSection()
                    )}
                </Container>
            )}
        </>
    );
};

export default StudentSubjects;

// Styled Components
const TableContainer = styled.div`
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

const StyledTablePaper = styled(Paper)`
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
    overflow: hidden;
    
    .MuiTableCell-root {
        border-color: rgba(79, 172, 254, 0.1);
    }
`;

const StatsGrid = styled(Grid)`
    margin-bottom: 24px;
`;

const StatCard = styled(Box)`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: #1a1a2e;
    border-radius: 12px;
    border: 1px solid rgba(79, 172, 254, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(79, 172, 254, 0.2);
        border-color: rgba(79, 172, 254, 0.3);
    }
`;

const StatIcon = styled(Box)`
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    svg {
        font-size: 1.8rem;
    }
`;

const StatLabel = styled(Typography)`
    font-size: 0.85rem !important;
    color: #a0aec0 !important;
    margin-bottom: 4px !important;
`;

const StatValue = styled(Typography)`
    font-size: 1.8rem !important;
    font-weight: 700 !important;
    color: #fff !important;
`;

const MarksChip = styled(Chip)`
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
    color: white !important;
    font-weight: 600 !important;
    min-width: 60px;
`;

const GradeChip = styled(Chip)`
    color: white !important;
    font-weight: 700 !important;
    min-width: 50px;
`;

const ChartContainer = styled.div`
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

const ChartPaper = styled(Paper)`
    padding: 32px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
    min-height: 400px;
`;

const ClassDetailsContainer = styled.div`
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

const ClassHeader = styled(Box)`
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    padding: 32px;
    border-radius: 16px;
    margin-bottom: 24px;
    box-shadow: 0 8px 32px rgba(79, 172, 254, 0.3);
`;

const ClassInfoCard = styled(Paper)`
    padding: 32px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
`;

const ClassIconWrapper = styled(Box)`
    width: 70px;
    height: 70px;
    border-radius: 16px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 8px 24px rgba(79, 172, 254, 0.3);
`;

const SubjectsGrid = styled(Grid)``;

const SubjectCard = styled(Box)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: rgba(79, 172, 254, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(79, 172, 254, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(79, 172, 254, 0.08);
        border-color: rgba(79, 172, 254, 0.3);
        transform: translateX(8px);
    }
`;

const SubjectIconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;

    svg {
        font-size: 1.2rem;
    }
`;

const SubjectName = styled(Typography)`
    font-size: 1rem !important;
    font-weight: 600 !important;
    color: #fff !important;
`;

const SubjectCode = styled(Typography)`
    font-size: 0.85rem !important;
    color: #a0aec0 !important;
`;

const EmptyState = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    text-align: center;
`;

const LoadingContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

const BottomNav = styled(Paper)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    border-top: 1px solid rgba(79, 172, 254, 0.1);
`;