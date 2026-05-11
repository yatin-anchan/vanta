import { supabase } from "./supabase";


async function ensureRealm(
  userId: string,
  username: string
) {
  const { data: existingRealm } = await supabase
    .from("workspaces")
    .select("*")
    .eq("owner_id", userId)
    .eq("type", "realm")
    .single();

  if (existingRealm) return existingRealm;

  const { data: realm, error } = await supabase
    .from("workspaces")
    .insert({
      owner_id: userId,
      name: `${username}'s Realm`,
      slug: username,
      type: "realm",
    })
    .select()
    .single();

  if (error) {
    console.error("REALM ERROR:", error);
    return null;
  }

  await supabase
    .from("workspace_members")
    .insert({
      workspace_id: realm.id,
      user_id: userId,
      role: "owner",
    });

  return realm;
}

export async function ensureProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (existingProfile) {
  await ensureRealm(
    user.id,
    existingProfile.username
  );

  return existingProfile;
}

  const username =
    user.user_metadata.user_name ||
    user.email?.split("@")[0];

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      username,
      full_name: user.user_metadata.full_name,
      avatar_url: user.user_metadata.avatar_url,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  await ensureRealm(
  user.id,
  data.username
);
  return data;
}