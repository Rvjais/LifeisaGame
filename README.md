# Life Is A Game – Goal Tracker & Gamification

A React Native app for daily goal tracking with a minimalistic, grayscale design and a weighted point system to motivate you to exceed your baseline.

## Features

- **Goal Setting**: Three core daily goals (didn't smoke, exercised, woke up early)
- **Weighted Points**: Different point values per goal difficulty
- **Completion Tracking**: Tick off goals each day
- **Persistent History**: All daily entries saved locally
- **Progress Stats**: Track average, best, and baseline points to stay motivated
- **Minimalist UI**: Clean grayscale palette for focus

## Goals & Points

| Goal | Points |
|------|--------|
| Didn't smoke today | 100 |
| Did exercise / exercised | 30 |
| Woke up early | 70 |

**Baseline**: Automatically calculated as the higher of your average or 50 points. Exceed it each day to stay motivated!

## Getting Started

### Prerequisites

- Node.js (v14+)
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Navigate to the project directory
cd LifeIsaGame

# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm start

# On Android (requires Android emulator or device)
npm run android

# On iOS (requires macOS and Xcode)
npm run ios

# On Web
npm run web
```

### Usage

1. **Toggle Goals**: Tap the checkbox next to each goal to mark it complete
2. **View Stats**: See today's points, baseline, average, and best day
3. **Save Day**: Tap "Save Day" to record today's completion and points in history
4. **Track Progress**: History is stored locally and used to calculate your baseline and average

## Architecture

```
/components
  ├─ GoalItem.js        # Individual goal row component
  └─ Stats.js           # Statistics display (today, baseline, progress)

/utils
  └─ storage.js         # AsyncStorage persistence helper

/App.js                 # Main app logic & state management
/package.json           # Dependencies & scripts
```

## Design Philosophy

- **Grayscale Palette**: Eliminates distractions, focuses user on goals (#222, #666, #f6f6f6, etc.)
- **Minimal**: Clean typography, simple interactions
- **Motivational**: Baseline comparison and progress bar encourage daily excellence

## Tech Stack

- **React Native** (0.71.8)
- **Expo** (48.0.0)
- **AsyncStorage** (for persistence)

## Future Enhancements

- Custom goal creation
- Streaks & achievement badges
- Weekly/monthly summaries
- Dark mode toggle
- Goal categories and filtering
- Export history to CSV

## License

MIT
