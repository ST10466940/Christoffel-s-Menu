Christoffel’s Menu — Part 1 & Part 2 (React Native / Expo)

A cross-platform mobile app for a private chef to add nightly menu items and show the current menu with a live total count.
Built with Expo (React Native + TypeScript).

Assignment scope: This repo implements Part 1 (UI plan) and Part 2 (basic features).
Final PoE items (separate Add screen, delete, filter, averages, persistence) are listed under Roadmap.

Demo video

YouTube link: https://www.youtube.com/watch?v=1le0i9xb1cc

Features (Part 2 delivered)

 Add Menu Item form on Home screen (as required for Part 2)

Dish Name, Description, Course (predefined list), Price (ZAR)

 Predefined Courses: Starters, Mains, Dessert

 Menu List shows all added dishes (card layout with course chip + price)

 Total Items badge updates dynamically

 Validation with if-statements (name required, price > 0, valid course)

 In-memory state (no hardcoded data; no persistence)

 Subtle animation on add (LayoutAnimation)

Not included (by design for Part 2): delete items, separate Add screen, average prices, filter screen, persistent storage.

How this maps to the rubric
Requirement	Where it’s implemented
Enter Dish Name, Description, Course, Price	Home → Add Menu Item form
Predefined list of courses	COURSES = ['Starters','Mains','Dessert'] + Picker
Home screen displays the menu	“Tonight’s Menu” (FlatList)
Home shows total number of items	Total Items pill at top
Add items on the home page (Part 2 only)	Form lives on Home; items append to state
Tech Stack

Expo (React Native)

TypeScript

@react-native-picker/picker (course dropdown)

LayoutAnimation (native list animation)

Getting Started
Prerequisites

Node.js LTS (check: node -v, npm -v)

Expo CLI (bundled via npx expo ...)

(Optional) Android Studio or a physical Android device with Expo Go

Install
git clone https://github.com/<your-username>/christoffel-menu.git
cd christoffel-menu
npm install
npm i @react-native-picker/picker

Run (fastest) — phone with Expo Go
npx expo start
# scan the QR with Expo Go (Android) on the same Wi-Fi


If your network blocks LAN discovery:

npx expo start --tunnel

Run — Android emulator

Start an Android emulator (Pixel + Android 14 Google Play).

In the project terminal:

npx expo start
# press "a" to open Expo Go in the emulator

Run — Web (for quick UI checks)
npx expo start --web

Expo Snack (browser)

You can also run this in Snack.

Create App.tsx and paste the app code.

Add dependency: @react-native-picker/picker.

If you prefer JS, remove TypeScript generics or use the JS version.

Project Structure
christoffel-menu/
  App.tsx                 # main screen (Home + Add form + list)
  package.json
  .gitignore

How to demo (script for your video)

Open the app → point to Total Items = 0.

Add a valid dish (name, description, course via Picker, price) →
list animates in; Total Items increments.

Add another dish in a different course → show course chip and formatted price (e.g., R 195.00).

Try invalid input (blank name or price 0) → show the Alert.

Summarise that data is not hardcoded and exists only for the current session (in-memory), as required.

Data Model (TS)
type Course = 'Starters' | 'Mains' | 'Dessert';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}

Accessibility & UX

Clear labels and placeholders

Numeric keyboard for price

High-contrast CTA, large hit areas

Validation messages via Alert

Subtle animation on list changes

Troubleshooting

Parsing error in Snack: use App.tsx (TypeScript) or remove TS generics in JS.

Emulator slow: prefer a physical device for your video.

Expo can’t find device: use --tunnel or ensure same Wi-Fi.

Picker not found: run npm i @react-native-picker/picker and restart bundler.

Roadmap (Final PoE)

Move Add form to a separate screen (React Navigation)

Delete items from the list

Average price by course

Filter by course (separate page for guests)

Optional persistence (AsyncStorage or backend)
