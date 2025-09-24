# Design Guidelines: Dark Avant-Garde Art Exhibition Website

## Design Approach
**Reference-Based Approach**: Inspired by minimalist art galleries and experimental digital art spaces like contemporary museum websites and artistic Tumblr themes. Drawing from the aesthetic of black and white photography exhibitions with emphasis on negative space and visual rhythm.

## Core Design Elements

### A. Color Palette
**Dark Mode Only** (as specifically requested):
- **Primary**: 0 0% 8% (deep charcoal background)
- **Secondary**: 0 0% 15% (elevated surfaces)
- **Text**: 0 0% 95% (near-white for primary text)
- **Muted Text**: 0 0% 65% (grey for secondary text)
- **Accent**: 0 0% 25% (subtle grey for borders/dividers)

### B. Typography
- **Primary Font**: Inter or Helvetica Neue via Google Fonts CDN
- **Headings**: Light weight (300), generous letter-spacing
- **Body**: Regular weight (400), increased line-height for readability
- **Artistic Text**: Italic variations for image captions

### C. Layout System
**Tailwind Spacing**: Consistent use of units 4, 8, 16, 24 for rhythm
- Vertical spacing: py-16, py-24 between major sections
- Content padding: px-8, px-16 for responsive margins
- Element spacing: gap-4, gap-8 for component spacing

### D. Component Library

#### Core Elements
- **Scroll Container**: Full viewport height sections with smooth scroll behavior
- **Image Blocks**: Full-width containers with subtle fade-in animations
- **Text Overlays**: Minimal typography floating over or beside imagery
- **Video Player**: Seamless integration with custom dark controls
- **Navigation**: Subtle scroll indicators only, no traditional menu

#### Layout Patterns
- **Continuous Flow**: No traditional sections, seamless transitions
- **Asymmetric Composition**: Images and text positioned with artistic spacing
- **Breathing Room**: Generous whitespace between content blocks
- **Progressive Reveal**: Content appears as user scrolls down

### E. Animations
**Minimal and Purposeful**:
- Subtle fade-in effects for images as they enter viewport
- Smooth scroll behavior between content blocks
- Gentle parallax on select background elements
- No hover animations - maintain static, gallery-like feel

## Images
**Artistic Black and White Photography**:
- **Hero Section**: Large atmospheric black and white image (full viewport)
- **Gallery Blocks**: 3-4 carefully curated images integrated throughout scroll
- **Image Treatment**: High contrast, artistic composition, minimal processing
- **Video Integration**: Black and white or desaturated video content
- **Placement**: Images should flow naturally within the scroll, not in traditional grid layouts

**No Large Hero Image**: Instead, the entire page functions as one continuous artistic experience with multiple focal points throughout the scroll journey.

## Key Principles
1. **Negative Space**: Embrace emptiness as a design element
2. **Artistic Flow**: Content should feel like walking through a gallery
3. **Minimal Interaction**: Focus on scroll-based discovery
4. **Emotional Pacing**: Rhythm between images, text, and empty space
5. **Seamless Experience**: No jarring transitions or traditional web patterns