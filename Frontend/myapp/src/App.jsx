import React, { useEffect, useState } from "react";
import Homepage from "./page/Homepage";
import { Routes ,Route } from "react-router-dom";
const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/protected", {
      method: "GET",
      credentials: "include", // send JWT cookie automatically
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));

  }, []);

  if (userData) {
    console.log(`userId:${userData?.user.id} ,email:${userData?.user.email}`);
  }
  return (
    <div data-theme='light' className="min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
