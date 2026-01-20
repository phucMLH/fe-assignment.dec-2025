import { useState, useEffect } from 'react';

interface ComposeFormProps {
  onSend: (data: { from: string; to: string[]; subject: string; body: string }) => void;
  onCancel: () => void;
  mode?: 'new' | 'reply';
  replyTo?: string;
  replySubject?: string;
  myEmail?: string;
}

export default function ComposeForm({ 
  onSend, 
  onCancel, 
  mode = 'new', 
  replyTo = '', 
  replySubject = '',
  myEmail = 'me@example.com'
}: ComposeFormProps) {
  const [from, setFrom] = useState(myEmail);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  // Pre-fill form when replying
  useEffect(() => {
    if (mode === 'reply') {
      setFrom(myEmail);
      setTo(replyTo);
      setSubject(replySubject.startsWith('Re: ') ? replySubject : `Re: ${replySubject}`);
    }
  }, [mode, replyTo, replySubject, myEmail]);

  const isValid = from.trim() !== '' && to.trim() !== '' && subject.trim() !== '' && body.trim() !== '';

  const handleSend = () => {
    if (!isValid) return;
    
    // Parse multiple recipients (comma or semicolon separated)
    const recipients = to
      .split(/[,;]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);
    
    onSend({ from, to: recipients, subject, body });
    // Reset form
    setFrom(myEmail);
    setTo('');
    setSubject('');
    setBody('');
  };

  const title = mode === 'reply' ? `Compose: ${subject}` : 'Compose New Message';

  return (
    <div className="border-t-2 border-neutral-300 bg-white">
      {/* Header */}
      <div className="bg-primary-600 px-3 py-2">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>

      {/* Form Fields */}
      <div className="space-y-2 p-3">
        {/* To and From Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-0.5 block text-xs font-medium text-neutral-700">To:</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="email1@example.com, email2@example.com"
              className="w-full rounded border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
            />
            <p className="mt-0.5 text-xs text-neutral-500">Separate multiple emails with comma or semicolon</p>
          </div>
          <div>
            <label className="mb-0.5 block text-xs font-medium text-neutral-700">From:</label>
            <input
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="your-email@example.com"
              className="w-full rounded border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="mb-0.5 block text-xs font-medium text-neutral-700">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Re: Nutrition Counseling"
            className="w-full rounded border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-0.5 rounded border border-neutral-300 bg-neutral-50 p-1">
          <button className="rounded p-1 text-neutral-600 hover:bg-neutral-200" title="Undo">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button className="rounded p-1 text-neutral-600 hover:bg-neutral-200" title="Redo">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>
          <div className="mx-0.5 h-5 w-px bg-neutral-300"></div>
          <button className="rounded px-1.5 py-1 text-xs font-bold text-neutral-600 hover:bg-neutral-200" title="Bold">B</button>
          <button className="rounded px-1.5 py-1 text-xs italic text-neutral-600 hover:bg-neutral-200" title="Italic">I</button>
          <button className="rounded px-1.5 py-1 text-xs text-neutral-600 underline hover:bg-neutral-200" title="Underline">U</button>
          <div className="mx-0.5 h-5 w-px bg-neutral-300"></div>
          <button className="rounded px-1.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-200" title="Heading 1">H1</button>
          <button className="rounded px-1.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-200" title="Heading 2">H2</button>
          <button className="rounded px-1.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-200" title="Heading 3">H3</button>
          <div className="mx-0.5 h-5 w-px bg-neutral-300"></div>
          <button className="rounded p-1 text-neutral-600 hover:bg-neutral-200" title="Bullet List">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="rounded p-1 text-neutral-600 hover:bg-neutral-200" title="Numbered List">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h12M9 12h12M9 19h12M3 5l1 1m0 0l1-1M4 6v6m0 0l-1-1m1 1l1-1m-1 7v6m0 0l-1-1m1 1l1-1" />
            </svg>
          </button>
          <button className="rounded p-1 text-neutral-600 hover:bg-neutral-200" title="Link">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button className="rounded p-1 text-neutral-600 hover:bg-neutral-200" title="Image">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="rounded p-1 text-neutral-600 hover:bg-neutral-200" title="Code">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your message here..."
            rows={5}
            className="w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 border-t border-neutral-200 bg-neutral-50 px-3 py-2">
        <button
          onClick={onCancel}
          className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          disabled={!isValid}
          className="flex items-center gap-1.5 rounded bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>Send</span>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
