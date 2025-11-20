import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#f093fb',
            },
            secondary: {
                main: '#f5576c',
            },
            background: {
                default: '#0f0f23',
                paper: '#1a1a2e',
            },
            text: {
                primary: '#ffffff',
                secondary: '#a0aec0',
            },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h6: {
                fontWeight: 600,
                letterSpacing: '0.5px',
            },
        },
        shape: {
            borderRadius: 12,
        },
        shadows: [
            'none',
            '0 2px 8px rgba(0,0,0,0.15)',
            '0 4px 16px rgba(0,0,0,0.2)',
            '0 8px 24px rgba(0,0,0,0.25)',
            '0 12px 32px rgba(0,0,0,0.3)',
            ...Array(20).fill('0 16px 48px rgba(0,0,0,0.35)'),
        ],
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
        },
    });

    return (
        <>
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar 
                    open={open} 
                    position='absolute' 
                    sx={{ 
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        boxShadow: '0 4px 20px rgba(240, 147, 251, 0.3)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Toolbar sx={{ pr: '24px', minHeight: '70px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'scale(1.05)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ 
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '1px',
                                fontSize: '1.3rem',
                            }}
                        >
                            Teacher Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer 
                    variant="permanent" 
                    open={open} 
                    sx={{
                        ...(open ? styles.drawerStyled : styles.hideDrawer),
                        '& .MuiDrawer-paper': {
                            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
                            borderRight: '1px solid rgba(240, 147, 251, 0.1)',
                        },
                    }}
                >
                    <Toolbar 
                        sx={{
                            ...styles.toolBarStyled,
                            minHeight: '70px',
                            borderBottom: '1px solid rgba(240, 147, 251, 0.1)',
                        }}
                    >
                        <IconButton 
                            onClick={toggleDrawer}
                            sx={{
                                color: '#f093fb',
                                '&:hover': {
                                    backgroundColor: 'rgba(240, 147, 251, 0.1)',
                                    transform: 'rotate(180deg)',
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider sx={{ borderColor: 'rgba(240, 147, 251, 0.1)' }} />
                    <List component="nav">
                        <TeacherSideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar sx={{ minHeight: '70px' }} />
                    <Routes>
                        <Route path="/" element={<TeacherHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                        <Route path="/Teacher/profile" element={<TeacherProfile />} />

                        <Route path="/Teacher/complain" element={<TeacherComplain />} />

                        <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                        <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />

                        <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
            </ThemeProvider>
        </>
    );
}

export default TeacherDashboard

const styles = {
    boxStyled: {
        backgroundColor: '#0f0f23',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: '24px',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}