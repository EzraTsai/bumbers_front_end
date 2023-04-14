// import React, { useState } from 'react';
import whiteMan from '../whiteman.png'
import './body.css';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


function App() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bodyFat, setBodyFat] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit data to backend here
    }

    return (
        <Container maxWidth="sm">
            <img src={whiteMan} className="whiteMan-logo" alt="whiteMa"></img>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Height"
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Weight"
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Body Fat %"
                    type="number"
                    value={bodyFat}
                    onChange={e => setBodyFat(e.target.value)}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Next
                </Button>
            </form>
        </Container>
    );
}

export default App;