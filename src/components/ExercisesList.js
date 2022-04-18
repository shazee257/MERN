import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import Exercise from "./Exercise";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/exercises/`)
      .then((res) => setExercises(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/exercises/` + id)
      .then((res) => console.log(res.data));

    setExercises(exercises.filter((e) => e._id !== id));
  };

  const exerciseList = exercises.map((exercise) => {
    return (
      <Exercise
        exercise={exercise}
        deleteExercise={deleteExercise}
        key={exercise._id}
      />
    );
  });

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
