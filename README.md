# Survey Campaign Builder

A modern, dynamic React application that allows users to seamlessly build survey campaigns with a live, real-time updating mobile preview.

## Features

- **Split Pane UI**: Left panel for building the campaign, right panel for the live mobile view.
- **Content Builder**:
  - Add/Remove Survey Questions dynamically.
  - Define custom Question titles, subtitles, options.
  - Granular conditional logic rules (e.g. If "Option A" is selected, redirect to Thank You page).
  - Configurable Thank You Page with media uploading.
- **Styling Configurator**:
  - Extensive real-time CSS/Style injection testing engine.
  - Over 70 customizable fields across: Appearance, Typography (Font families, sizes, styles), Borders, Margins, Corner Radii, Alignments, Backgrounds, Drop-shadow backdrops, etc.
  - Option layouts: Radio, Checkbox, Filled, and Alternative styles.
- **Live Mobile Preview**:
  - Instant transition animations.
  - Fully mapped inline styling engine reflecting 100% of the builder's state properties.

## Tech Stack

- **Framework**: React.js (v18)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 & custom inline styling mapping.
- **State Management**: React Context API
- **Icons**: Lucide-React

## Folder Structure

```
├── src/
│   ├── components/
│   │   ├── Builder/
│   │   │   ├── BuilderPanel.jsx    # The main Left Pane wrapper & Tabs
│   │   │   ├── ContentTab.jsx      # Content generation forms
│   │   │   └── StylingTab.jsx      # Customization & design forms
│   │   └── Preview/
│   │       └── LivePreview.jsx     # Right pane mobile simulator
│   ├── context/
│   │   └── SurveyContext.jsx       # Central state store handling logic and styling
│   ├── App.jsx                     # Layout Root
│   ├── main.jsx                    # React DOM Root
│   └── index.css                   # Global Tailwind configuration
├── package.json
└── vite.config.js
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/survey-campaign-builder.git
   cd survey-campaign-builder
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   *The app will run locally on `http://localhost:5173`.*

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Deployment Link
- https://survey-campaign-builder.vercel.app/
