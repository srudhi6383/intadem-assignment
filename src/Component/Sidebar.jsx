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

  return (
    <div className="w-1/5 bg-white h-screen overflow-y-auto">
      <h2 className="p-4 font-bold text-lg">Saved Pins</h2>
      <ul>
        {pins.length > 0 ? (
          pins.map((pin, index) => (
            <li key={index} className="mb-4 p-2 border-b">
              <div onClick={() => onPinClick(index)} className="cursor-pointer">
                <p><strong>Remark:</strong> {pin.remark}</p>
                <p><strong>Address:</strong> {pin.address}</p>
              </div>
              {editingPin === index ? (
                <div className="flex space-x-2 mt-2">
                  <textarea
                    value={editedRemark}
                    onChange={(e) => setEditedRemark(e.target.value)}
                    className="w-full h-12 p-2 border border-gray-400 rounded-md"
                  />
                  <button
                    onClick={() => handleSaveEdit(index)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                    onClick={() => handleEditClick(index, pin.remark)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    onClick={() => onPinDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No pins saved yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
