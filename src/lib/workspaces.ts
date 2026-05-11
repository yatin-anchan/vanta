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