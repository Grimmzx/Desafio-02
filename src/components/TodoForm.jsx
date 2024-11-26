import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Title:", title); 
    console.log("Artist:", artist); 

    if (!title || !artist) return; 
    await addTodo(title, artist); 
    setTitle("");  
    setArtist(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <input
        type="text"
        className="form-control"
        placeholder="Titulo de una canción"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Artista"
        value={artist}
        onChange={(e) => setArtist(e.target.value)} 
      />
      <div className="d-grid mt-3">
        <button className="btn btn-primary" type="submit">
          Agregar
        </button>
      </div>
    </form>
  );
};

export default TodoForm;