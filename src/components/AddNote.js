import React, { useState } from "react";

function AddNote() {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleclick = async () => {
    const response = await fetch("https://practice-umber-xi.vercel.app/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });

    const data = await response.json();

    console.log(data);
    console.log(data.data.title)
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter note title"
        name="title"
        onChange={handlechange}
      />
      <textarea
        placeholder="Description"
        name="description"
        onChange={handlechange}
      />
      <div onClick={handleclick}>Add note</div>
    </div>
  );
}

export default AddNote;
