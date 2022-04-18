import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [rollnumber, setRollnumber] = useState(0);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeRollnumber = (e) => {
    setRollnumber(e.target.value);
  };

  const handleSubmit = (e) => {
    const user = {
      userName: username,
      rollNumber: rollnumber,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/add`, user)
      .then((res) => console.log(res.data));

    alert("User created successfully..");
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label>Roll Number: </label>
          <input
            type="number"
            required
            className="form-control"
            value={rollnumber}
            onChange={onChangeRollnumber}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
