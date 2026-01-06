# Umiya Dham Tarana Temple Website - Design Guidelines

## Design Approach
**Reference-Based with Cultural Authenticity**: Drawing from spiritual/cultural websites while honoring traditional Hindu temple aesthetics. Prioritize warmth, accessibility, and reverence over modern minimalism.

## Core Design Principles
1. **Cultural Respect**: Traditional patterns, appropriate iconography, dignified presentation
2. **Accessibility**: Clear hierarchy for diverse age groups, large touch targets
3. **Warmth**: Welcoming atmosphere befitting a place of worship

## Typography
- **Headings**: Poppins or Noto Sans Devanagari (supports both English & Hindi), weights 600-700
- **Body Text**: Inter or Noto Sans, weight 400-500, generous line-height (1.6-1.8)
- **Sizes**: Hero (text-4xl to text-6xl), Section headings (text-2xl to text-3xl), Body (text-base to text-lg)

## Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16, 20 (p-4, mb-8, py-12, etc.)
- Section padding: py-12 (mobile), py-16 to py-20 (desktop)
- Content containers: max-w-7xl with px-4 to px-8
- Cards/components: p-6 to p-8

## Home Page Structure

### 1. Top Ribbon Header
- Sticky navigation with language switcher (EN/HI toggle) in top-right
- Temple name and logo centered or left-aligned
- Navigation links: Home, About Us, Tourism, Donation
- Height: h-20, clean white/light background with subtle bottom border

### 2. Hero Slider Section
- Full-width carousel (h-[500px] to h-[600px] desktop, h-[400px] mobile)
- Up to 3 temple images with smooth transitions (5s auto-advance)
- Overlay: subtle dark gradient (bottom) for text readability
- Center-aligned temple name/tagline with large typography
- Navigation dots at bottom-center

### 3. About Temple Section
- Two-column layout (desktop): Left - temple image, Right - text content
- Single column (mobile) with image on top
- Generous padding, max-w-6xl container
- "Read More" link to full About Us page

### 4. Pooja Timings Section
- Card-based design with decorative border (subtle orange accent)
- Grid layout: Morning Aarti, Evening Aarti, Special Pujas
- Each timing card: Icon/symbol, time display (large text), description
- Background: light cream/off-white for contrast

### 5. Our Services Section
- Three-column grid (desktop), single column (mobile)
- Service cards: Darshan Timing, Pooja Services, Accommodation
- Each card: Decorative icon, title, brief description, "Learn More" link
- Hover effect: subtle lift (shadow-lg transition)

### 6. Temple Gallery Section
- Tabbed interface: Photos | Videos
- Photo grid: 3-4 columns (masonry style preferred), lightbox on click
- Video grid: 2-3 columns with thumbnail and play overlay
- "View Full Gallery" CTA button

### 7. Footer
- Dark background with orange accent elements
- Multi-column layout: Contact Info, Quick Links, Temple Timings, Social Media
- Bottom bar: "Powered by KrashuVed Pvt. Ltd." centered with small logo
- Footer height: adequate breathing room (py-12)

## Component Library

### Buttons
- Primary (Donation, CTA): Orange background, white text, rounded-lg, px-6 py-3
- Secondary (Learn More): Orange border, orange text, transparent background
- Blurred background for buttons over images

### Cards
- White background, shadow-md, rounded-xl
- Padding: p-6 to p-8
- Border accent: 2px top border in orange for emphasis

### Icons
- Use Material Icons or Heroicons via CDN
- Size: 24px to 32px for section icons
- Orange color matching theme

## Images Strategy

### Required Images:
1. **Hero Slider**: 3 high-quality temple photos (exterior, deity, celebrations)
2. **About Section**: 1 temple architecture/deity photo
3. **Gallery**: Multiple temple photos and videos (admin-managed)
4. **Service Icons**: Decorative traditional symbols

### Image Treatment:
- Subtle rounded corners (rounded-lg)
- Respectful, well-lit photography
- Aspect ratios: Hero (16:9), Cards (4:3), Gallery (varied)

## Accessibility
- High contrast text (WCAG AA minimum)
- Focus states on all interactive elements
- Alt text for all images (especially deity images)
- Clear language switcher with visual indicator of active language

## Key Design Notes
- No distracting animations; use subtle fades and transitions only
- Maintain traditional dignity while being modern and clean
- Ensure admin-editable sections have clear visual boundaries
- Mobile-first responsive design throughout