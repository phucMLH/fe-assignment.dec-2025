import type { Comment } from '../types/discussion';
import { mockUsers } from './mockUsers';

export const mockComments: Comment[] = [
  {
    id: '1',
    author: mockUsers.user01,
    content: 'Hello, How is it going?',
    timestamp: new Date('2025-12-21T17:00:00'),
    replies: [
      {
        id: '1-1',
        author: mockUsers.user02,
        content: "Good, I'm fine.",
        timestamp: new Date('2026-01-17T18:00:00'),
      },
      {
        id: '1-2',
        author: mockUsers.user03,
        content: `I'm not good. I'm having a headaches ....
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
        timestamp: new Date('2026-01-17T18:00:00'),
      },
    ],
  },
  {
    id: '2',
    author: mockUsers.user04,
    content: 'What are you doing today?',
    timestamp: new Date('2026-01-18T10:30:00'),
    replies: [],
  },
];
