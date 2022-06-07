import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse"
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px"
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #2d2d2d",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px"
    },
    inputs: {
      marginBottom: "5px",
      display: "block"
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "pink",
      fontSize: "14px",
      borderRadius: "5px",
      color: "#fff"
    },
    deleteBtn: {
      marginTop: "10px",
      marginLeft: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "pink",
      fontSize: "14px",
      borderRadius: "5px",
      color: "#fff"
    }
  }
};

const CharacterBookForm = (props) => {
  // State
  const initState = {
    id: null,
    charName: "Character Name",
    charCountry: "Country of Base",
    charVision: "Vision",
    charBirthday: "Birthday"
  };
  const [userData, setUserData] = useState(initState);

  // Change Handler
  const userChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !userData.charName ||
      !userData.charCountry ||
      !userData.charVision ||
      !userData.charBirthday
    )
      return;
    props.addUserItem(userData);
    setUserData(initState);
  };

  //delete Handler
  return (
    <form onSubmit={submitHandler} style={style.form.container}>
      <label>Genshin Character </label>
      <br />

      <input
        style={style.form.inputs}
        className="charName"
        name="charName"
        type="text"
        value={userData.charName}
        onChange={userChangeHandler}
      />
      <input
        style={style.form.inputs}
        className="charCountry"
        name="charCountry"
        type="text"
        value={userData.charCountry}
        onChange={userChangeHandler}
      />
      <input
        style={style.form.inputs}
        className="charVision"
        name="charVision"
        type="text"
        value={userData.charVision}
        onChange={userChangeHandler}
      />
      <input
        style={style.form.inputs}
        className="charBirthday"
        name="charBirthday"
        type="text"
        value={userData.charBirthday}
        onChange={userChangeHandler}
      />

      {/* Submit Button */}
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add"
      />
      {/* Delete Button */}
      <input
        style={style.form.deleteBtn}
        className="deleteButton"
        type="submit"
        value="Delete"
      />
    </form>
  );
};

const InformationTable = (props) => {
  const sortedUsers = props.users.sort((a, b) =>
    a.charCountry.localeCompare(b.charCountry)
  );
  const display =
    sortedUsers.length > 0 ? (
      sortedUsers.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.charName}</td>
          <td style={style.tableCell}>{user.charCountry}</td>
          <td style={style.tableCell}>{user.charVision}</td>
          <td style={style.tableCell}>{user.charBirthday}</td>
        </tr>
      ))
    ) : (
      <tr clospan={4}>&nbsp;</tr>
    );

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>Character Name</th>
          <th style={style.tableCell}>Country of Base</th>
          <th style={style.tableCell}>Vision</th>
          <th style={style.tableCell}>Birthday</th>
        </tr>
      </thead>
      <tbody>{display}</tbody>
    </table>
  );
};

const App = (props) => {
  const usersListObjc = [];
  const [users, setUsers] = useState(usersListObjc);

  const addUserItem = (user) => {
    console.log("user", users.length);
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  const removeUserItem = (user) => {
    console.log("user", users.length);
    user.id = users.length - 1;
    setUsers([...users, user]);
  };
  return (
    <section>
      <CharacterBookForm addUserItem={addUserItem} />
      <hr />
      <InformationTable users={users} />
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
