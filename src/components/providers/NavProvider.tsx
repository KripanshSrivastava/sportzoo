"use client";

import { createContext, useContext, ReactNode } from "react";
import type { NavModel } from "@/lib/navData";

const NavContext = createContext<NavModel | null>(null);

export function NavProvider({ value, children }: { value: NavModel; children: ReactNode }) {
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

/** The category/service nav tree (admin-editable) for client components. */
export function useNav(): NavModel {
  return useContext(NavContext) ?? { categories: [], hiddenPaths: [] };
}
