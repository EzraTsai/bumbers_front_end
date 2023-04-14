import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import bodyfat14 from '../14.png'

// You can import your data from the backend here
const data = {
    message: [
        'Based on the data you provided ',
        'Estimation on you would be...',
    ],
    picture: '/image-url.jpg',
    percentage: 'The system transfer percentage',
    paragraph: 'The system output paragraph',
};

const Analysis = () => {
    return (

        <div className="App" style={{ marginTop: '100px' }}>
            <h1 className="mb-6 text-4xl font-bold">
                {data.message}
            </h1>
            <img src={bodyfat14} className="App-logo" alt="logo"></img>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <p className="mb-6 text-lg">{data.paragraph}</p>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <p>THIS IS FOR CHATGPT!!!!</p>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>


        </div>


        // <div>
        //     style={{ marginTop: '100px' }}>
        //     <img src={bPlogo} className="App-logo" alt="logo"></img>
        //     <main className="px-20 py-10 text-center">
        //         <h1 className="mb-6 text-4xl font-bold">
        //             {data.message}
        //         </h1>
        //         <div className="mb-6">
        //             <img
        //                 src={data.picture}
        //                 alt="Backend Image"
        //                 width={300}
        //                 height={200}
        //             />
        //         </div>
        //         <h2 className="mb-6 text-3xl font-semibold">
        //             {data.percentage}
        //         </h2>
        //         <p className="mb-6 text-lg">{data.paragraph}</p>
        //     </main>
        // </div>
    );
};

export default Analysis;
