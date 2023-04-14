import React, { useState } from 'react';
import Button from '@mui/material/Button';
import bPlogo from '../bplogo.png'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';



const exercises = ['Sprint', 'Jog', 'Walk', 'Ballgame'];

const Exercise = () => {
    const navigate = useNavigate();

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
        navigate('/analysis');
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
                <div className="App" style={{ marginTop: '100px' }}>
                    <img src={bPlogo} className="App-logo" alt="logo"></img>
                    <h1 className="mb-6 text-4xl font-bold" style={{ display: "flex", justifyContent: "center" }}>
                        Exercise
                    </h1>
                </div>
                <div className="mb-2" style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="success"
                        className="bg-blue-500 text-white m-2 px-4 py-2 rounded-lg"
                        style={{ margin: "10px" }}
                        onClick={handleAddDayClick}
                    >
                        Add a day
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        className="bg-red-500 text-white m-2 px-4 py-2 rounded-lg"
                        style={{ margin: "10px" }}
                        onClick={handleNoExercise}
                    >
                        Nah, I hate sports
                    </Button>
                </div>

                {showExerciseChoices && (
                    <div className="mb-6" style={{ display: "flex", justifyContent: "center" }}>
                        {exercises.map((exercise) => (
                            <Button
                                variant="contained"
                                color="success"
                                style={{ margin: "5px" }}
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
                    <div className="mb-7" style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                        <label className="mr-2" htmlFor="inputValue" style={{ paddingTop: "10px" }}>
                            Enter the time period on this sport:
                        </label>
                        <input
                            id="inputValue"
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded-md"
                            style={{ width: "50px", margin: "0px 10px" }}
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
                    <div key={index} style={{ display: "flex", justifyContent: "center" }}>
                        <p key={index} className="text-2xl" style={{ marginTop: "10px" }}>
                            At day {entry.day}, Doing {entry.exercise} for {entry.time} minutes
                        </p>
                        <div style={{ marginRight: "10px" }}>
                            <IconButton aria-label="delete" onClick={() => RemoveExercise()}>
                                <DeleteIcon color="secondary" />
                            </IconButton>

                        </div>
                    </div>
                ))}

                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </main>
        </div >
    );
};

export default Exercise;