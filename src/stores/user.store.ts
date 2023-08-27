import { create } from "zustand";
import { supabase } from "../db";
import { User } from "@supabase/supabase-js";

interface IUserStore {
  user: User | null;
  getUser: () => Promise<{ status: string } | void>;
  signin: (email: string, password: string) => Promise<{ status: string } | void>;
  signout: () => Promise<{ status: string } | void>;
}

export const useUserStore = create<IUserStore>(set => ({
  user: null,
  getUser: async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) return;

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    set({ user: userData.user });

    return { status: "ok" };
  },
  signin: async (email: string, password: string) => {
    const { data } = await supabase.auth.signInWithPassword({ email, password });

    if (!data.user) return;

    set({ user: data.user });

    return { status: "ok" };
  },
  signout: async () => {
    await supabase.auth.signOut();

    set({ user: null });

    return { status: "ok" };
  },
}));
