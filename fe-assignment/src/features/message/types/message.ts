export interface Message {
  id: string;
  from: {
    name: string;
    email: string;
  };
  recipients: string[];
  subject: string;
  date: string;
  category?: string;
  isRead: boolean;
  body: string;
  relatedMessages?: RelatedMessage[];
}

export interface RelatedMessage {
  id: string;
  from: string;
  subject: string;
  date: string;
  preview: string;
}

export interface User {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

export interface ComposeData {
  to: string[];
  from: string;
  subject: string;
  body: string;
}
