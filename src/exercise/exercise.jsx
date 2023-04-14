import React, { useState } from 'react';
import Button from '@mui/material/Button';


const exercises = ['Sprint', 'Jog', 'Walk', 'Ballgame'];

const Exercise = () => {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showExerciseChoices, setShowExerciseChoices] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [day, setDay] = useState(0); // Initialize day state

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async () => {
        setExerciseList([]);
        setDay(0);

        // Send data to the backend system here
        /*
        await fetch('/api/saveExerciseData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ exercise: selectedExercise, value: inputValue }),
        });
        */
        window.location.href = '/analysis';
    };

    const handleNoExercise = () => {
        setInputValue(0);
        setShowExerciseChoices(false);
        setSelectedExercise(false);
        setExerciseList([]);
    };

    const handleAddDayClick = () => {
        setDay(day + 1);
        setShowExerciseChoices(true);
    };

    const handleAddExercise = () => {
        const exerciseChoice = selectedExercise;
        const timeChoice = parseInt(inputValue);
        setExerciseList([...exerciseList, { day, exercise: exerciseChoice, time: timeChoice }]);
        setSelectedExercise(null);
        setInputValue('');
        setShowExerciseChoices(true);
        setShowDetail(true);
    };

    const RemoveExercise = () => {
        setExerciseList(exerciseList.slice(0, -1));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="px-20 py-10 text-center">
                <h1 className="mb-6 text-4xl font-bold">Exercise</h1>
                <div className="mb-2">
                    <Button
                        variant="contained"
                        color="success"
                        className="bg-blue-500 text-white m-2 px-4 py-2 rounded-lg"
                        onClick={handleAddDayClick}
                    >
                        Add a day
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        className="bg-red-500 text-white m-2 px-4 py-2 rounded-lg"
                        onClick={handleNoExercise}
                    >
                        Nah, I hate sports
                    </Button>
                </div>

                {showExerciseChoices && (
                    <div className="mb-6">
                        {exercises.map((exercise) => (
                            <Button
                                variant="contained"
                                color="success"
                                key={exercise}
                                className={`${selectedExercise === exercise ? 'bg-blue-500' : ''
                                    } m-2 px-4 py-2 rounded-lg`}
                                onClick={() => handleExerciseClick(exercise)}
                            >
                                {exercise}
                            </Button>
                        ))}
                    </div>
                )}
                {selectedExercise && (
                    <div className="mb-7">
                        <label className="mr-2" htmlFor="inputValue">
                            Enter the time period on this sport:
                        </label>
                        <input
                            id="inputValue"
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                        <Button
                            variant="contained"
                            color="success"
                            className="bg-blue-500 text-white m-2 px-4 py-2 rounded-lg"
                            onClick={() => handleAddExercise()}
                        >
                            Add
                        </Button>
                    </div>
                )}

                {exerciseList.map((entry, index) => (
                    <div key={index}>
                        <p key={index} className="text-2xl">
                            At day {entry.day}, Doing {entry.exercise} for {entry.time} minutes
                        </p>

                        <button
                            className="bg-red-500 text-white m-2 px-4 py-2 rounded-lg"
                            onClick={() => RemoveExercise()}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <br />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleSubmit}
                >
                    Submit

                </button>
            </main>
        </div>
    );
};

export default Exercise;