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
handle,
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

function generateWorldHandle(
  name: string,
  fullName: string,
  customCode: string
) {
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-");

  const initials = fullName
    .split(" ")
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("")
    .slice(0, 2);

  return `${slug}-${initials}-${customCode}`;
}

export async function createWorld(
  name: string,
  customCode: string
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

const fullName =
  user.user_metadata.full_name ||
  "Unknown User";

const handle =
  generateWorldHandle(
    name,
    fullName,
    customCode
      .toUpperCase()
  );

  const { data: existing } = await supabase
  .from("workspaces")
  .select("id")
  .eq("handle", handle)
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
  handle,
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