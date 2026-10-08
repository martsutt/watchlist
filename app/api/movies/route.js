import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export async function GET() {
  const { data, error } = await supabase
    .from("item")
    .select("*")
    .order("title");

  if (error) {
    return Response.json({ error: "Could not load movies." }, { status: 500 });
  }

  return Response.json(data);
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

    const { data, error } = await supabase
      .from("item")
      .insert({ title, genre, watched, year })
      .select()
      .single();

    if (error) {
      return Response.json({ error: "Could not save movie." }, { status: 500 });
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
}