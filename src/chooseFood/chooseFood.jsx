import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import bPlogo from '../bplogo.png'
import axios from 'axios';



const ChooseFood = () => {

    const apiUrl = process.env.REACT_APP_API_URL
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mealNumber = queryParams.get('mealNumber');
    const mealFood = queryParams.get('mealFood');
    const [searchInput, setSearchInput] = useState('');
    const [foodOutput, setFoodOutput] = useState('');
    const [foodCount, setFoodCount] = useState('');
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [result, setResult] = useState('');

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleFoodCountChange = (event) => {
        setFoodCount(event.target.value);
    };

    const handleSubmit = () => {
        const selectedFoodsString = selectedFoods.join(', ');
        navigate(`/meal?mealNumber=${mealNumber}&mealFood=${selectedFoodsString}`);
    };

    const handleSearchClick = async () => {
        axios({
            method: 'GET',
            baseURL: apiUrl,
            url: '/search',
            headers: {
                'Content-Type': 'application/json',
            },
            params: { "name": searchInput },
        })
            .then(response => {
                if (response.data['success']) {
                    setFoodOutput(searchInput)
                }
                else {
                    setFoodOutput('The food is not exist in food database!')
                }
            })
            .catch(error => console.log(error))

    };

    const handleAddClick = () => {
        const newSelectedFood = `${foodOutput} x ${foodCount}`;
        setSelectedFoods((prevState) => [...prevState, newSelectedFood]);
        setFoodCount(0);
        setFoodOutput('');
    };

    const isValidFood = () => {
        return foodOutput !== '' && foodOutput !== 'The food is not exist in food database!';
    }
    const isValidFoodCount = () => {
        const number = parseInt(foodCount);
        return !isNaN(number) && number > 0;
    };

    return (
        <div className="App" style={{ marginTop: '100px' }}>
            <img src={bPlogo} className="App-logo" alt="logo"></img>

            <div className="flex flex-col items-center justify-start min-h-screen py-2">
                <main className="px-20 py-10 text-center">
                    <h1 className="mb-6 text-4xl font-bold">Choose Food for Meal {mealNumber}</h1>
                    <div className="mb-7" style={{ display: "flex", justifyContent: "center" }}>
                        <label htmlFor="searchInput" style={{ marginTop: "5px" }}>Search Food:</label>
                        <input
                            type="text"
                            id="searchInput"
                            value={searchInput}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                        <Button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            variant="contained"
                            color="success"
                            size='small'
                            style={{ width: "50px", margin: "0px 10px" }}
                            onClick={handleSearchClick}
                        >
                            Enter
                        </Button>
                    </div>
                    <div className="mb-7" style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ magin: "16px" }}>
                            <label htmlFor="food_output" >
                                The food you entered
                            </label>
                        </div>
                    </div>
                    {isValidFood() && (
                        <div className="mb-7">
                            <label htmlFor="food_count">Food Count:</label>
                            <input
                                type="number"
                                id="food_count"
                                value={foodCount}
                                onChange={handleFoodCountChange}
                                style={{ width: "50px", margin: "0px 10px" }}
                                className="border border-gray-300 px-2 py-1 rounded-md"
                            />
                            {isValidFoodCount() && (
                                <Button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    variant="contained"
                                    color="success"
                                    size='small'
                                    onClick={handleAddClick}
                                >
                                    Add
                                </Button>
                            )}
                        </div>
                    )}
                    <div className="mb-7" style={{ display: "flex", justifyContent: "center" }}>
                        <h2 className="text-2xl font-bold mb-2">Selected Foods:</h2>
                        <ul>
                            {selectedFoods.map((food, index) => (
                                <li key={index}>{food}</li>
                            ))}
                        </ul>
                    </div>
                    <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        variant="contained"
                        color="success"
                        size='small'
                        onClick={handleSubmit}
                    >
                        Confirm
                    </Button>
                </main>
            </div>
        </div>
    );
};

export default ChooseFood;