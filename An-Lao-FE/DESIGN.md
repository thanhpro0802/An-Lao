---
name: Serene Trust
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#3d4943'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#6d7a73'
  outline-variant: '#bccac1'
  surface-tint: '#006c4e'
  primary: '#00694c'
  on-primary: '#ffffff'
  primary-container: '#008560'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dbae'
  secondary: '#42655a'
  on-secondary: '#ffffff'
  secondary-container: '#c4ebdd'
  on-secondary-container: '#486b60'
  tertiary: '#555e5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d7674'
  on-tertiary-container: '#f5fefb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#86f8c9'
  primary-fixed-dim: '#68dbae'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#00513a'
  secondary-fixed: '#c4ebdd'
  secondary-fixed-dim: '#a9cfc1'
  on-secondary-fixed: '#002019'
  on-secondary-fixed-variant: '#2a4d43'
  tertiary-fixed: '#dbe4e2'
  tertiary-fixed-dim: '#bfc8c6'
  on-tertiary-fixed: '#151d1c'
  on-tertiary-fixed-variant: '#404947'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  display:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  pricing-display:
    fontFamily: Lexend
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin: 32px
  section-gap: 64px
---

## Brand & Style

The design system is anchored in the concepts of "An" (Peace) and "Lão" (Longevity), focusing on the emotional needs of elderly users and their families. The brand personality is compassionate, professional, and exceptionally stable. 

The visual style follows a **Minimalist Modern** approach. It prioritizes clarity over decoration, utilizing expansive white space to reduce cognitive load. By combining the precision of medical professionalism with the warmth of a dedicated caregiver, the interface evokes a sense of security and reliability. The aesthetic avoids complex layers or distracting animations, favoring a flat, structured layout that feels grounded and easy to navigate for users with varying levels of digital literacy.

## Colors

The palette is dominated by the primary Teal Green (#1D9E75), chosen for its association with health, vitality, and tranquility. This color is used for primary actions and brand identifiers. 

The design system utilizes a high-contrast light mode with a "Pure White" background (#FFFFFF) to ensure maximum text-to-background contrast. A deep Secondary Teal is reserved for professional headers and deep-set text, while a soft Tertiary Mint acts as a subtle container background to differentiate sections without using heavy lines.

For status indicators, the system employs a binary logic:
- **Green (Success/Feature):** Used for active services and positive health metrics.
- **Red (Warning/Critical):** Used for alerts, emergency contacts, or missing information.

## Typography

The design system exclusively uses **Lexend**, a font family specifically engineered to reduce visual stress and improve reading speed. Given the elderly target demographic, the typographic scale starts at a base of 18px, significantly larger than standard web applications.

Line heights are generous (1.6 for body text) to prevent "line crowding," which can be difficult for aging eyes. Headlines are bold and clear, ensuring that the information hierarchy is immediately obvious. For numerical data, specifically in pricing and medical measurements, the system uses a distinctive heavy weight to ensure those critical values are the first things a user notices on the page.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model to ensure predictable placement of elements, which aids in building muscle memory for elderly users. The design system utilizes a 12-column grid for desktop and a single-column stack for mobile.

Spacing is governed by an 8px rhythmic scale. Generous internal padding within cards and containers is mandatory to create large "hit areas" for interactive elements, accommodating users with reduced motor precision. A consistent 64px gap is used between major sections to provide a clear visual break and prevent the interface from feeling cluttered or overwhelming.

## Elevation & Depth

The design system minimizes the use of complex shadows to maintain a clean, professional aesthetic. Instead, it relies on **Low-contrast outlines** and **Tonal layering**. 

Depth is achieved through:
- **Surface Borders:** Components like cards use a 1px solid border in a soft grey (#E2E8F0) rather than a shadow.
- **Active State:** When an element is focused or active, the border thickens or changes to the primary teal green.
- **Layering:** Occasional use of "Level 1" shadows (very soft, 10% opacity, no spread) is permitted only for floating elements like navigation bars or primary action modals to separate them from the content layer.

## Shapes

The design system employs a **Rounded** shape language. This softens the professional tone, making the platform feel more approachable and less "clinical."

Standard components like buttons and input fields use a 0.5rem (8px) radius. Larger components like cards or feature banners use a 1rem (16px) radius. This consistent curvature provides a friendly visual metaphor for care and safety, avoiding the harshness of sharp corners which can feel aggressive or overly institutional.

## Components

### Buttons
Buttons are oversized with a minimum height of 56px to ensure accessibility. Primary buttons use a solid Teal Green background with white text. Secondary buttons use the Teal Green for the border and text against a white background.

### Cards
Cards are the primary content vessel. They must feature a white background, a subtle 1px border (#E2E8F0), and 32px of internal padding. Content inside cards should be vertically stacked to maintain a clear reading path.

### Status Badges
Badges are pill-shaped and high-contrast. 
- **Active/Feature:** Primary Teal background with white text.
- **Warning:** Red background (#EF4444) with white text. 
Labels must be in Lexend Bold, uppercase, with 14px size for immediate legibility.

### Pricing Displays
Pricing is a hero element. It should be displayed in the `pricing-display` type style, colored in the Secondary Teal (#2A4D43) to stand out from the Primary Teal used for buttons. Currency symbols should be slightly smaller than the numerical value.

### Inputs & Selection
Checkboxes and radio buttons are scaled up to 125% of standard size. Input fields include a thick 2px border on focus to provide high-visibility feedback for the user.