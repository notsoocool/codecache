"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Snippet {
  _id: any;
  title: string;
  language: string;
  code: string;
  description?: string;
  tags: string[];
  category: string;
  difficulty: string;
  usage: string;
  userId: string;
  bookmarkedBy: string[];
}

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  snippets: Snippet[];
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextProps>({
  searchQuery: "",
  setSearchQuery: () => {},
  snippets: [],
  setSnippets: () => {},
  userId: null,
  setUserId: () => {},
  loading: false,
  setLoading: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/snippets");
        if (!response.ok) {
          throw new Error("Failed to fetch snippets");
        }
        const data = await response.json();
        setSnippets(data);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getCurrentUser");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserId(userData.id || null);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
    fetchCurrentUser();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        snippets,
        setSnippets,
        userId,
        setUserId,
        loading,
        setLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
