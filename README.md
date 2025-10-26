# PB Tech Case – React Native Application

A mobile application built with **React Native** and **Expo Router** to calculate and display the **FGTS Saque-Aniversário** for users based on their account balance.

## About

The **Saque-Aniversário** is a scheme that allows Brazilian workers to withdraw a portion of their **FGTS** balance during their birthday month.

This app allows users to:

- Enter their personal details and FGTS balance
- Validate their phone number via **Abstract API – Phone Validation**
- View their expected Saque-Aniversário amount

## Features

- Two screens with navigation:
  - **Home Screen** – Form for user inputs
  - **Result Screen** – Displays calculation results
- Form validation with **Yup**
- Phone number validation using **Abstract API**
- **AsyncStorage** caching for form data
- Custom fonts with **Montserrat**
- Responsive layout for iOS and Android
- Unit testing setup with **Jest** and **React Native Testing Library**

## Prerequisites

- Node.js (v22 recommended)
- npm
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

## Installation

1. Clone the repository:

```bash
cd pb-tech-case
```

2. Install dependencies (use legacy peer deps due to temporary conflicts):

```bash
npm install --legacy-peer-deps
```

## Running the App

1. Start the Expo development server:

```bash
npx expo start
```

2. Run on your desired platform:

- Press i → iOS Simulator
- Press a → Android Emulator
- Scan the QR code → Physical device with Expo Go

## Project Structure

```bash
/app
 ├─ _layout.tsx       # Root layout with navigation setup
 ├─ index.tsx         # Home screen with form
 ├─ result.tsx        # Result screen showing Saque-Aniversário
/components           # Reusable UI components
/context              # ContextAPI
/hooks                # Custom React hooks
/services             # API and storage services
```

## Calculation Rules

| FGTS Balance             | Withdrawal Formula        |
| ------------------------ | ------------------------- |
| Up to R$ 500             | 50% of balance            |
| R$ 500,01 – R$ 1.000     | 40% of balance + R$ 50    |
| R$ 1.000,01 – R$ 5.000   | 30% of balance + R$ 150   |
| R$ 5.000,01 – R$ 10.000  | 20% of balance + R$ 650   |
| R$ 10.000,01 – R$ 15.000 | 15% of balance + R$ 1.150 |
| R$ 15.000,01 – R$ 20.000 | 10% of balance + R$ 1.900 |
| Above R$ 20.000          | 5% of balance + R$ 2.900  |

Example: A worker with R$ 1,000 can withdraw R$ 400 + R$ 50 = R$ 450.

## Testing

- Jest and @testing-library/react-native used
- Basic test setup included
- Example scenarios to test:
  - Form input validation
  - Phone number API validation
  - Correct calculation of Saque-Aniversário
  - Navigation between screens

## Notes

- Uses Expo Router’s file-based navigation system
- Uses React Context API for state management
- Follows best practices for component reuse and clean code
- Supports both iOS and Android
- Responsive design for various screen sizes

## API Setup

1. Create a free account at Abstract API [https://www.abstractapi.com/api/phone-validation-api]
2. Generate your API TOKEN
3. Create a .env file following the .env.example and fill the API Key
