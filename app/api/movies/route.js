let movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    watched: true,
    year: 2014,
  },
];

export function GET() {
  return Response.json(movies);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const title = body.title?.trim();
    const genre = body.genre?.trim();

    const year =
      body.year === "" || body.year === undefined || body.year === null
        ? null
        : Number(body.year);

    const watched = Boolean(body.watched);

    if (!title || !genre) {
      return Response.json(
        { error: "Title and genre are required." },
        { status: 400 },
      );
    }

    if (year !== null && !Number.isInteger(year)) {
      return Response.json(
        { error: "Year must be a valid integer." },
        { status: 400 },
      );
    }

    const newMovie = {
      id: Date.now(),
      title,
      genre,
      watched,
      year,
    };

    movies.push(newMovie);

    return Response.json(newMovie, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
}
