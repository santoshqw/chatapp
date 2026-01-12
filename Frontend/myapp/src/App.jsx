import React, { useEffect, useState } from "react";

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch protected route when component mounts
    fetch("http://localhost:3000/api/protected", {
      method: "GET",
      credentials: "include", // sends JWT cookie automatically
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data); // store response to display
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5 bg-red-200 text-white min-h-screen">
      <h1 className="text-2xl mb-4">App</h1>

      {userData ? (
        <div>
          <p>Message: {userData.message}</p>
          <p>User ID: {userData.user.id}</p>
          <p>Email: {userData.user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default App;
