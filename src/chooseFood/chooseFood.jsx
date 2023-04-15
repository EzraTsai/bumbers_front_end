import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ChooseFood = () => {
    const navigate = useNavigate();
    const { mealNumber, mealFood } = useParams();
    // const { mealNumber, mealFood } = navigate.query;
    const [searchInput, setSearchInput] = useState();
    const [foodOutput, setFoodOutput] = useState();
    const [foodCount, setFoodCount] = useState();
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [result, setResult] = useState();


    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleFoodCountChange = (event) => {
        setFoodCount(event.target.value);
    };

    const handleSubmit = () => {
        const selectedFoodsString = selectedFoods.join(', ');
        navigate(`/choosemeal?mealNumber=${mealNumber}&mealFood=${selectedFoodsString}`);
    };

    const handleSearchClick = async () => {
        const response = await fetch('/api/searchFood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchInput }),
        });

        setResult('success');

        if (result === 'success') {
            setFoodOutput(searchInput);
        } else if (result === 'fail') {
            setFoodOutput('The food is not exist in food database!');
        }
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
        <div className="flex flex-col items-center justify-start min-h-screen py-2">
            <main className="px-20 py-10 text-center">
                <h1 className="mb-6 text-4xl font-bold">Choose Food for Meal {mealNumber}</h1>
                <div className="mb-7">
                    <label htmlFor="searchInput">Search Food:</label>
                    <input
                        type="text"
                        id="searchInput"
                        value={searchInput}
                        onChange={handleInputChange}
                        className="border border-gray-300 px-2 py-1 rounded-md"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>
                <div className="mb-7">
                    <label htmlFor="food_output">The food you entered </label>
                    <p id="food_output" className="border border-gray-300 px-2 py-1 rounded-md inline-block">
                        {foodOutput}
                    </p>
                </div>
                {isValidFood() && (
                    <div className="mb-7">
                        <label htmlFor="food_count">Food Count:</label>
                        <input
                            type="number"
                            id="food_count"
                            value={foodCount}
                            onChange={handleFoodCountChange}
                            className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                        {isValidFoodCount() && (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleAddClick}
                            >
                                Add
                            </button>
                        )}
                    </div>
                )}
                <div className="mb-7">
                    <h2 className="text-2xl font-bold mb-2">Selected Foods:</h2>
                    <ul>
                        {selectedFoods.map((food, index) => (
                            <li key={index}>{food}</li>
                        ))}
                    </ul>
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleSubmit}
                >
                    Confirm
                </button>
            </main>
        </div>
    );
};

export default ChooseFood;