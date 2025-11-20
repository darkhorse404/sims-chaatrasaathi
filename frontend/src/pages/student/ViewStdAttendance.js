import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography, Container, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import styled from 'styled-components';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <HeaderBox>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                        Attendance Records
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Track your class attendance and view detailed records
                    </Typography>
                </HeaderBox>
                
                <StyledPaper elevation={0}>
                    <OverallBox>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                            Overall Attendance
                        </Typography>
                        <OverallPercentage>
                            {overallAttendancePercentage.toFixed(2)}%
                        </OverallPercentage>
                    </OverallBox>

                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Subject</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Present</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Total Sessions</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Attendance %</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontWeight: 700, fontSize: '1rem' }}>Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                    {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                        return (
                            <TableBody key={index}>
                                <StyledTableRow>
                                    <StyledTableCell>{subName}</StyledTableCell>
                                    <StyledTableCell>
                                        <Chip label={present} sx={{ bgcolor: '#43e97b', color: '#000', fontWeight: 600 }} size="small" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Chip label={sessions} sx={{ bgcolor: '#4facfe', color: '#fff', fontWeight: 600 }} size="small" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <PercentageChip 
                                            label={`${subjectAttendancePercentage}%`}
                                            percentage={subjectAttendancePercentage}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <DetailButton 
                                            variant="contained"
                                            onClick={() => handleOpen(subId)}
                                        >
                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            Details
                                        </DetailButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Attendance Details
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>Date</StyledTableCell>
                                                            <StyledTableCell align="right">Status</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {allData.map((data, index) => {
                                                            const date = new Date(data.date);
                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                            return (
                                                                <StyledTableRow key={index}>
                                                                    <StyledTableCell component="th" scope="row">
                                                                        {dateString}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                </StyledTableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        )
                    }
                    )}
                    </Table>
                </StyledPaper>
            </Container>
        )
    }

    const renderChartSection = () => {
        return (
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <HeaderBox>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                        Attendance Chart
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Visual representation of your attendance
                    </Typography>
                </HeaderBox>
                
                <StyledPaper elevation={0}>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </StyledPaper>
            </Container>
        )
    };

    return (
        <>
            {loading
                ? (
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#a0aec0' }}>Loading...</Typography>
                    </Container>
                )
                :
                <div>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <StyledBottomNav sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels
                                    sx={{
                                        bgcolor: '#1a1a2e',
                                        '& .MuiBottomNavigationAction-root': {
                                            color: '#a0aec0',
                                            '&.Mui-selected': {
                                                color: '#4facfe',
                                            }
                                        }
                                    }}
                                >
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </StyledBottomNav>
                        </>
                        :
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <NoDataBox>
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    Currently You Have No Attendance Details
                                </Typography>
                            </NoDataBox>
                        </Container>
                    }
                </div>
            }
        </>
    )
}

export default ViewStdAttendance

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
    padding: 24px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(79, 172, 254, 0.1);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
    margin-bottom: 80px;

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

const OverallBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin-bottom: 24px;
    background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%);
    border-radius: 12px;
    border: 1px solid rgba(79, 172, 254, 0.2);
`;

const OverallPercentage = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const PercentageChip = styled(Chip)`
    font-weight: 600 !important;
    background: ${props => {
        const p = props.percentage;
        if (p >= 80) return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
        if (p >= 60) return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        if (p >= 40) return 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)';
        return 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)';
    }} !important;
    color: white !important;
`;

const DetailButton = styled(Button)`
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
    color: white !important;
    border-radius: 8px !important;
    padding: 6px 16px !important;
    text-transform: none !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3) !important;
    transition: all 0.3s ease !important;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(79, 172, 254, 0.4) !important;
    }
`;

const StyledBottomNav = styled(Paper)`
    border-top: 1px solid rgba(79, 172, 254, 0.1);
`;

const NoDataBox = styled(Box)`
    background: #1a1a2e;
    border-radius: 16px;
    border: 1px solid rgba(79, 172, 254, 0.1);
    padding: 60px;
    text-align: center;
`;