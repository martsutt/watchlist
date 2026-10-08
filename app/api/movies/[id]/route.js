import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export async function DELETE(request, { params }) {
    const { id } = await params;

    const { data, error } = await supabase
        .from("item")
        .delete()
        .eq("id", id)
        .select();

    if (error) {
        return Response.json({ error: "Could not delete movie." }, { status: 500 });
    }

    if (data.length === 0) {
        return Response.json({ error: "Movie not found." }, { status: 404 });
    }

    return new Response(null, { status: 204 });
}

export async function PATCH(request, { params }) {
    const { id } = await params;

    try {
        const body = await request.json();
        const updates = {};

        if (body.title !== undefined) {
            const title = String(body.title).trim();
            if (!title) {
                return Response.json({ error: "Title cannot be empty." }, { status: 400 });
            }
            updates.title = title;
        }

        if (body.genre !== undefined) {
            const genre = String(body.genre).trim();
            if (!genre) {
                return Response.json({ error: "Genre cannot be empty." }, { status: 400 });
            }
            updates.genre = genre;
        }

        if (body.year !== undefined) {
            const year =
                body.year === null || body.year === "" ? null : Number(body.year);
            if (year !== null && !Number.isInteger(year)) {
                return Response.json(
                    { error: "Year must be a valid integer." },
                    { status: 400 },
                );
            }
            updates.year = year;
        }

        if (body.watched !== undefined) {
            updates.watched = Boolean(body.watched);
        }

        if (Object.keys(updates).length === 0) {
            return Response.json({ error: "Nothing to update." }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("item")
            .update(updates)
            .eq("id", id)
            .select();

        if (error) {
            return Response.json({ error: "Could not update movie." }, { status: 500 });
        }

        if (data.length === 0) {
            return Response.json({ error: "Movie not found." }, { status: 404 });
        }

        return Response.json(data[0]);
    } catch (error) {
        return Response.json({ error: "Invalid request body." }, { status: 400 });
    }
}