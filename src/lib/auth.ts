import { supabase } from "./supabase";
import { ensureProfile } from "./profile";

export async function signInWithGitHub() {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
  redirectTo: `${window.location.origin}/dashboard`,
  queryParams: {
    prompt: "consent",
  },
},
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}