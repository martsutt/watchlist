
"use client";

import { useState } from "react";
import { Container, Typography, TextField, Button, Checkbox, Box } from "@mui/material";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [editId, setEditId] = useState(null);

  function saveMovie() {
    if (!title.trim() || !genre.trim() || !year) return;

    if (editId !== null) {
      setMovies(movies.map(movie =>
        movie.id === editId
          ? { ...movie, title: title.trim(), genre: genre.trim(), year: Number(year) }
          : movie
      ));
      setEditId(null);
    } else {
      setMovies([...movies, {
        id: crypto.randomUUID(),
        title: title.trim(),
        genre: genre.trim(),
        year: Number(year),
        watched: false
      }]);
    }

    setTitle("");
    setGenre("");
    setYear("");
  }

  function editMovie(movie) {
    setTitle(movie.title);
    setGenre(movie.genre);
    setYear(String(movie.year));
    setEditId(movie.id);
  }

  function deleteMovie(id) {
    setMovies(movies.filter(movie => movie.id !== id));

    if (editId === id) {
      setEditId(null);
      setTitle("");
      setGenre("");
      setYear("");
    }
  }

  function toggleWatched(id) {
    setMovies(movies.map(movie =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ));
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4">🎬 Watchlist</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, my: 3 }}>
        <TextField
          label="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <Button variant="contained" onClick={saveMovie}>
          {editId !== null ? "Save" : "Add"}
        </Button>
      </Box>

      {movies.map(movie => (
        <Box
          key={movie.id}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <Checkbox
            checked={movie.watched}
            onChange={() => toggleWatched(movie.id)}
          />

          <Typography
            sx={{
              flexGrow: 1,
              textDecoration: movie.watched ? "line-through" : "none"
            }}
          >
            {movie.title} ({movie.year}) - {movie.genre}
          </Typography>

          <Button size="small" onClick={() => editMovie(movie)}>
            Edit
          </Button>

          <Button size="small" color="error" onClick={() => deleteMovie(movie.id)}>
            Delete
          </Button>
        </Box>
      ))}
    </Container>
  );
}
