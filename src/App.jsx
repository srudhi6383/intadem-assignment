import React, { useState, useEffect } from "react";
import MapComponent from "./Component/Map";
import Sidebar from "./Component/Sidebar";

const App = () => {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);


  useEffect(() => {
    const storedPins = JSON.parse(localStorage.getItem("pins")) || [];
    setPins(storedPins);
  }, []);


  useEffect(() => {
    localStorage.setItem("pins", JSON.stringify(pins));
  }, [pins]);

  const handlePinSubmit = (newPin) => {
    console.log(newPin);
   
    setPins((prevPins) => [...prevPins, newPin]);
    
  };

  const handlePinClick = (index) => {
  
    setSelectedPin(index);
  };

  const handlePinDelete = (index) => {
    const newPins = pins.filter((_, i) => i !== index);
    setPins(newPins);
    if (selectedPin === index) {
      setSelectedPin(null);
    }
  };

  const handlePinEdit = (index, newRemark) => {
    const newPins = pins.map((pin, i) =>
      i === index ? { ...pin, remark: newRemark } : pin
    );
    setPins(newPins);
  };

  return (
    <div className="app flex">
      <Sidebar
        pins={pins}
        onPinClick={handlePinClick}
        onPinDelete={handlePinDelete}
        onPinEdit={handlePinEdit}
      />
      <MapComponent
        pins={pins}
        selectedPin={selectedPin}
        onPinSubmit={handlePinSubmit}
        onPinSelect={setSelectedPin}
      />
    </div>
  );
};

export default App;