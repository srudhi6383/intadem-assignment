import React, { useState } from "react";

const Sidebar = ({ pins, onPinClick, onPinDelete, onPinEdit }) => {
  const [editingPin, setEditingPin] = useState(null);
  const [editedRemark, setEditedRemark] = useState("");

  const handleEditClick = (index, remark) => {
    setEditingPin(index);
    setEditedRemark(remark);
  };

  const handleSaveEdit = (index) => {
    onPinEdit(index, editedRemark);
    setEditingPin(null);
    setEditedRemark("");
  };

  const extractCityAndStreet = (address) => {
    const parts = address.split(",");
    const street = parts[0] ? parts[0].trim() : "";
    const street1 = parts[1] ? parts[1].trim() : "";
    const place = parts[2] ? parts[2].trim() : "";
    const city = parts[5] ? parts[5].trim() : "";
    const part9 = parts[9] ? parts[9].trim() : "";
    return `${street}, ${street1}, ${place}, ${city} ${part9}`;
  };

  return (
    <div className="w-1/5 bg-white h-screen overflow-y-auto relative no-scrollbar">
      <div className="ml-3 my-3 text-3xl font-extrabold flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-red-800">Saved Pins</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="blue"
            className="h-8 w-8 mr-7 mb-7"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </div>
      </div>
      <ul>
        {pins.map((pin, index) => (
          <li key={index} className="relative mb-4 border-b border-gray-500 pb-2">
            <div>
              <p
                className="mt-4 ml-3 text-slate-900 cursor-pointer"
                onClick={() => onPinClick(index)}
              >
                <b className="text-black-500">Remark:</b>{" "}
                <span className="text-blue-600">{pin.remark}</span>
              </p>
              <p
                className="ml-3 text-slate-900 mr-3 cursor-pointer text-sm"
                onClick={() => onPinClick(index)}
              >
                <b className="text-black-500">Latitude:</b>{" "}
                <span className="text-blue-600">{pin.lat}</span>
              </p>
              <p
                className="ml-3 text-slate-900 mr-3 cursor-pointer text-sm"
                onClick={() => onPinClick(index)}
              >
                <b className="text-black-500">Longitude:</b>{" "}
                <span className="text-blue-600">{pin.lng}</span>
              </p>
              <p
                className="ml-3 text-slate-900 mr-3 cursor-pointer text-sm"
                onClick={() => onPinClick(index)}
              >
                <b className="text-black-500">Address:</b>{" "}
                <span className="text-blue-900">
                  {extractCityAndStreet(pin.address)}
                </span>
              </p>
            </div>

            {editingPin === index ? (
              <div className="ml-3 mt-2">
                <textarea
                  value={editedRemark}
                  onChange={(e) => setEditedRemark(e.target.value)}
                  className="w-full h-12 p-2 border border-gray-400 rounded-md"
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md mt-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex space-x-2 mt-2 ml-3">
                <button
                  className="bg-blue-500 text-gray-900 px-2 py-1 rounded-lg"
                  onClick={() => handleEditClick(index, pin.remark)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-gray px-2 py-1 rounded-lg"
                  onClick={() => onPinDelete(index)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
