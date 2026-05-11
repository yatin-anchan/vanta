import { supabase } from "./supabase";

export async function getDashboardProjects() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      name,
      slug,
      workspace_id,
      workspaces (
        slug,
        name
      )
    `);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}