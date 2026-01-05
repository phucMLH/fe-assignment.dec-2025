# 📑 Front-End Development Test

- Copyright (c) RFX Joint Stock Company. 2026. All rights reserved.
- We only use the submissions for candidates evaluation.

## **A. Instructions**
- **Position**: Front-End Developer
- **Expected Time**: 6–10 hours
- **Stack**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Not required (mock data only)
- **Design**:
    - **Sheets**: [link](https://docs.google.com/spreadsheets/d/18GvhNs3mLVjVoEUWlVMlNpNI3aGqqiozZvoLpwgew-k/edit?usp=sharing)
    - **Figma**: [link](https://www.figma.com/design/YbtyD7VZFRL0OgGg1jTz5z/RFX---Assignment?node-id=0-1&p=f&t=Vcy92KesZyjqZtV8-0)
- **Submission Format**: 
  - Candidate must fork this repository to a public repo under their name for submission. Notify email `hr@riverflow.solutions` when done.
  - Submit a Git repository link
  - Include a README with setup instructions
  - Explain key architectural decisions and trade-offs
  - Ensure the project can be run with standard npm commands

---

## **B. Global Requirements**

- Use React functional components only
- TypeScript is required (avoid using `any`)
- Use TailwindCSS for styling (no inline styles)
- Organize code with a clean and logical folder structure
- Handle loading, empty, and error states
- Ensure reasonable responsiveness (desktop-first is acceptable)

---

## **C. Exercises**
### **C1. Exercise 1: Message**

Build a simple messaging interface with a list of messages and a compose box.

#### **Requirements:**
- Display a list of messages sorted by newest first
- Each message shows author, content, and timestamp
- Provide a textarea to compose a new message
- Disable send button when input is empty
- Append new message to the list after sending
- Auto-scroll to the newest message

---

### **C2. Exercise 2: Discussion**

Implement a discussion thread with comments and one level of replies. Replies should visually resemble a chat interface.

#### **Requirements:**
- List comments with author, content, and timestamp
- Allow one level of replies per comment
- Replies should be visually indented and chat-style
- Provide an inline reply input per comment
- Ensure replies are added to the correct comment

---

### **C3. Exercise 3: Attachments**

Create an attachments section that allows displaying and uploading files.

#### **Requirements:**
- Display a list of attached files with name, type, and formatted size
- Provide a mock download button
- Include an upload box (file input or drag-and-drop)
- Support multiple file uploads
- Validate file size and file type on the client
- Show appropriate empty and error states

---

## **D. Additional Notes**

- This test evaluates your front-end development skills using React, TypeScript, TailwindCSS, and Vite
- Focus on demonstrating your technical skills, code organization, and attention to detail
- Ensure all submission requirements are met before the deadline