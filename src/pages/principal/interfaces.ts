export interface GitHubUSerData{
  id: number;
  avatar_url: string;
  location: string;
  name: string;
  url: string;
}

export interface GitHubUSerRepos{
  id: number;
  description: string;
  private: boolean;
  name: string;
  clone_url: string;
  created_at: Date;
  updated_at: Date;
  stargazers_count: number;
  language: string;
}