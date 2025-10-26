# PB Tech Case

This is a React Native application built with Expo Router.

## Prerequisites

- Node.js (using version 22)
- npm to manage the dependencies
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pb-tech-case
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

1. Start the development server:

```bash
npx expo start
```

2. Run on specific platforms:

- Press `i` to run on iOS simulator
- Press `a` to run on Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

- `/app` - Contains the application routes and layouts
  - `_layout.tsx` - Root layout component with navigation configuration
  - `index.tsx` - Home screen
  - `result.tsx` - Result screen

## Features

- Expo Router for navigation
- Custom font integration (Montserrat)
- Form context for state management

## Notes

- The application uses Expo Router's file-based routing system
- Montserrat font is loaded using `@expo-google-fonts/montserrat`
- A form context is implemented for state management
