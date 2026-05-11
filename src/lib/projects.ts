import { supabase } from "./supabase";


export async function createProject(
  name: string,
  description: string,
  workspaceSlug: string
){
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-");

const { data: workspace } = await supabase
  .from("workspaces")
  .select("*")
  .eq("slug", workspaceSlug)
  .single();

if (!workspace) {
  throw new Error("Workspace not found");
}

  const { data, error } = await supabase
    .from("projects")
    .insert({
      workspace_id: workspace.id,
      name,
      slug,
      description,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    project: data,
    workspaceSlug: workspace.slug,
  };
}