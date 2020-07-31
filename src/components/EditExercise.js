import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EditExercise = (props) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:3000/exercises/" + props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setUserId(res.data.user._id);
        setUsername(res.data.user.userName);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        //setDate(res.data.date);
      });

    axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
  }, []);

  const onSelect = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setUserId(e.target.options[selectedIndex].getAttribute("data-key"));
    setUsername(e.target.options[selectedIndex].getAttribute("value"));
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exercise = { user: userId, description, duration, date };
    console.log(exercise);

    // TO WORK

    // axios
    //   .post("http://localhost:3000/exercises/add", exercise)
    //   .then((res) => console.log(res.data));
    //window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select required className="form-control" onChange={onSelect}>
            {users.map((user) => {
              return (
                <option
                  key={user._id}
                  data-key={user._id}
                  value={user.userName}
                >
                  {user.userName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
