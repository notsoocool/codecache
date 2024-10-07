type ProfileData = {
  bookmarked: Snippet[]
  ratings: Rating[]
  snippets: Snippet[]
  contribution: number
  totalSnippetsPoints: number
  totalBookmarkedPoints: number
  totalRatingsPoints: number
}

type Snippet = {
  _id: string,
  title: string
  language: string
  code: string
  description?: string
  tags: string[]
  category: string
  difficulty: string
  usage: string
  userId: string
  bookmarkedBy: string[]
}

type Rating = {
  _id: string
  snippetId: Snippet
  userId: string
  rating: number
  averageRating: number
}