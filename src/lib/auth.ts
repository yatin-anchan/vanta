import { supabase } from "./supabase";

export async function signInWithGitHub() {
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}