# Veritas-X - Figma Design Implementation

This project implements the LitCollective design from Figma, adapted for the Veritas-X brand.

## Design Features Implemented

- ✅ Black background with white text
- ✅ Navigation bar with logo and menu items
- ✅ Hero section with large headline
- ✅ Call-to-action buttons
- ✅ Footer with social media links
- ✅ Google Fonts (Manrope & Roboto)
- ✅ Desktop-first responsive design

## Image Assets Setup

The design uses placeholder images that need to be replaced with actual Figma exports:

### Required Images to Export from Figma:

1. **Logo** → Save as `public/images/logo.png`
2. **Hero background graphics** → Save as `public/images/hero-graphic.png`
3. **Decorative assets** → Save as `public/images/asset-1.png` and `public/images/asset-2.png`
4. **Social media icons** → Export individual icons for Behance, Dribbble, Twitter, Instagram, Medium
5. **Arrow icon** → Already created as SVG placeholder

### How to Export Images from Figma:

1. Select the image/asset in Figma
2. Right-click → "Export" or use the Export panel
3. Choose PNG or SVG format as appropriate
4. Download and place in the `public/images/` directory
5. Update the Image components in `page.tsx` to reference the correct filenames

### Original Figma Asset URLs (for reference):
The original Figma design used these localhost URLs - you can download these if they're still accessible:
- Main logo: `http://localhost:3845/assets/5f0145b9274c9f60f1babf48a64858310f5d62cd.png`
- Decorative assets: Multiple PNG files
- Arrow icon: `http://localhost:3845/assets/f8388c8ab703b8c627a14417030f4bcf3dc669fd.svg`

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

## Fonts

- **Manrope**: Used for headlines and main text (ExtraLight weight)
- **Roboto**: Used for navigation and buttons
- Loaded via Google Fonts with optimized font loading

## Color Scheme

- Background: `#000000` (Black)
- Text: `#ffffff` (White)
- Accent: `#3549cb` (Blue for CTA button)
- Gray elements: Various gray shades for decorative elements

## Next Steps

1. Replace placeholder images with actual Figma exports
2. Customize the branding text for your specific needs
3. Add any missing interactive functionality
4. Optimize for mobile responsiveness if needed
