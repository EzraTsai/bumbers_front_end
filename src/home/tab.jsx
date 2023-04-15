import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlarmTwoTone } from '@mui/icons-material';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (event) => {
        if (!email || !password) {
            // prevent form submission
            console.log("asdfsad", event)

            return;
        };
        // handle form submission here
        axios({
            method: 'POST',
            baseURL: apiUrl,
            url: "/signup",

            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ "username": username, "email": email, "password": password, "weight": weight, "height": height })
        })
            .then((response) => {
                console.log(response)
                navigate('/meal')
            })
            .then((data) => {
                // handle successful sign up here
            })
            .catch((error) => {
                // handle sign up error here
            });
    };

    const handleSignInSubmit = (event) => {
        axios({
            method: 'POST',
            baseURL: apiUrl,
            url: "/login",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ "email": email, "password": password })
        })

            .then((response) => {
                console.log(response.data["error"])
                if (response.data["token"]) {
                    localStorage.setItem("myCookie: ", response.data["token"])
                    navigate('/meal')
                } else {
                    alert(response.data["error"])
                }

            })

            .catch((error) => {
                console.log(error)
                // handle sign up error here
            });
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ margin: "50px", display: 'flex', justifyContent: 'space-around' }}>
                <Tabs
                    value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Sign up" {...a11yProps(0)} />
                    <Tab label="Sign in" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {/* <form onSubmit={handleSubmit}> */}
                <FormGroup>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div style={{ paddging: '0px', paddingBottom: '-20px', marginBottom: "5px" }}>
                            <TextField
                                required
                                id="outlined-textarea"
                                label="username"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-textarea"
                                label="Email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-textarea"
                                label="Password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <TextField
                                required
                                label="Height"
                                type="height"
                                onChange={(event) => setHeight(event.target.value)}
                            />
                            <TextField
                                required
                                label="Weight"
                                type="weight"
                                onChange={(event) => setWeight(event.target.value)}
                            />
                        </div>
                    </Box>
                    <div>
                        <Button

                            variant="contained"
                            color="success"
                            type="submit"
                            onClick={handleSubmit}

                        >
                            Sign up
                        </Button>
                    </div>
                </FormGroup>
                {/* </form> */}
            </TabPanel >
            <TabPanel value={value} index={1}>
                <FormGroup>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div style={{ paddging: '0px', paddingBottom: '-20px', marginBottom: "50px" }}>
                            <TextField
                                required
                                id="outlined-textarea"
                                label="Email"
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <TextField
                                required
                                id="outlined-textarea"
                                label="Password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </Box>
                    <div >
                        <Button
                            variant="contained" color="success"
                            onClick={handleSignInSubmit}
                        >
                            Sign in
                        </Button>
                    </div>
                </FormGroup>
            </TabPanel>
        </Box >
    );
}
