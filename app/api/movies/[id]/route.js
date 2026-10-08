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