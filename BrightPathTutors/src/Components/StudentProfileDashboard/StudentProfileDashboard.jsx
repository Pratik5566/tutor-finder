import React, { useEffect, useState, useRef } from 'react';
import './StudentProfileDashboard.css';
import { Button, Card, CardContent, TextField, Typography, ThemeProvider, createTheme, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../AuthContext.jsx';
//import img1 from '../../assets/BPT.png'
import FadeUp from '../HomePage/FadeUp/FadeUp.jsx';
import { useNavigate } from 'react-router-dom';


const StudentProfileDashboard = () => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const { authUser, logout } = useAuth();
    const [data, setData] = useState();
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        // Call the logout function provided by useAuth
        logout();

        // Redirect the user to the login page
        navigate('/');
    };
    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(e.target.files[0])
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    }

    const theme = createTheme({
        palette: {
            action: {
                disabled: '#cfd2d4', // Red color for disabled state
            },
            primary: {
                main: '#cfd2d4', // Green color for text, border, and label
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputLabel-root': {
                            WebkitTextFillColor: "#cfd2d4", // Default label color
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: '#cfd2d4', // Bottom line color when not focused
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#cfd2d4', // Bottom line color when focused
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#cfd2d4', // Border color
                            },
                            '&:hover fieldset': {
                                borderColor: '#cfd2d4', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#cfd2d4', // Border color when focused
                            },
                            '& input': {
                                WebkitTextFillColor: "#cfd2d4", // Input text color
                            },
                        },
                        '&.Mui-disabled': {
                            '& .MuiInputLabel-root': {
                                WebkitTextFillColor: "#cfd2d4", // Disabled label color
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: '#cfd2d4', // Bottom line color when disabled
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#cfd2d4', // Bottom line color when disabled and focused
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#cfd2d4', // Border color when disabled
                                },
                                '& input': {
                                    WebkitTextFillColor: "#cfd2d4", // Input text color when disabled
                                },
                            },
                        },
                    },
                },
            },
        },
    });



    const handleSaveClick = async (e) => {
        setEditMode(!editMode);
        e.preventDefault();
        const updatedUser = { name, email, phone }
        let response;
        let result;
        if (authUser.isTutor) {
            response = await fetch(`http://localhost:5000/tutor/${authUser._id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedUser),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        } else {
            response = await fetch(`http://localhost:5000/user/${authUser._id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedUser),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }

        result = await response.json()
        if (!response.ok) {
            console.log(result.error)
        } if (response.ok) {
            console.log(result)
        }
    };

    async function getData() {
        let response;
        let result;
        if (authUser.isTutor) {
            response = await fetch(`http://localhost:5000/tutor/${authUser._id}`)
            result = await response.json();
        } else {
            response = await fetch(`http://localhost:5000/user/${authUser._id}`)
            result = await response.json();
        }
        if (!response.ok) {
            console.log(result.error);
        }
        if (response.ok) {
            setData(result);
            setName(result.name)
            setEmail(result.email)
            setPhone(result.phone)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='SPD-Top'>
            <div className="SPD-drawer">
                <div className="SPD-drawer-1">
          
                </div>
                <div className="SPD-drawer-2">
                    <Button fullWidth size='large' className='SPD-drawer-2-button' sx={{ color: "#cfd2d4" }} onClick={() => { navigate("/") }}>Home</Button>
                    <Button fullWidth size='large' className='SPD-drawer-2-button' sx={{ color: "#cfd2d4" }}>Profile</Button>
                    <Button fullWidth size='large' className='SPD-drawer-2-button' sx={{ color: "#cfd2d4" }}onClick={() => { navigate("/dashboard") }}>Dashboard</Button>
                    <Button fullWidth size='large' className='SPD-drawer-2-button' sx={{ color: "#cfd2d4" }} onClick={() => { navigate("/tutorfind") }}>Find Tutors</Button>
                    <div className="SPD-drawer-2-1">
                        <Button size='large' fullWidth className='SPD-drawer-2-button' sx={{ color: "#cfd2d4" }} onClick={handleLogout}><LogoutIcon /> Log Out</Button>
                    </div>
                </div>
            </div>
            <div className="SPD-upperContainer">
                <div className="SPD-upperContainer-innerContainer-1">
                </div>
                <div className="SPD-upperContainer-innerContainer-2">
                    <div className="SPD-profilePicture" onClick={handleImageClick}>

                        {image ?
                            <Avatar sx={{ height: "30vh", width: "13vw", borderRadius: "100%", fontSize: 80 }} src={URL.createObjectURL(image)} alt="" />
                            // <img id='profile-img' src={URL.createObjectURL(image)} alt="" />
                            :
                            <Avatar sx={{ height: "30vh", width: "13vw", borderRadius: "100%", fontSize: 80 }} src="{authUser.name}" alt={authUser.name} />
                        }

                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                    </div>
                    <div>
                        <Typography><h2>{name}</h2></Typography>
                        <Typography>{email}</Typography>
                    </div>
                </div>
                <div className="SPD-upperContainer-innerContainer-3">
                    <div className='User-Details' style={{ overflowY: 'auto' }}>

                        <ThemeProvider theme={theme}>
                            <FadeUp>
                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent >
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#cfd2d4",
                                                },
                                            }}
                                            label="Name"
                                            disabled={!editMode}
                                            value={name}
                                            onChange={handleNameChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>
                            <FadeUp>
                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent>
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            label="Email"
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#cfd2d4",
                                                },
                                            }}

                                            disabled={!editMode}
                                            value={email}
                                            onChange={handleEmailChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>
                            <FadeUp>

                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent>
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            label="Phone"
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "white",
                                                },
                                            }}

                                            disabled={!editMode}
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>

                            <FadeUp>

                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent >
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#cfd2d4",
                                                },
                                            }}
                                            label="Name"
                                            disabled={!editMode}
                                            value={name}
                                            onChange={handleNameChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>

                            <FadeUp>

                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent >
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#cfd2d4",
                                                },
                                            }}
                                            label="Name"
                                            disabled={!editMode}
                                            value={name}
                                            onChange={handleNameChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>

                            <FadeUp>

                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent >
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#cfd2d4",
                                                },
                                            }}
                                            label="Name"
                                            disabled={!editMode}
                                            value={name}
                                            onChange={handleNameChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>

                            <FadeUp>

                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent >
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#cfd2d4",
                                                },
                                            }}
                                            label="Name"
                                            disabled={!editMode}
                                            value={name}
                                            onChange={handleNameChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>

                            <FadeUp>

                                <Card sx={{ marginBottom: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                                    <CardContent >
                                        <TextField
                                            id="filled-basic"
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#cfd2d4",
                                                },
                                            }}
                                            label="Name"
                                            disabled={!editMode}
                                            value={name}
                                            onChange={handleNameChange}
                                            InputProps={{
                                                classes: {
                                                    disabled: "Mui-disabled",
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </FadeUp>

                        </ThemeProvider>
                    </div>
                    <div className="User-Details-edit">
                        <Button fullWidth size='large' className='SPD-drawer-2-button2' sx={{ color: "#1b1e23", backgroundColor: "#cfd2d4" }} onClick={handleEditClick}>
                            {editMode ? 'Cancel' : 'Edit'}
                        </Button>
                        <Button fullWidth size='large' className='SPD-drawer-2-button2' sx={{ color: "#1b1e23", backgroundColor: "#cfd2d4" }} onClick={handleSaveClick}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StudentProfileDashboard;
