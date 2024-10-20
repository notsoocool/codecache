type ProfileData = {
  bookmarked: Snippet[];
  ratings: Rating[];
  snippets: Snippet[];
  contribution: number;
  totalSnippetsPoints: number;
  totalBookmarkedPoints: number;
  totalRatingsPoints: number;
};

export interface Notification {
  _id: string;
  type: string;
  snippetId?: string;
  message: string;
  status: "unread" | "read";
  createdAt: string;
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export interface RepoStats {
  stars: number;
  forks: number;
  openIssues: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

export interface Snippet {
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

export interface Comment {
  _id: string;
  snippetId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

type Rating = {
  _id: string;
  snippetId: Snippet;
  userId: string;
  rating: number;
  averageRating: number;
};

export interface SnippetRequest {
  _id: string;
  title: string;
  language: string;
  code: string;
  description?: string;
  tags?: string[];
  category?: string;
  difficulty?: string;
  usage?: string;
  approved: boolean;
}

export interface DeleteRequest {
  _id: string;
  snippetId: string;
  name: string;
  deletionRequestedBy: string;
  reason: string;
}
