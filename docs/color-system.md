# Trip Tracker UI - Color System Guide

## Overview

The Trip Tracker UI uses a comprehensive color system built on CSS custom properties (variables) that supports both light and dark themes. The color system is designed to be maintainable, accessible, and easily customizable.

## Color Architecture

### 1. CSS Variables Location
All color variables are defined in `src/app/globals.css` within the `:root` and `.dark` selectors.

### 2. Color Categories

#### Base Colors
- **Background**: Main application background
- **Foreground**: Primary text color
- **Card**: Component background colors
- **Popover**: Overlay and dropdown backgrounds

#### Interactive Colors
- **Primary**: Main brand color for buttons and links
- **Secondary**: Secondary actions and elements
- **Accent**: Highlighted elements and focus states
- **Muted**: Subdued text and backgrounds

#### Semantic Colors
- **Destructive**: Error states and dangerous actions
- **Border**: Component borders and dividers
- **Input**: Form input backgrounds and borders
- **Ring**: Focus ring colors

## Primary Brand Colors

### Header Colors
```css
--header-primary: 0 36 71; /* #002447 - Dark Navy Blue */
```

**Usage**: Main header background, primary branding elements

**RGB Values**: `rgb(0, 36, 71)`

**Hex Value**: `#002447`

### Navigation Colors
```css
--nav-bg: 255 255 255;        /* #ffffff - White Background */
--nav-active: 5 148 211;      /* #0594d3 - Active Blue */
--nav-hover: 97 179 79;       /* #61b34f - Hover Green */
--nav-text: 0 0 0;            /* #000000 - Black Text */
--nav-text-active: 255 255 255; /* #ffffff - White Text */
```

### Gradient Colors
```css
--gradient-primary: #0895d3;   /* Primary Blue */
--gradient-secondary: #60b460; /* Secondary Green */
```

**Usage**: Footer gradients, accent elements, call-to-action buttons

## How to Change Primary Colors

### 1. Header Color Modification

To change the main header color, update the `--header-primary` variable:

```css
/* Current: Dark Navy Blue */
--header-primary: 0 36 71;

/* Example: Change to Dark Purple */
--header-primary: 75 0 130;

/* Example: Change to Dark Green */
--header-primary: 0 100 0;
```

**Note**: Values are in RGB format without commas (space-separated).

### 2. Navigation Color Modification

#### Active Tab Color
```css
/* Current: Blue */
--nav-active: 5 148 211;

/* Example: Change to Purple */
--nav-active: 128 0 128;

/* Example: Change to Orange */
--nav-active: 255 165 0;
```

#### Hover State Color
```css
/* Current: Green */
--nav-hover: 97 179 79;

/* Example: Change to Light Blue */
--nav-hover: 135 206 235;

/* Example: Change to Coral */
--nav-hover: 255 127 80;
```

### 3. Gradient Color Modification

#### Primary Gradient
```css
/* Current: Blue */
--gradient-primary: #0895d3;

/* Example: Change to Purple */
--gradient-primary: #8a2be2;

/* Example: Change to Teal */
--gradient-primary: #20b2aa;
```

#### Secondary Gradient
```css
/* Current: Green */
--gradient-secondary: #60b460;

/* Example: Change to Orange */
--gradient-secondary: #ff8c00;

/* Example: Change to Pink */
--gradient-secondary: #ff69b4;
```

## Complete Color Customization Examples

### Example 1: Purple Theme
```css
:root {
  /* Header */
  --header-primary: 75 0 130; /* Dark Purple */
  
  /* Navigation */
  --nav-active: 138 43 226;   /* Blue Violet */
  --nav-hover: 186 85 211;    /* Medium Orchid */
  
  /* Gradients */
  --gradient-primary: #8a2be2;   /* Blue Violet */
  --gradient-secondary: #da70d6; /* Orchid */
}
```

### Example 2: Ocean Theme
```css
:root {
  /* Header */
  --header-primary: 0 105 148; /* Deep Ocean Blue */
  
  /* Navigation */
  --nav-active: 0 191 255;     /* Deep Sky Blue */
  --nav-hover: 64 224 208;     /* Turquoise */
  
  /* Gradients */
  --gradient-primary: #00bfff;   /* Deep Sky Blue */
  --gradient-secondary: #40e0d0; /* Turquoise */
}
```

### Example 3: Forest Theme
```css
:root {
  /* Header */
  --header-primary: 34 139 34; /* Forest Green */
  
  /* Navigation */
  --nav-active: 50 205 50;     /* Lime Green */
  --nav-hover: 144 238 144;    /* Light Green */
  
  /* Gradients */
  --gradient-primary: #32cd32;   /* Lime Green */
  --gradient-secondary: #90ee90; /* Light Green */
}
```

## Color Usage Guidelines

### 1. Accessibility Considerations
- Ensure sufficient contrast ratios (WCAG 2.1 AA compliance)
- Test colors with color blindness simulators
- Maintain readability in both light and dark themes

### 2. Brand Consistency
- Use primary colors for main actions and branding
- Use secondary colors for supporting elements
- Maintain color hierarchy throughout the application

### 3. Semantic Meaning
- Red/destructive colors for errors and dangerous actions
- Green colors for success states
- Blue colors for informational elements
- Yellow/orange for warnings

## Testing Color Changes

### 1. Visual Testing
1. Update the CSS variables in `globals.css`
2. Restart the development server
3. Test all components and pages
4. Verify both light and dark themes (if applicable)

### 2. Accessibility Testing
1. Use browser developer tools to check contrast ratios
2. Test with screen readers
3. Verify keyboard navigation visibility
4. Test with color blindness simulators

### 3. Cross-Browser Testing
1. Test in Chrome, Firefox, Safari, and Edge
2. Verify mobile responsiveness
3. Check print styles (if applicable)

## Advanced Customization

### 1. Dynamic Color Switching
For runtime color switching, you can use JavaScript to update CSS variables:

```javascript
// Change header color dynamically
document.documentElement.style.setProperty('--header-primary', '255 0 0');

// Change navigation active color
document.documentElement.style.setProperty('--nav-active', '0 255 0');
```

### 2. Theme Variants
Create multiple theme files and switch between them:

```css
/* themes/blue-theme.css */
:root {
  --header-primary: 0 36 71;
  --nav-active: 5 148 211;
  /* ... other blue theme colors */
}

/* themes/green-theme.css */
:root {
  --header-primary: 0 100 0;
  --nav-active: 50 205 50;
  /* ... other green theme colors */
}
```

## Color Palette Reference

### Current Brand Palette
| Color Name | Hex Code | RGB Values | Usage |
|------------|----------|------------|-------|
| Navy Blue | #002447 | 0, 36, 71 | Header background |
| Active Blue | #0594d3 | 5, 148, 211 | Active navigation |
| Hover Green | #61b34f | 97, 179, 79 | Hover states |
| Gradient Blue | #0895d3 | 8, 149, 211 | Primary gradient |
| Gradient Green | #60b460 | 96, 180, 96 | Secondary gradient |

### Recommended Color Tools
- **Adobe Color**: For creating color palettes
- **Coolors.co**: For palette generation and inspiration
- **WebAIM Contrast Checker**: For accessibility testing
- **Colour Contrast Analyser**: Desktop tool for contrast checking

## Troubleshooting

### Common Issues
1. **Colors not updating**: Restart development server after CSS changes
2. **Contrast issues**: Use accessibility tools to verify contrast ratios
3. **Theme inconsistencies**: Ensure all color variables are updated consistently
4. **Mobile display issues**: Test responsive design with new colors

### Best Practices
1. Always test color changes in both themes
2. Document custom color choices
3. Maintain a style guide for team consistency
4. Regular accessibility audits
5. Version control for color system changes
