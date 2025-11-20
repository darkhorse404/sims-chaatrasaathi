// // import React, { useState } from 'react';
// // import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
// // import { useNavigate } from 'react-router-dom'
// // import { authLogout } from '../../redux/userRelated/userSlice';
// // import { Button, Collapse } from '@mui/material';

// import { useSelector } from 'react-redux';

// const AdminProfile = () => {
//     // const [showTab, setShowTab] = useState(false);
//     // const buttonText = showTab ? 'Cancel' : 'Edit profile';

//     // const navigate = useNavigate()
//     // const dispatch = useDispatch();
//         const { currentUser } = useSelector((state) => state.user);
//     // const { currentUser, response, error } = useSelector((state) => state.user);
//     // const address = "Admin"

//     // if (response) { console.log(response) }
//     // else if (error) { console.log(error) }

//     // const [name, setName] = useState(currentUser.name);
//     // const [email, setEmail] = useState(currentUser.email);
//     // const [password, setPassword] = useState("");
//     // const [schoolName, setSchoolName] = useState(currentUser.schoolName);

//     // const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

//     // const submitHandler = (event) => {
//     //     event.preventDefault()
//     //     dispatch(updateUser(fields, currentUser._id, address))
//     // }

//     // const deleteHandler = () => {
//     //     try {
//     //         dispatch(deleteUser(currentUser._id, "Students"));
//     //         dispatch(deleteUser(currentUser._id, address));
//     //         dispatch(authLogout());
//     //         navigate('/');
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // }

//     return (
//         <div>
//             Name: {currentUser.name}
//             <br />
//             Email: {currentUser.email}
//             <br />
//             College: {currentUser.schoolName}
//             <br />
//             {/* <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button> */}
//             {/* <Button variant="contained" sx={styles.showButton}
//                 onClick={() => setShowTab(!showTab)}>
//                 {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
//             </Button>
//             <Collapse in={showTab} timeout="auto" unmountOnExit>
//                 <div className="register">
//                     <form className="registerForm" onSubmit={submitHandler}>
//                         <span className="registerTitle">Edit Details</span>
//                         <label>Name</label>
//                         <input className="registerInput" type="text" placeholder="Enter your name..."
//                             value={name}
//                             onChange={(event) => setName(event.target.value)}
//                             autoComplete="name" required />

//                         <label>College</label>
//                         <input className="registerInput" type="text" placeholder="Enter your college name..."
//                             value={schoolName}
//                             onChange={(event) => setSchoolName(event.target.value)}
//                             autoComplete="name" required />

//                         <label>Email</label>
//                         <input className="registerInput" type="email" placeholder="Enter your email..."
//                             value={email}
//                             onChange={(event) => setEmail(event.target.value)}
//                             autoComplete="email" required />

//                         <label>Password</label>
//                         <input className="registerInput" type="password" placeholder="Enter your password..."
//                             value={password}
//                             onChange={(event) => setPassword(event.target.value)}
//                             autoComplete="new-password" />

//                         <button className="registerButton" type="submit" >Update</button>
//                     </form>
//                 </div>
//             </Collapse> */}
//         </div>
//     )
// }

// export default AdminProfile

// // const styles = {
// //     attendanceButton: {
// //         backgroundColor: "#270843",
// //         "&:hover": {
// //             backgroundColor: "#3f1068",
// //         }
// //     }
// // }

import { useState } from 'react';
import { 
    Container, 
    Paper, 
    Typography, 
    Button, 
    Box, 
    Avatar, 
    Grid,
    TextField,
    Collapse,
    IconButton,
    Divider,
    Card,
    CardContent
} from '@mui/material';
import { 
    KeyboardArrowDown, 
    KeyboardArrowUp,
    Person,
    Email,
    School,
    Edit,
    Delete,
    Save,
    Cancel
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import styled from 'styled-components';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin";

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
        setShowTab(false);
        setPassword("");
    };

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                dispatch(deleteUser(currentUser._id, "Students"));
                dispatch(deleteUser(currentUser._id, address));
                dispatch(authLogout());
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Get initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ProfileHeader>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <StyledAvatar>
                        {getInitials(currentUser.name)}
                    </StyledAvatar>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
                            {currentUser.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Administrator
                        </Typography>
                    </Box>
                </Box>
            </ProfileHeader>

            <Grid container spacing={3}>
                {/* Profile Information Card */}
                <Grid item xs={12} md={8}>
                    <StyledPaper elevation={0}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                                Profile Information
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={showTab ? <Cancel /> : <Edit />}
                                onClick={() => setShowTab(!showTab)}
                                sx={{
                                    background: showTab 
                                        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: '#fff',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    padding: '8px 20px',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                    '&:hover': {
                                        background: showTab
                                            ? 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)'
                                            : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {showTab ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </Box>

                        <Divider sx={{ borderColor: 'rgba(102, 126, 234, 0.1)', mb: 3 }} />

                        <Collapse in={!showTab}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <InfoItem>
                                    <IconWrapper style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                        <Person />
                                    </IconWrapper>
                                    <Box>
                                        <InfoLabel>Full Name</InfoLabel>
                                        <InfoValue>{currentUser.name}</InfoValue>
                                    </Box>
                                </InfoItem>

                                <InfoItem>
                                    <IconWrapper style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                        <Email />
                                    </IconWrapper>
                                    <Box>
                                        <InfoLabel>Email Address</InfoLabel>
                                        <InfoValue>{currentUser.email}</InfoValue>
                                    </Box>
                                </InfoItem>

                                <InfoItem>
                                    <IconWrapper style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                        <School />
                                    </IconWrapper>
                                    <Box>
                                        <InfoLabel>Institution</InfoLabel>
                                        <InfoValue>{currentUser.schoolName}</InfoValue>
                                    </Box>
                                </InfoItem>
                            </Box>
                        </Collapse>

                        <Collapse in={showTab} timeout="auto" unmountOnExit>
                            <FormContainer component="form" onSubmit={submitHandler}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 3 }}>
                                    Edit Profile Details
                                </Typography>

                                <StyledTextField
                                    fullWidth
                                    label="Full Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: <Person sx={{ mr: 1, color: '#667eea' }} />,
                                    }}
                                />

                                <StyledTextField
                                    fullWidth
                                    label="Institution Name"
                                    variant="outlined"
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: <School sx={{ mr: 1, color: '#667eea' }} />,
                                    }}
                                />

                                <StyledTextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: <Email sx={{ mr: 1, color: '#667eea' }} />,
                                    }}
                                />

                                <StyledTextField
                                    fullWidth
                                    label="New Password (Optional)"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                    helperText="Leave blank if you don't want to change your password"
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Save />}
                                    fullWidth
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: '#fff',
                                        textTransform: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </FormContainer>
                        </Collapse>
                    </StyledPaper>
                </Grid>

                {/* Quick Actions Card */}
                <Grid item xs={12} md={4}>
                    <StyledPaper elevation={0}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 3 }}>
                            Quick Actions
                        </Typography>
                        <Divider sx={{ borderColor: 'rgba(102, 126, 234, 0.1)', mb: 3 }} />
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <ActionCard>
                                <Typography variant="body2" sx={{ color: '#a0aec0', mb: 1 }}>
                                    Account Status
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <StatusDot />
                                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
                                        Active
                                    </Typography>
                                </Box>
                            </ActionCard>

                            <ActionCard>
                                <Typography variant="body2" sx={{ color: '#a0aec0', mb: 1 }}>
                                    Role
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
                                    System Administrator
                                </Typography>
                            </ActionCard>

                            <Divider sx={{ borderColor: 'rgba(102, 126, 234, 0.1)', my: 1 }} />

                            <Button
                                variant="outlined"
                                startIcon={<Delete />}
                                onClick={deleteHandler}
                                fullWidth
                                sx={{
                                    color: '#f5576c',
                                    borderColor: 'rgba(245, 87, 108, 0.3)',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    '&:hover': {
                                        borderColor: '#f5576c',
                                        background: 'rgba(245, 87, 108, 0.1)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Delete Account
                            </Button>
                        </Box>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminProfile;

// Styled Components
const ProfileHeader = styled(Box)`
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

const StyledAvatar = styled(Avatar)`
    width: 100px !important;
    height: 100px !important;
    font-size: 2.5rem !important;
    font-weight: 700 !important;
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px);
    border: 3px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const StyledPaper = styled(Paper)`
    padding: 32px;
    background: #1a1a2e !important;
    border-radius: 16px !important;
    border: 1px solid rgba(102, 126, 234, 0.1);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
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

const InfoItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(102, 126, 234, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(102, 126, 234, 0.08);
        border-color: rgba(102, 126, 234, 0.2);
        transform: translateX(4px);
    }
`;

const IconWrapper = styled(Box)`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    svg {
        font-size: 24px;
    }
`;

const InfoLabel = styled(Typography)`
    font-size: 0.875rem !important;
    color: #a0aec0 !important;
    margin-bottom: 4px !important;
    font-weight: 500 !important;
`;

const InfoValue = styled(Typography)`
    font-size: 1rem !important;
    color: #fff !important;
    font-weight: 600 !important;
`;

const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
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

    & .MuiInputLabel-root {
        color: #a0aec0;

        &.Mui-focused {
            color: #667eea;
        }
    }

    & .MuiFormHelperText-root {
        color: #a0aec0;
    }
`;

const ActionCard = styled(Card)`
    background: rgba(102, 126, 234, 0.05) !important;
    border: 1px solid rgba(102, 126, 234, 0.1) !important;
    border-radius: 12px !important;
    padding: 16px;
    box-shadow: none !important;
`;

const StatusDot = styled(Box)`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #43e97b;
    box-shadow: 0 0 10px rgba(67, 233, 123, 0.5);
    animation: pulse 2s infinite;

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;