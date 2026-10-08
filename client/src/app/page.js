"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  Box,
  Alert,
} from "@mui/material";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("Could not load movies.");
        setMovies(await res.json());
      } catch (err) {
        setError(err.message);
      }
    }

    loadMovies();
  }, []);

  function resetForm() {
    setTitle("");
    setGenre("");
    setYear("");
    setEditId(null);
  }

  async function saveMovie() {
    if (!title.trim() || !genre.trim() || !year) return;
    setError("");

    const body = {
      title: title.trim(),
      genre: genre.trim(),
      year: Number(year),
    };

    try {
      const res = await fetch(
        editId !== null ? `/api/movies/${editId}` : "/api/movies",
        {
          method: editId !== null ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      if (editId !== null) {
        setMovies(movies.map((m) => (m.id === editId ? data : m)));
      } else {
        setMovies([...movies, data]);
      }
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  }

  function editMovie(movie) {
    setTitle(movie.title);
    setGenre(movie.genre);
    setYear(String(movie.year ?? ""));
    setEditId(movie.id);
  }

  async function deleteMovie(id) {
    setError("");
    try {
      const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete movie.");

      setMovies(movies.filter((m) => m.id !== id));
      if (editId === id) resetForm();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleWatched(movie) {
    setError("");
    try {
      const res = await fetch(`/api/movies/${movie.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watched: !movie.watched }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update movie.");

      setMovies(movies.map((m) => (m.id === movie.id ? data : m)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4">🎬 Watchlist</Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

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

      {movies.map((movie) => (
        <Box
          key={movie.id}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          <Checkbox
            checked={movie.watched}
            onChange={() => toggleWatched(movie)}
          />

          <Typography
            sx={{
              flexGrow: 1,
              textDecoration: movie.watched ? "line-through" : "none",
            }}
          >
            {movie.title} ({movie.year}) - {movie.genre}
          </Typography>

          <Button size="small" onClick={() => editMovie(movie)}>
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => deleteMovie(movie.id)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Container>
  );
}