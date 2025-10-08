export interface IResponseUsers {
  total_count: number;
  incomplete_results: boolean;
  items: IUser[];
}

export interface IUser {
  login: string | null;
  id: number;
  node_id?: string | null;
  avatar_url?: string | null;
  gravatar_id?: string | null;
  url?: string | null;
  html_url?: string | null;
  followers_url?: string | null;
  following_url?: string | null;
  gists_url?: string | null;
  starred_url?: string | null;
  subscriptions_url?: string | null;
  organizations_url?: string | null;
  repos_url?: string | null;
  events_url?: string | null;
  received_events_url?: string | null;
  type?: string | null;
  user_view_type?: string | null;
  site_admin?: boolean;
  score?: number;
}


export interface IUserDetail extends IUser {
  name: string,
  company: string | null,
  blog: string | null,
  location: string | null,
  email: string | null,
  hireable: string | null,
  bio: string | null,
  twitter_username: string | null,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  created_at: string,
  updated_at: string
}

export interface IUserRepo {
  "id": number,
  "node_id": string,
  "name": string,
  "full_name": string,
  "private": boolean,
  "owner": IUser,
  "html_url": string,
  "description": null,
  "fork": boolean,
  "url": string,
  "forks_url": string,
  "keys_url": string,
  "collaborators_url": string,
  "teams_url": string,
  "hooks_url": string,
  "issue_events_url": string,
  "events_url": string,
  "assignees_url": string,
  "branches_url": string,
  "tags_url": string,
  "blobs_url": string,
  "git_tags_url": string,
  "git_refs_url": string,
  "trees_url": string,
  "statuses_url": string,
  "languages_url": string,
  "stargazers_url": string,
  "contributors_url": string,
  "subscribers_url": string,
  "subscription_url": string,
  "commits_url": string,
  "git_commits_url": string,
  "comments_url": string,
  "issue_comment_url": string,
  "contents_url": string,
  "compare_url": string,
  "merges_url": string,
  "archive_url": string,
  "downloads_url": string,
  "issues_url": string,
  "pulls_url": string,
  "milestones_url": string,
  "notifications_url": string,
  "labels_url": string,
  "releases_url": string,
  "deployments_url": string,
  "created_at": string,
  "updated_at": string,
  "pushed_at": string,
  "git_url": string,
  "ssh_url": string,
  "clone_url": string,
  "svn_url": string,
  "homepage": string,
  "size": number,
  "stargazers_count": number,
  "watchers_count": number,
  "language": string,
  "has_issues": boolean,
  "has_projects": boolean,
  "has_downloads": boolean,
  "has_wiki": boolean,
  "has_pages": boolean,
  "has_discussions": boolean,
  "forks_count": number,
  "mirror_url": string | null,
  "archived": boolean,
  "disabled": boolean,
  "open_issues_count": number,
  "license": string | null,
  "allow_forking": true,
  "is_template": boolean,
  "web_commit_signoff_required": boolean,
  "topics": [],
  "visibility": string,
  "forks": number,
  "open_issues": number,
  "watchers": number,
  "default_branch": string
}