import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';


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
    const [value, setValue] = useState(0);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (!email || !password) {
        //     // prevent form submission
        //     console.log("asdfsad", event)
        //     return;
        // }

        // // handle form submission here
        // fetch('/api/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password })
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // handle successful sign up here
        //     })
        //     .catch((error) => {
        //         // handle sign up error here
        //     });

        window.location.href = '/food';
    };

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
                <form onSubmit={handleSubmit}>
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
                                    // value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />

                                <TextField
                                    required
                                    id="outlined-textarea"
                                    label="Password"
                                    // value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <TextField
                                    required
                                    label="Height"
                                    type="height"
                                    // value={height}
                                    onChange={(event) => setHeight(event.target.value)}
                                />
                                <TextField
                                    required
                                    label="Weight"
                                    type="weight"
                                    // value={weight}
                                    onChange={(event) => setWeight(event.target.value)}
                                />
                            </div>
                        </Box>
                        <div style={{ margin: '0px 0px 50px 10px' }}>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                            >
                                Sign up
                            </Button>
                        </div>
                    </FormGroup>
                </form>
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
                        <div style={{ paddging: '0px', paddingBottom: '-20px', marginBottom: "50px", marginLeft: '80px' }}>
                            <TextField
                                required
                                id="outlined-textarea"
                                label="Email"
                            />

                            <TextField
                                required
                                id="outlined-textarea"
                                label="Password"
                            />
                        </div>
                    </Box>
                    <div style={{ margin: '0px 50px 100px 130px' }}>
                        <Button
                            variant="contained" color="success"
                            onClick={() => {
                                alert('clicked');
                            }}
                        >
                            Sign in
                        </Button>
                    </div>
                </FormGroup>
            </TabPanel>
        </Box >
    );
}
