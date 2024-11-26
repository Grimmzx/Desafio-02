import express from "express";
import { writeFile, readFile } from "node:fs/promises";
import bodyParser from "body-parser";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();


app.use(bodyParser.json());
app.use(cors());

const FILE_PATH = "repertorio.json";


const getRepertorio = async () => {
  const data = await readFile(FILE_PATH, "utf-8");
  return JSON.parse(data);
};

app.get("/canciones", async (req, res) => {
  try {
    const repertorio = await getRepertorio();
    res.json(repertorio);
  } catch (error) {
    res.status(500).json({ error: "Error al leer el repertorio" });
  }
});

app.post("/canciones", async (req, res) => {
  const { title, artist } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ error: "El título y el artista son obligatorios" });
  }

  const nuevaCancion = { id: nanoid(), title, artist };

  try {
    const repertorio = await getRepertorio();
    repertorio.push(nuevaCancion);
    await writeFile(FILE_PATH, JSON.stringify(repertorio, null, 2));
    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la canción" });
  }
});


app.put("/canciones/:id", async (req, res) => {
  const { id } = req.params;
  const { title, artist } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ error: "El título y el artista son obligatorios" });
  }

  try {
    const repertorio = await getRepertorio();
    const index = repertorio.findIndex((cancion) => cancion.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }


    repertorio[index] = { id, title, artist };
    await writeFile(FILE_PATH, JSON.stringify(repertorio, null, 2)); 
    res.json(repertorio[index]); 
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la canción" });
  }
});


app.delete("/canciones/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const repertorio = await getRepertorio();
    const nuevoRepertorio = repertorio.filter((cancion) => cancion.id !== id);

    if (nuevoRepertorio.length === repertorio.length) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    await writeFile(FILE_PATH, JSON.stringify(nuevoRepertorio, null, 2)); 
    res.json({ message: "Canción eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la canción" });
  }
});


app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
