import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bPlogo from '../bplogo.png'
import Button from '@mui/material/Button';


const Meal = () => {

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [mealList, setMealList] = useState([]);
    const [localQuery, setLocalQuery] = useState({});

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
        const { mealNumber, mealFood } = localQuery;
        if (mealNumber && mealFood) {
            const updatedMealList = [...mealList];
            const mealIndex = updatedMealList.findIndex((meal) => meal.meal_number === parseInt(mealNumber));
            if (mealIndex !== -1) {
                updatedMealList[mealIndex].food = [mealFood];
                setMealList(updatedMealList);
            }
        }
    }, [localQuery]);

    const clearRouterQuery = () => {
        const currentPath = navigate.asPath.split('?')[0];
        navigate(currentPath, undefined, { shallow: true });
    };

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

    const handleSubmit = async () => {
        // Send data to the backend system here
        /*
        await fetch('/api/saveMealData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mealList }),
        });
        */
        navigate('/exercise');
    };

    const isValidInput = () => {
        const number = parseInt(inputValue);
        return !isNaN(number) && number > 0;
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-2">
            <div className="App" style={{ marginTop: '100px' }}>
                <main className="px-20 py-10 text-center">
                    <img src={bPlogo} className="App-logo" alt="logo"></img>
                    <h1 className="mb-6 text-4xl font-bold">Enter the meal you prefer per day</h1>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="mb-7" style={{ marginTop: '15px' }}>
                            <label className="mr-2" htmlFor="inputValue">
                                Enter an integer:

                            </label>
                            <input
                                className="border border-gray-300 px-2 py-1 rounded-md"
                                id="inputValue"
                                type="number"
                                style={{ margin: "0px 5px" }}
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>

                        <Button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                            variant="contained"
                            color="success"
                            size='small'
                            style={{ margin: "10px" }}
                            onClick={handleConfirm}
                        >
                            Confirm
                        </Button>
                    </div>

                    {
                        mealList.map((meal, index) => (
                            <div key={index} className="mb-2" style={{ display: "flex", justifyContent: "center" }}>
                                <p className="text-2xl">
                                    Meal {meal.meal_number}: {meal.food.join(', ')}
                                </p>
                                <p>The food has entered {JSON.stringify(localQuery)}
                                </p>
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
                        ))
                    }

                    {
                        isValidInput() && mealList.length > 0 && (
                            <Button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                variant="contained"
                                color="success"
                                size='small'
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        )
                    }
                </main >
            </div >
        </div >
    );
};

export default Meal;