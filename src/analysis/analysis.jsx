import React from 'react';

// You can import your data from the backend here
const data = {
    message: [
        'Based on the data you provided ',
        'Estimation on you would be',
    ],
    picture: '/image-url.jpg',
    percentage: 'The system transfer percentage',
    paragraph: 'The system output paragraph',
};

const Analysis = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="px-20 py-10 text-center">
                <h1 className="mb-6 text-4xl font-bold">
                    {data.message}
                </h1>
                <div className="mb-6">
                    <img
                        src={data.picture}
                        alt="Backend Image"
                        width={300}
                        height={200}
                    />
                </div>
                <h2 className="mb-6 text-3xl font-semibold">
                    {data.percentage}
                </h2>
                <p className="mb-6 text-lg">{data.paragraph}</p>
            </main>
        </div>
    );
};

export default Analysis;
