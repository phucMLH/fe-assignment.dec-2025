export interface Author {
  id: string;
  name: string;
  avatar?: string;
}

export interface Reply {
  id: string;
  author: Author;
  content: string;
  timestamp: Date;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: Date;
  replies: Reply[];
}

export interface Discussion {
  id: string;
  title: string;
  comments: Comment[];
}
