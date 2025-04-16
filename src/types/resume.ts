interface SearchResult {
  id: string;
  category: string;
  similarity_score: number;
  skills: string[];
  education: string[];
  experience: string[];
}

export type { SearchResult };
