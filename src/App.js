import "./App.css";
import Table from "./UIComponents/Table/Table";
import { useState, useEffect } from "react";

import { connect } from "react-redux";

function App(props) {

  const initformData = {};
  const initialRows = [];

  const [formData, setFormData] = useState(initformData);

  const [users, setUsers] = useState(initialRows);

  const cols = [
    {
      label: "Name",
      coloumnName: "name",
      filter: {
        type: "text",
      },
    },
    {
      label: "Home Address",
      coloumnName: "address",
      filter: {
        type: "text",
      },
    },
    {
      label: "Phone",
      coloumnName: "phone",
      filter: {
        type: "text",
      },
    },
    {
      label: "Email",
      coloumnName: "email",
      filter: {
        type: "text",
      },
    },
  ];

  useEffect(() => {
    setUsers(props.users)
  }, [formData]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    let newUsers = [...props.users];

    if (!formData.id) {
      newUsers.push({
        ...formData,
        id: new Date().getTime(),
      });
    } else {
      newUsers = newUsers.map((user) => {
        if (user.id === formData.id) {
          return formData;
        } else {
          return user;
        }
      });
    }

    props.SetUser(newUsers);

    let newData = { ...formData };

    newData["name"] = "";
    newData["phone"] = "";

    newData["email"] = "";

    newData["address"] = "";

    newData["id"] = "";

    setFormData(newData);
  };

  const onChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;

    let newFormData = { ...formData };

    newFormData[key] = value;
    setFormData(newFormData);
  };

  const onEdit = (row) => {
    setFormData(row);
  };

  const onDelete = (row) => {
    let newUsers = props.users.filter((user) => {
      return user.id !== row.id;
    });

    props.SetUser(newUsers);
    setUsers(newUsers)
  };

  const onFilter = (key,val) => {


    let newUsers = [...props.users]

    newUsers = newUsers.filter((user)=>{
    return  user[key].includes(val)
    })

    setUsers(newUsers)

  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <input
            name="name"
            value={formData.name}
            type="text"
            onChange={(evt) => onChange(evt)}
            className="form-control"
            placeholder="Enter Name"
          />
        </div>

        <div class="form-group">
          <input
            name="email"
            value={formData.email}
            type="email"
            onChange={(evt) => onChange(evt)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <input
            name="phone"
            value={formData.phone}
            type="number"
            onChange={(evt) => onChange(evt)}
            className="form-control"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="form-group">
          <textarea
            name="address"
            value={formData.address}
            onChange={(evt) => onChange(evt)}
            className="form-control"
            placeholder="Enter Home Address"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
      <Table
        onDelete={onDelete}
        onEdit={onEdit}
        onFilter = {onFilter}
        rows={users}
        cols={cols}
      ></Table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.app.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (data) => dispatch({ type: "SET_USERS", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
