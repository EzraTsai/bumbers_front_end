import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bPlogo from '../bplogo.png'
import Button from '@mui/material/Button';
import axios from 'axios';

const Meal = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [mealList, setMealList] = useState([]);
    const [localQuery, setLocalQuery] = useState({});

    const mealNumber = queryParams.get('mealNumber');
    const mealFood = queryParams.get('mealFood');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const storedMealList = localStorage.getItem('mealList');
        if (storedMealList) {
            setMealList(JSON.parse(storedMealList));
        }
    }, []);

    useEffect(() => {
        const mealNumber = queryParams.get('mealNumber');
        const mealFood = queryParams.get('mealFood');

        setLocalQuery({ mealNumber, mealFood });

        if (mealNumber && mealFood) {
            setMealList((prevMealList) =>
                prevMealList.map((meal) =>
                    meal.meal_number === parseInt(mealNumber)
                        ? { ...meal, food: [mealFood] }
                        : meal
                )
            );
        }
    }, [queryParams]);

    const handleAddFoodClick = (mealNumber) => {
        localStorage.setItem('mealList', JSON.stringify(mealList));
        navigate(`/choosefood?mealNumber=${mealNumber}&mealFood=[]`);
    };

    const handleConfirm = () => {
        const numberOfMeals = parseInt(inputValue);
        const newMealList = [];
        for (let i = 1; i <= numberOfMeals; i++) {
            newMealList.push({ meal_number: i, food: [] });
        }
        setMealList(newMealList);
    };

    const handleLocalQuerySubmit = async () => {
        // Send localQuery data to the backend system here
        await axios({
            method: 'POST',
            url: "/addmeal",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "meal": mealList }),
        });

        navigate('/exercise');
    };

    const isValidQuery = () => {
        const values = Object.values(localQuery);
        const hasEmptyValue = values.some(value => !value || value.length === 0);
        return !hasEmptyValue;
    };
    return (
        <div className="App" style={{ marginTop: '100px' }}>
            <img src={bPlogo} className="App-logo" alt="logo"></img>

            <div className="flex flex-col items-center justify-start min-h-screen py-2">
                <main className="px-20 py-10 text-center">
                    <h1 className="mb-6 text-4xl font-bold">Enter the meal you prefer per day</h1>
                    <div className="mb-7" style={{ display: "flex", justifyContent: "center" }}>
                        <label className="mr-2" htmlFor="inputValue" style={{ marginTop: "5px" }}>
                            Enter an integer:
                        </label>
                        <input
                            id="inputValue"
                            type="number"
                            value={inputValue}
                            style={{ width: "50px", marginLeft: "10px" }}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded-md"
                        />

                        <Button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                            variant="contained"
                            color="success"
                            size='small'
                            style={{ margin: "0px 10px 0px 10px" }}
                            onClick={handleConfirm}
                        >
                            Confirm
                        </Button>
                    </div>

                    {mealList.map((meal, index) => {
                        // console.log("meal: ", meal)
                        return (
                            < div key={index} className="mb-2" style={{ display: "flex", justifyContent: "center", margin: "5px 0px" }} >
                                <div className="text-2xl">
                                    Meal {meal.meal_number}: {meal.food.join(', ')}
                                </div>

                                <Button
                                    className="bg-blue-500 text-white ml-4 px-4 py-2 rounded-lg"
                                    variant="contained"
                                    color="success"
                                    size='small'
                                    onClick={() => handleAddFoodClick(meal.meal_number)}
                                >
                                    Add Food
                                </Button>
                            </div>
                        )
                    })

                    }

                    {isValidQuery() && mealList.length > 0 && (
                        <Button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            variant="contained"
                            color="success"
                            size='small'
                            onClick={handleLocalQuerySubmit}
                        >
                            Submit
                        </Button>
                    )}
                </main>
            </div >
        </div >
    );
};

export default Meal;