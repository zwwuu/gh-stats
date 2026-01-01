"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export type Bookmark = {
  fullName: string;
  avatarUrl?: string | null;
  bookmarkedAt: number;
};

type BookmarkContextType = {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "bookmarkedAt">) => void;
  removeBookmark: (fullName: string) => void;
  isBookmarked: (fullName: string) => boolean;
  toggleBookmark: (bookmark: Omit<Bookmark, "bookmarkedAt">) => void;
};

const BookmarkContext = createContext<BookmarkContextType | null>(null);
const STORAGE_KEY = "gh-stats-bookmarks";

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarks(parsed);
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  }, [bookmarks, isLoaded]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      if (!event.newValue) {
        setBookmarks([]);
        return;
      }

      try {
        const parsed = JSON.parse(event.newValue);
        setBookmarks(parsed);
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addBookmark = useCallback((bookmark: Omit<Bookmark, "bookmarkedAt">) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.fullName === bookmark.fullName)) {
        return prev;
      }
      return [{ ...bookmark, bookmarkedAt: Date.now() }, ...prev];
    });
  }, []);

  const removeBookmark = useCallback((fullName: string) => {
    setBookmarks((prev) => prev.filter((b) => b.fullName !== fullName));
  }, []);

  const isBookmarked = useCallback(
    (fullName: string) => {
      return bookmarks.some((b) => b.fullName === fullName);
    },
    [bookmarks],
  );

  const toggleBookmark = useCallback((bookmark: Omit<Bookmark, "bookmarkedAt">) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.fullName === bookmark.fullName);

      return exists
        ? prev.filter((b) => b.fullName !== bookmark.fullName)
        : [{ ...bookmark, bookmarkedAt: Date.now() }, ...prev];
    });
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }

  return context;
}
