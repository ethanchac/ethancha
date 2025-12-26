# VS Code Window Integration Guide

## Overview
I've added a synchronized VS Code-style window to your hero section that types in harmony with your main text.

## Components Created/Modified

### 1. CodeWindow.jsx (`src/components/CodeWindow.jsx`)
A new component that renders a macOS-style code editor window.

**Features:**
- **Glassmorphism**: Semi-transparent background with heavy backdrop blur
- **macOS Window Controls**: Red, yellow, green dots
- **Syntax Highlighting**: Muted One Dark/Dracula theme colors
- **Independent Typing**: Types code lines autonomously
- **Synchronized Content**: Mirrors the main text in the `<h1>` tag
- **Cursor States**: Solid block `█` while typing, blinking `_` while paused
- **Completion Glow**: Purple/blue glow animation when typing finishes

**Props:**
- `phase`: Current typing phase from Hero component
- `displayIntro`: "Hello world, I'm" text
- `displayName`: "Ethan Cha" (with typo states)
- `isTyping`: Boolean indicating if main text is currently typing

### 2. Hero.jsx (Modified)
Updated to include the CodeWindow on the right side.

**Changes:**
- Imported CodeWindow component
- Main text container now uses `w-full lg:w-1/2` for responsive layout
- CodeWindow absolutely positioned on the right side
- Hidden on mobile (`hidden lg:block`)

### 3. index.css (Extended)
Added comprehensive styling for the code window.

**New Styles:**
- `.code-window`: Glassmorphism container with blur and border
- `.window-header`: macOS-style header with controls
- `.window-dot-*`: Colored dots (red, yellow, green)
- `.code-content`: Monospace code area
- `.token-*`: Syntax highlighting tokens
- `.code-cursor-solid/blink`: Cursor animations
- `.code-complete`: Glow animation on completion

## How Synchronization Works

### Phase 1: Code Window Types First
```javascript
// CodeWindow autonomously types:
1. const Hero = () => {
2.   return (
3.     <h1>Hello world, I'm [cursor]
```

### Phase 2: Main Text Triggers
When CodeWindow reaches `codePhase === 'syncing'`, the main Hero component continues typing your name.

### Phase 3: Perfect Sync
- CodeWindow displays: `<h1>Hello world, I'm {displayName}</h1>`
- Main text displays the same content in large text
- Both show the typo "Cn" → delete → "Cha" simultaneously

### Phase 4: Completion
- Both cursors disappear
- CodeWindow glows with purple/blue shadow
- Dot grid pulses from center

## Typing Sequence Timeline

```
0ms: CodeWindow starts typing "const Hero = () => {"
~1200ms: CodeWindow finishes line 1, pauses (blinking cursor)
~1600ms: CodeWindow starts line 2 "  return ("
~2400ms: CodeWindow finishes line 2, pauses
~2800ms: CodeWindow starts line 3 "    <h1>Hello world, I'm "
~4500ms: CodeWindow reaches sync point, main text begins
~6000ms: Main text types "Ethan "
~6500ms: Main text types "Cn" (typo)
~7200ms: Pause, then rapid backspace
~7500ms: Main text types "Cha"
~8000ms: Both animations complete, cursors hide, glow effect
```

## Customization Options

### Adjust Typing Speed
In `CodeWindow.jsx`:
```javascript
60 + Math.random() * 30  // Fast (60-90ms)
80 + Math.random() * 40  // Normal (80-120ms)
```

### Change Syntax Colors
In `index.css`:
```css
.token-keyword { color: #a991c8; } /* Purple */
.token-function { color: #7fa8d1; } /* Blue */
.token-tag { color: #d19a66; } /* Orange */
.token-string { color: #98c379; } /* Green */
```

### Adjust Window Size
In `Hero.jsx`:
```javascript
w-[500px] xl:w-[600px]  // Responsive width
```

### Modify Glow Effect
In `index.css`:
```css
@keyframes window-glow {
  50% {
    box-shadow: 0 20px 60px rgba(147, 51, 234, 0.3),
                0 0 40px rgba(59, 130, 246, 0.2);
  }
}
```

## Responsive Behavior

- **Desktop (lg+)**: Full code window visible on right
- **Tablet/Mobile**: Code window hidden to maintain focus on main text
- **Layout**: Uses absolute positioning to float over dot grid

## Performance Notes

- Typing animations use `setTimeout` for precise control
- Minimal re-renders through careful state management
- Glassmorphism uses GPU-accelerated `backdrop-filter`
- Syntax highlighting is static (not runtime tokenization)

## Accessibility

- Code content is readable by screen readers
- Cursor animations respect `prefers-reduced-motion`
- Color contrast meets WCAG standards
- Window controls are decorative only (not interactive)

## Future Enhancements

Potential additions:
- Add more code lines (closing tags, etc.)
- Implement window dragging
- Add a minimize/maximize animation
- Include line highlighting on hover
- Add a "Run Code" button that triggers something fun
