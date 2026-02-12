# Project Guidelines for AI Assistance

## Git Commit Rules

### Commit Messages
- **DO NOT** include any AI assistant references in commit messages
- **DO NOT** add "Co-Authored-By: Claude" or similar attributions
- Keep commit messages focused on the technical changes
- Use conventional commit format when appropriate

### Commit Message Format
```
<type>: <subject>

<body>
```

**Good Examples:**
```
Add particle formations component

Implements 1000-particle system with mathematical formations
including spiral, flower, heart, and bezier curves.
```

**Bad Examples:**
```
Add particle formations component

Created with Claude Code assistance.
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Code Style
- Use TypeScript for type safety
- Follow existing component patterns
- Use dynamic p5.js imports to avoid SSR issues
- Clean, semantic commit groupings

## Component Structure
- Component file: `/components/[name].tsx`
- Page file: `/app/[name]/page.tsx`
- Add to sidebar: `/components/app-sidebar.tsx`
- Add to home: `/app/page.tsx`
