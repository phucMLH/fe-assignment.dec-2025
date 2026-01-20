# 📑 Front-End Development Test - Submission

A React-based messaging application implementing three core features: Message, Discussion, and Attachments.

---

## 🚀 Setup Instructions

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fe-assignment.dec-2025/fe-assignment
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## Architecture Overview

### Technology Stack

- **React 19.2.0** - UI library with functional components
- **TypeScript** - Type safety and better developer experience
- **Vite 7.2.4** - Fast build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework with custom theme
- **React Router DOM** - Client-side routing for navigation

### Folder Structure

```
fe-assignment/src/
├── features/              # Feature-based modules
│   ├── message/          # Exercise 1: Message feature
│   │   ├── components/   # MessageList, MessageDetail, ComposeForm
│   │   ├── hooks/        # useInbox, usePagination
│   │   ├── types/        # Message interface
│   │   ├── data/         # mockMessages
│   │   └── MessagePage.tsx
│   ├── discussion/       # Exercise 2: Discussion feature
│   │   ├── components/   # CommentList, CommentItem, ReplySection
│   │   ├── hooks/        # useDiscussion
│   │   ├── types/        # Comment interface
│   │   ├── data/         # mockComments
│   │   └── DiscussionPage.tsx
│   └── attachment/       # Exercise 3: Attachment feature
│       ├── components/   # AttachmentTable, UploadBox, FileTypeIcon
│       ├── hooks/        # useAttachmentState
│       ├── types/        # Attachment interface
│       ├── data/         # mockAttachments
│       ├── utils/        # fileHelpers
│       └── AttachmentPage.tsx
├── components/
│   ├── common/           # Shared components
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── EmptyState.tsx
│   │   └── Pagination.tsx
│   └── layouts/          # Layout components
│       ├── MainLayout.tsx
│       ├── Header.tsx
│       └── Sidebar.tsx
├── utils/                # Shared utilities
│   ├── dateUtils.ts      # formatTimestamp, formatRelativeTime, formatDateOnly
│   └── fileUtils.ts      # formatFileSize, getFileExtension
└── App.tsx               # Router configuration and navigation

```

---

## Key Architectural Decisions

### 1. Feature-Based Architecture

**Decision**: Organized code by feature (message, discussion, attachment) rather than by technical layer.

**Rationale**:

- Better scalability - each feature is self-contained
- Easier maintenance - related code lives together
- Clear boundaries - features can be developed independently
- Better code discovery - developers know where to find feature-specific code

**Implementation**:

- Each feature has its own folder with components, hooks, types, data, and utils
- Shared code (common components, utilities) lives in separate folders
- Page components serve as orchestrators for their respective features

### 2. Component Composition Pattern

**Decision**: Components are pure UI, receiving all state and handlers via props.

**Rationale**:

- Testability - easier to test pure components
- Reusability - components can be used in different contexts
- Separation of concerns - business logic in hooks/utils, UI in components
- Predictability - component behavior is clear from props

**Example**:

- `AttachmentHeader` receives `onUploadClick`, `actionsOpen`, `onActionsToggle` props
- `MessageRow` receives message data and onClick handler
- State management happens at Page level or in custom hooks

### 3. Custom Hooks for State Management

**Decision**: Use custom hooks (useInbox, useDiscussion, useAttachmentState) instead of Redux/Zustand.

**Rationale**:

- Simpler for this scope - no global state needed across features
- Better performance - no unnecessary re-renders from global store
- Easier testing - hooks can be tested in isolation
- Less boilerplate - no actions/reducers/store setup

**Trade-off**:

- If features needed to share state, would require prop drilling or Context API
- For larger apps, might need state management library

### 4. React Router for Navigation

**Decision**: Use React Router DOM for navigation between exercises.

**Rationale**:

- Standard React solution for routing
- URL-based navigation - bookmarkable URLs
- Clean separation - each exercise has its own route
- Active link highlighting with NavLink component

**Implementation**:

- Route `/` - MessagePage with MainLayout (sidebar + header)
- Route `/discussion` - DiscussionPage (standalone)
- Route `/attachment` - AttachmentPage (standalone)
- Navigation tabs at top for easy switching

### 5. Tailwind CSS v4 with Custom Theme

**Decision**: Use Tailwind CSS with custom theme defined in `@theme` directive.

**Rationale**:

- Consistent design - centralized color palette and spacing
- Type safety - Tailwind IntelliSense works with custom theme
- No inline styles - all styling through utility classes
- Easy theming - change colors in one place

**Theme Colors**:

- `primary`: #166b99 (blue) - buttons, active states
- `secondary`: purple shades - badges, accents
- `accent`: emerald - success states, certain badges
- `neutral`: gray shades - backgrounds, borders, text

### 6. Shared Utilities

**Decision**: Extract common logic to `utils/` folder.

**Rationale**:

- DRY principle - no code duplication
- Consistency - same formatting everywhere
- Testability - utilities are pure functions
- Maintainability - fix once, fixes everywhere

**Examples**:

- `dateUtils`: formatTimestamp, formatRelativeTime, formatDateOnly
- `fileUtils`: formatFileSize, getFileExtension
- `features/attachment/utils/fileHelpers`: getFileTypeLabel

### 7. TypeScript Strict Mode

**Decision**: Enable strict TypeScript checking, avoid `any` type.

**Rationale**:

- Type safety - catch errors at compile time
- Better IDE support - autocomplete and refactoring
- Self-documenting - types serve as documentation
- Fewer runtime errors

**Implementation**:

- All interfaces defined in `types/` folders
- Props typed with interface definitions
- Hook return types explicitly defined
- No implicit any warnings

---

## Trade-offs

### 1. Mock Data vs Real Backend

**Choice**: Use mock data with simulated delays

**Pros**:

- No backend dependency - faster development
- Predictable testing - consistent data
- Easy to modify - add test cases quickly

**Cons**:

- Doesn't test real API integration
- No error handling for network failures
- State resets on page refresh

**Future**: Replace with real API calls when backend is available

### 2. Client-Side Validation Only

**Choice**: Validate file uploads and inputs on client side only

**Pros**:

- Immediate feedback to users
- Better UX - no round trip to server
- Reduces server load

**Cons**:

- Not secure - can be bypassed
- Need server-side validation too in production

**Future**: Add server-side validation in production

### 3. Simple Pagination vs Infinite Scroll

**Choice**: Implemented traditional pagination with page numbers

**Pros**:

- Easier navigation - jump to specific page
- Better for large datasets - load only visible page
- User control - items per page dropdown

**Cons**:

- More clicks to see all data
- Less modern UX than infinite scroll

**Rationale**: Better fits the table-based UI for attachments

### 4. Component Co-location vs Full Separation

**Choice**: Co-locate feature-specific components with their feature

**Pros**:

- Easier to find related code
- Clear ownership - feature owns its components
- Less coupling - features can evolve independently

**Cons**:

- Potential duplication if components could be shared
- Harder to extract to component library later

**Mitigation**: Shared components still live in `components/common/`

### 5. CSS-in-JS vs Tailwind CSS

**Choice**: Use Tailwind CSS exclusively

**Pros**:

- Fast development - no switching between files
- Small bundle size - only used utilities included
- Consistency - design system enforced
- No runtime overhead - styles generated at build time

**Cons**:

- Long className strings
- Less semantic CSS
- Learning curve for Tailwind syntax

**Rationale**: Matches assignment requirements and modern best practices

---

## Requirements Coverage

### Exercise 1: Message ✓

- Message list sorted by newest first
- Author, content, timestamp display
- Compose textarea with send button
- Disabled send when empty
- Append new message to list
- Auto-scroll to newest message

### Exercise 2: Discussion ✓

- Comment list with author, content, timestamp
- One level of replies per comment
- Chat-style visual indentation for replies
- Inline reply input per comment
- Replies added to correct comment

### Exercise 3: Attachments ✓

- File list with name, type, formatted size
- Mock download button
- Upload box with drag-and-drop
- Multiple file uploads
- File size and type validation
- Empty and error states

### Global Requirements ✓

- React functional components only
- TypeScript (no `any` type)
- TailwindCSS (no inline styles)
- Clean folder structure
- Loading, empty, error states
- Responsive design (desktop-first)

---

## Additional Features

- **Enhanced Pagination**: Items per page dropdown (5/10/20/50), go-to page input
- **File Grouping**: Attachments grouped by path with folder icons
- **Active Navigation**: Tab highlighting for current exercise
- **Form Validation**: Real-time validation with error messages
- **Accessibility**: Semantic HTML, keyboard navigation support
- **Type Safety**: Full TypeScript coverage with strict mode

---

## Git Workflow

The project follows conventional commits and feature branch workflow:

- Feature branches for each exercise
- Atomic commits with clear messages
- Descriptive commit history for code review

---
