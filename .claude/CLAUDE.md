# Project Context

You are a senior full-stack developer using Claude Agent SDK to build a React application.

## Project Requirements (PRD Summary)
# PRD Summary

**Product Overview:** FocusFlow Todo aims to empower individuals and teams to capture, organize, and complete tasks quickly with minimal setup, offering offline-first functionality and seamless cross-device sync.

**Key User Personas:**  
- **Maya Chen (Solo Founder):** Needs ultra-fast task capture, offline access, and simple prioritization.  
- **Diego Patel (Marketing Manager):** Requires shared projects, task assignments, and reliable notifications for team coordination.  
- **Elena Rossi (IT Admin):** Seeks data security, centralized admin controls, and easy data export for compliance.

**Core Features:**  
- One-tap task capture with minimal friction.  
- CRUD functionality for tasks with metadata (due date, priority, status).  
- Offline-first data persistence with cloud sync and conflict resolution.  
- Basic search and filtering options.  
- Simple onboarding with in-app guidance and data export/import capabilities.

**User Stories:**  
- As a solo user, I want to capture tasks with a single tap and organize them easily to minimize friction.  
- As a team admin, I want shared lists and task assignments to facilitate secure collaboration.

**Requirements:**  
- Email/password authentication with secure session management.  
- Push notifications and reminders for task deadlines.  
- Responsive web UI with PWA capabilities and WCAG 2.1 AA accessibility.  
- Data export/import in JSON/CSV formats for portability.  
- Basic enterprise features for future...

## Brand DNA
- Primary Color: #5200ff
- Accent Color: #ffd700
- Font Family: Inter

## Template Context
This is a minimal React + Vite Single Page Application.

## Core Stack
- React 19.2.0 with TypeScript 5.9.3
- Vite 7.2.2
- Tailwind CSS v4.1.17
- React Router v7.9.5

## Project Structure
```
src/
├── components/
│   ├── error-boundary.tsx    # Error boundary component
│   └── vibestack-badge.tsx    # PROTECTED - DO NOT MODIFY
├── routes/
│   └── index.tsx              # Route definitions
├── App.tsx                     # Root component with routing
├── main.tsx                    # Entry point
└── index.css                   # Tailwind styles
```

## Essential Rules
1. DO NOT modify `src/components/vibestack-badge.tsx` - must remain visible
2. Use path alias `@/` for imports from `src/`
3. Use TypeScript strict mode - no `any` types
4. Use Tailwind CSS for all styling
5. Use React Router for navigation
6. Entry point: `src/main.tsx`
7. Build output: `dist/`
8. Development port: 5173

## Spec-Kit Integration
This project uses GitHub's spec-kit for spec-driven development.

## Spec-Kit Commands Available
- /speckit.plan - Generate an implementation plan from the PRD
- /speckit.tasks - Break down the plan into specific tasks
- /speckit.spec - Create or update specifications

## Workflow
1. First, use /speckit.plan to create a high-level implementation plan
2. Then use /speckit.tasks to break the plan into specific, actionable tasks
3. Execute each task sequentially
4. Update specifications as needed during implementation

## Spec-Kit Best Practices
- Create clear, executable specifications
- Break down complex features into smaller tasks
- Ensure each task is testable and verifiable
- Document any assumptions or constraints
- Keep specifications up to date as you implement

## Agent Skills Available
The following skills are available to help guide your implementation:
- React Patterns: Best practices for functional components, hooks, and state management
- TypeScript Best Practices: Type safety, interfaces, and type utilities
- Tailwind Styling: Utility-first CSS patterns and responsive design

These skills are automatically loaded from .claude/skills/ directory. Reference them when implementing features.

## Instructions
1. Use the spec-kit commands (/speckit.plan, /speckit.tasks) to break down the requirements into actionable tasks
2. Implement each task sequentially using the Agent SDK tools
3. Follow React best practices and TypeScript conventions (see available skills)
4. Use the brand colors and fonts specified in the Brand DNA
5. Ensure all code is properly typed and follows the template structure
6. Test your implementation by running the build command
7. Commit your changes to the repository when tasks are complete

## Code Quality Standards
- Use TypeScript for all code (see TypeScript Best Practices skill)
- Follow React functional component patterns (see React Patterns skill)
- Use Tailwind CSS for styling (see Tailwind Styling skill)
- Ensure responsive design
- Follow TypeScript best practices
- Include proper TypeScript types
- Follow the existing code structure in the template

## Task Execution
Execute tasks one by one, ensuring each task is complete before moving to the next.
The Agent SDK will automatically track progress and file changes.
If you encounter errors, fix them before proceeding.

Begin by analyzing the PRD and creating a plan using spec-kit.

## Memory & Context
This section will be updated as tasks are completed to maintain project context.
