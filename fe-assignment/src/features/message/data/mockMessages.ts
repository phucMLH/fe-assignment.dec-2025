import type { Message } from '../types/message';

const names = [
  'Sarah Williams', 'James Smith', 'Rachel Green', 'Laura White', 'Daniel Taylor',
  'Michael Brown', 'Emily Davis', 'Thomas Harris', 'Joshua Miller', 'Sophie Wilson',
  'Robert Johnson', 'Lisa Anderson', 'David Martinez', 'Jennifer Garcia', 'William Rodriguez',
  'Mary Lee', 'Richard Walker', 'Patricia Hall', 'Christopher Young', 'Linda King',
  'Matthew Wright', 'Barbara Lopez', 'Anthony Hill', 'Nancy Scott', 'Mark Adams',
  'Karen Baker', 'Donald Nelson', 'Betty Carter', 'Steven Mitchell', 'Helen Perez',
  'Paul Roberts', 'Sandra Turner', 'Andrew Phillips', 'Ashley Campbell', 'Kenneth Parker',
  'Donna Evans', 'Joshua Edwards', 'Carol Collins', 'Kevin Stewart', 'Michelle Morris',
];

const subjects = [
  'Art Exhibition Opening', 'Cooking Class Registration', 'Book Club Meeting',
  'Photography Workshop', 'Music Festival Tickets', 'Team Building Event',
  'Project Update Required', 'Quarterly Review Meeting', 'Training Session Notice',
  'Conference Invitation', 'Client Meeting Reminder', 'Weekly Report Submission',
  'Budget Approval Request', 'System Maintenance Alert', 'Product Launch Announcement',
  'Performance Review Schedule', 'Office Closure Notice', 'New Policy Guidelines',
  'Team Lunch Invitation', 'Deadline Extension Request', 'Contract Renewal Notice',
  'Sales Report Summary', 'Marketing Campaign Update', 'IT Support Request',
  'Annual Survey Participation', 'Employee Benefits Update', 'Holiday Schedule',
  'Safety Training Required', 'Network Upgrade Notice', 'Customer Feedback Review',
];

const categories = ['user-management', 'meeting-reminder', undefined];

function generateMessage(id: number): Message {
  const fromName = names[id % names.length];
  const recipientName = names[(id + 5) % names.length];
  const subject = subjects[id % subjects.length];
  const category = categories[id % categories.length];
  
  // Generate dates in 2026
  const dayOffset = id * 3;
  const date = new Date(2026, 0, 1 + dayOffset);
  const dateStr = date.toISOString().split('T')[0];
  
  return {
    id: String(id + 1),
    from: { 
      name: `${id % 3 === 0 ? 'Ms.' : id % 3 === 1 ? 'Mr.' : 'Dr.'} ${fromName}`, 
      email: `${fromName.toLowerCase().replace(' ', '.')}@example.com` 
    },
    recipients: [recipientName],
    subject: subject.length > 20 ? subject.substring(0, 18) + '...' : subject,
    date: dateStr,
    category,
    isRead: id % 3 !== 0,
    body: id === 0 
      ? 'Hi [First Name],\nYour appointment is confirmed.\n\nAppointment details:\n• Date: [Day, Month, Year]\n• Time: [Time] ([Time Zone])\n• Host: [Name]\n• Meeting type: Video meeting\n\nJoin your meeting\nPlease use this link at the scheduled time:\n[Meeting Link]\n\nBefore the meeting (2-5 minutes)\n1. Join from a quiet, distraction-free place\n2. Check your internet connection\n3. Have any relevant documents or notes ready\n\nNeed to reschedule or cancel?\nPlease contact us at [Phone] or reply to this message at least 2 hours in advance.\n\nWe look forward to speaking with you.\n\nBest regards,\n[Your Name]'
      : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Message #${id + 1} content here...`,
  };
}

export const mockMessages: Message[] = Array.from({ length: 60 }, (_, i) => generateMessage(i));
