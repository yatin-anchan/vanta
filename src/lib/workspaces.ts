import { supabase } from "./supabase";

export async function getUserWorkspaces() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("workspace_members")
    .select(`
      role,
      workspaces (
        id,
        name,
        slug,
        type
      )
    `)
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}


export async function createWorld(
  name: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-");

  const { data: existing } = await supabase
    .from("workspaces")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    throw new Error(
      "World already exists"
    );
  }

  const { data: world, error } = await supabase
    .from("workspaces")
    .insert({
      owner_id: user.id,
      name,
      slug,
      type: "world",
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  await supabase
    .from("workspace_members")
    .insert({
      workspace_id: world.id,
      user_id: user.id,
      role: "owner",
    });

  return world;
}