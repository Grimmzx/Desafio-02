import React, { useState, useEffect } from "react";
import { Todos } from "./components/Todos";
import TodoForm from "./components/TodoForm";
import './App.css'

const App = () => {
  const [canciones, setCanciones] = useState([]);
  const [editSong, setEditSong] = useState(null); 


  const getCanciones = async () => {
    const response = await fetch("http://localhost:5000/canciones");
    const canciones = await response.json();
    setCanciones(canciones);
  };

  useEffect(() => {
    getCanciones();
  }, []);


  const addCancion = async (title, artist) => {
    const response = await fetch("http://localhost:5000/canciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, artist }), 
    });
    const nuevaCancion = await response.json();
    setCanciones([...canciones, nuevaCancion]); 
  };


  const removeCancion = async (id) => {
    const response = await fetch(`http://localhost:5000/canciones/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      return alert("Algo salió mal");
    }
    setCanciones(canciones.filter((c) => c.id !== id)); 
  };


  const editCancion = (id) => {
    const songToEdit = canciones.find((cancion) => cancion.id === id);
    setEditSong(songToEdit); 
  };


  const saveEditCancion = async (id, title, artist) => {
    const response = await fetch(`http://localhost:5000/canciones/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, artist }), 
    });
    const updatedSong = await response.json();
    setCanciones(canciones.map((c) => (c.id === id ? updatedSong : c))); 
    setEditSong(null); 
  };

  return (
    <div className="container">
      <h1>Mi Repertorio</h1>

 
      {editSong ? (
        <div>
          <h2>Edit Song</h2>
          <input
            type="text"
            value={editSong.title}
            onChange={(e) => setEditSong({ ...editSong, title: e.target.value })}
            placeholder="Edit song title"
          />
          <input
            type="text"
            value={editSong.artist}
            onChange={(e) => setEditSong({ ...editSong, artist: e.target.value })}
            placeholder="Edit artist"
          />
          <button onClick={() => saveEditCancion(editSong.id, editSong.title, editSong.artist)}>
            Save Changes
          </button>
          <button onClick={() => setEditSong(null)}>Cancel</button>
        </div>
      ) : (
        <TodoForm addTodo={addCancion} />
      )}

      <Todos
        todos={canciones}
        removeTodo={removeCancion}
        updateTodo={editCancion} 
      />
    </div>
  );
};

export default App;
