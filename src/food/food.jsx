import React from 'react';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { useNavigate } from 'react-router-dom';

const Food = () => {
    const navigate = useNavigate();
    // const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [mealList, setMealList] = useState([]);
    const [localQuery, setLocalQuery] = useState({});


    const handleClick = () => {
        navigate('/');
    };


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
        setLocalQuery(navigate.query);
        clearRouterQuery();
    }, [navigate.query]);

    useEffect(() => {
        const { mealNumber, mealFood } = navigate.query;
        if (mealNumber && mealFood) {
            const updatedMealList = [...mealList];
            const mealIndex = updatedMealList.findIndex((meal) => meal.meal_number === parseInt(mealNumber));
            if (mealIndex !== -1) {
                updatedMealList[mealIndex].food = JSON.parse(mealFood);
                setMealList(updatedMealList);
            }
            setLocalQuery({});
        }
    }, [navigate.query]);

    const clearRouterQuery = () => {
        // const currentPath = navigate.asPath.split('?')[0];
        // console.log("navigate: ", navigate, window.location)
        const currentPath = window.location.origin;
        // navigate('/path', { replace: true })
    };

    const handleAddFoodClick = (mealNumber) => {
        localStorage.setItem('mealList', JSON.stringify(mealList));
        navigate.push(`/choosefood?mealNumber=${mealNumber}&mealFood=[]`);
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
        navigate.push('/dataPage');
    };

    const isValidInput = () => {
        const number = parseInt(inputValue);
        return !isNaN(number) && number > 0;
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-2">
            <main className="px-20 py-10 text-center">
                <h1 className="mb-6 text-4xl font-bold">Enter the meal you prefer per day</h1>
                <div className="mb-7">
                    <label className="mr-2" htmlFor="inputValue">
                        Enter an integer:
                    </label>
                    <input
                        id="inputValue"
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="border border-gray-300 px-2 py-1 rounded-md"
                    />
                </div>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                    onClick={handleConfirm}
                >
                    Confirm
                </button>

                {mealList.map((meal, index) => (
                    <div key={index} className="mb-2">
                        <p className="text-2xl">
                            Meal {meal.meal_number}: {meal.food.join(', ')}
                        </p>
                        <p>
                            The food has entered {JSON.stringify(navigate.query)}
                        </p>
                        <button
                            className="bg-blue-500 text-white ml-4 px-4 py-2 rounded-lg"
                            onClick={() => handleAddFoodClick(meal.meal_number)}
                        >
                            Add Food
                        </button>
                    </div>
                ))}

                {isValidInput() && mealList.length > 0 && (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                )}
            </main>
        </div>
    );
};

export default Food;