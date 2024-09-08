import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AddNote from "./AddNote";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function UserProfile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState();
  const [notetoedit, setNotetoedit] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    const fetchuser = async () => {
      const response = await fetch(`https://practice-umber-xi.vercel.app/auth/userprofile`, {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUser(data);
    };
    fetchuser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getnotes = async () => {
    const response = await fetch("https://practice-umber-xi.vercel.app/notes/getnotes", {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setNotes(data.notes);
  };

  const handleedit = async (id) => {
    const note = await fetch(`https://practice-umber-xi.vercel.app/notes/getnote/${id}`, {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data = await note.json();
    console.log(data);
    setNotetoedit(data);
  };

  const handlechange = (e) => {
    setNotetoedit({ ...notetoedit, [e.target.name]: e.target.value });
  };

  const handleupdate = async (id) => {
    const response = await fetch(`https://practice-umber-xi.vercel.app/notes/editnote/${id}`, {
      method: "PUT",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notetoedit),
    });

    const data = await response.json();
  };

  const handledelete = async (id) => {
    await fetch(
      `https://practice-umber-xi.vercel.app/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );
  };
  return (
    <div>
      Name of user is {user && user.name} <br />
      Email of user is {user && user.email}
      <button onClick={handleLogout}>Logout</button>
      <AddNote />
      <div onClick={getnotes}>Get notes</div>
      {/* map notes */}
      <div>
        <div style={{ display: "flex" }}>
          {notes &&
            notes.map((note) => (
              <div
                key={note._id}
                style={{
                  border: "1px solid black",
                  margin: "20px",
                  padding: "25px",
                  width: "30%",
                }}
              >
                <div style={{ padding: "5px" }}> {note.title} </div>
                <div style={{ padding: "5px" }}> {note.description} </div>
                {/* call handleedit fucntion on click with giving note._id as parameter */}
                <FaRegEdit
                  style={{ padding: "5px" }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleedit(note._id)}
                />
                <MdDelete
                  style={{ padding: "5px" }}
                  onClick={() => handledelete(note._id)}
                />
              </div>
            ))}
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit note{" "}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={notetoedit.title}
                  onChange={handlechange}
                />
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  value={notetoedit.description}
                  onChange={handlechange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleupdate(notetoedit._id)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
