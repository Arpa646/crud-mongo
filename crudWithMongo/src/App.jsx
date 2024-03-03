import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(true);
  

  console.log(userData);



  const handleSubmit = (event) => {
    event.preventDefault();
    setReload(!reload);
    console.log(reload);
    console.log(name, email, age);
    const data = { name, email, age };
    
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setReload(!reload)

        // Handle success (if needed)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (if needed)
      });

    // You can perform additional actions (e.g., send data to the server) here
  };





 

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success (if needed)
        // After successful deletion, refetch updated data
        const remaindata=userData.filter(user=>user._id !==id)
        setUserData(remaindata)
      })
      .catch((error) => {
        console.error("Error:", error);
        fetchData();
        // Handle error (if needed)
      });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`);
      if (response.ok) {
        const userData = await response.json();
        setSelectedUserData(userData);
        // Open your update form here
        // You might use a modal or navigate to an update page with the selected user's details
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Inside your update form component


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/user"); // Assuming this endpoint returns the user data
      const data = await response.json();
      console.log(data);
      setUserData(data); // Assuming the response has a "data" property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [reload]);

  return (
    <>
      <h1 className="text-5xl font-bold ms-6  text-center ">
        Crud OPeration with Mongo
      </h1>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {userData.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <button onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdate(user._id)}>
                      update
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  className="input input-bordered"
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="age"
                  placeholder="age"
                  className="input input-bordered"
                  onChange={(event) => setAge(event.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
