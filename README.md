# BSP Attendance — Contract Labour & Staff Attendance Tracker

A mobile-first attendance management and manpower tracking application for **BSP Metatech LLP, Chakan**. Built with a **Vite + TypeScript** web layer wrapped natively on Android using **Capacitor** and **Capacitor Preferences**.

Designed specifically for HR trainees and site supervisors to eliminate manual logbook sifting and generate formatted **morning manpower reports before the 11:00 AM daily deadline**.

---

## 1. Problem & Context

At BSP Metatech LLP (manufacturing plant in Chakan), contract labourers are supplied by **four contractors** (Contractor A, B, C, D) and assigned dynamically across work departments (Welding, Laser, Bending, Painting, Fitting, Fabrication, Assembly, etc.) under different supervisors and shifts (Day / Night).

Previously, tracking required manually flipping through four separate paper logbooks every morning. This application allows:
1. **Pre-maintaining the roster**: Adding staff and contract labourers with contractor, work type, supervisor, and shift details beforehand.
2. **Fast field verification**: Opening the app on a mobile phone during morning rounds and ticking workers present with a single tap.
3. **Instant tallies & reporting**: Automatically computing staff, labour, contractor, work-type, shift, and absent figures, and copying the final formatted morning report to the clipboard.

---

## 2. Architecture & Technology Stack

```
+-------------------------------------------------------------------------+
|                              Android App                                |
|  +-------------------------------------------------------------------+  |
|  |                 Capacitor Native Shell (BridgeActivity)           |  |
|  |  +-------------------------------------------------------------+  |  |
|  |  |                      Android WebView                        |  |  |
|  |  |  +-------------------------------------------------------+  |  |  |
|  |  |  |       Vite + TypeScript Web Layer (dist/)             |  |  |  |
|  |  |  |  - Roster & Attendance State Management               |  |  |  |
|  |  |  |  - Today Checklist View & Tally Bar                   |  |  |  |
|  |  |  |  - Roster Management (Add/Edit/Delete)               |  |  |  |
|  |  |  |  - Morning Manpower Report Generator                  |  |  |  |
|  |  |  +-------------------------------------------------------+  |  |  |
|  |  +-------------------------------------------------------------+  |  |
|  |              | Bridge IPC                                         |  |
|  |  +-----------v-------------------------------------------------+  |  |
|  |  |          @capacitor/preferences (Native SharedPreferences)  |  |  |
|  |  +-------------------------------------------------------------+  |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
```

- **Frontend Framework**: Vanilla TypeScript with reactive state store and CSS variables.
- **Build Tool**: Vite 6.
- **Mobile Runtime**: Capacitor 8 (`@capacitor/core`, `@capacitor/android`).
- **Persistence**: `@capacitor/preferences` (backed by Android native `SharedPreferences` on device, with automatic `localStorage` fallback in web browser development).
- **Android Gradle**: AGP 9.3.2, compileSdk 37, minSdk 26, Java 21.

---

## 3. Storage Keys & Data Schema

The app strictly preserves the original data shapes and keys:

### Roster Key: `'roster'`
Stored as a serialized JSON array of `Worker` objects:
```json
[
  {
    "id": "wmtue74n9jih1",
    "name": "Ramesh Kumar",
    "category": "labor",
    "contractor": "Contractor A",
    "work": "Welding",
    "shift": "Day",
    "supervisor": "Patil"
  },
  {
    "id": "wmtue85a1bc23",
    "name": "Suresh Deshmukh",
    "category": "staff",
    "shift": "Day",
    "supervisor": "Jadhav"
  }
]
```

### Attendance Key: `'attendance:YYYY-MM-DD'` (e.g. `'attendance:2026-09-09'`)
Stored as a serialized JSON array of present worker IDs:
```json
["wmtue74n9jih1", "wmtue85a1bc23"]
```

---

## 4. Project Structure

```
BSPAttendance/
├── app/                                 # Android application module
│   ├── src/main/
│   │   ├── AndroidManifest.xml          # Configured for Capacitor BridgeActivity
│   │   ├── java/com/gratus/bspattendance/
│   │   │   └── MainActivity.kt          # Extends com.getcapacitor.BridgeActivity
│   │   ├── res/
│   │   │   └── values/themes.xml        # Theme.AppCompat.Light.NoActionBar
│   │   └── assets/
│   │       ├── capacitor.config.json    # Capacitor Android runtime config
│   │       ├── capacitor.plugins.json   # Registered plugins (Preferences)
│   │       └── public/                  # Synced web bundle from dist/
│   └── build.gradle.kts                 # Android Gradle module build config
├── src/                                 # Web application source (TypeScript)
│   ├── types.ts                         # Worker, Category, Shift, AppState interfaces
│   ├── constants.ts                     # Contractors, Work types, Company title, Storage keys
│   ├── storage.ts                       # Capacitor Preferences wrapper
│   ├── state.ts                         # Reactive application store & methods
│   ├── utils.ts                         # Date formatting, HTML escaping, clipboard helpers
│   ├── views/
│   │   ├── topBar.ts                    # Header & Tally Bar (Staff / Labor / Total)
│   │   ├── todayView.ts                 # Daily attendance checklist with checkboxes
│   │   ├── rosterView.ts                # Roster list & Add/Edit form
│   │   ├── reportView.ts                # Manpower report text generator & copy button
│   │   └── tabs.ts                      # Bottom navigation tabs (Today, Roster, Report)
│   ├── style.css                        # Mobile-first CSS with safe area insets
│   └── main.ts                          # App initialization & DOM event delegation
├── dist/                                # Compiled web assets
├── capacitor.config.ts                  # Capacitor CLI configuration (android.path: '.')
├── vite.config.ts                       # Vite configuration
├── tsconfig.json                        # Strict TypeScript configuration
├── package.json                         # Node dependencies and scripts
├── build.gradle.kts                     # Root Android build file
├── settings.gradle.kts                  # Gradle settings (applies capacitor.settings.gradle)
└── capacitor.settings.gradle            # Auto-generated by Capacitor CLI linking plugins
```

---

## 5. Development & Build Commands

### Prerequisites
- Node.js 18+ and npm
- Java JDK 19+ (Java 21 compatible)
- Android SDK with platform tools (`adb`)

### Web Development (Fast Browser Testing)
Run the Vite development server with hot module replacement:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser. Capacitor Preferences automatically falls back to browser `localStorage` during web development.

### Compile Web Layer
Check TypeScript types and produce production bundles in `dist/`:
```bash
npm run build
```

### Sync Web Assets to Android
Copies `dist/` into `app/src/main/assets/public/` and updates native plugin links:
```bash
npm run cap:sync
```

### Build Android APK
Compile the native Android debug APK:
```bash
.\gradlew assembleDebug
```
The resulting APK is generated at:
`app/build/outputs/apk/debug/app-debug.apk`

### Deploy & Run in Android Emulator
1. Ensure the emulator is running (`adb devices`).
2. Run the one-step build, sync, and deploy script:
```bash
npm run android:run
```
Or manually:
```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.gratus.bspattendance/.MainActivity
```

---

## 6. Daily HR Morning Workflow (Before 11:00 AM)

1. **Advance Preparation (Roster Tab)**:
   - Tap **+ Staff** to add company staff with their reporting supervisor.
   - Tap **+ Laborer** to add contract labourers with Contractor, Work Assignment, Supervisor, and Shift.
2. **Morning Round (Today Tab)**:
   - As you visit departments or check in at the floor, simply tap each worker's card.
   - Tapping toggles their presence instantly and updates the top tally counts (Staff present, Labor present, Total on floor).
   - Data persists immediately to native storage.
3. **Generate Report (Report Tab)**:
   - Switch to **REPORT** to review the automatically organized breakdown:
     - Contractor-wise attendance
     - Work/department breakdown for present labourers
     - Day vs. Night shift split
     - Specific list of absent staff and labourers
   - Tap **Copy Report Text** to copy the report to the clipboard and paste it directly into WhatsApp, Email, or the HR morning submission portal before 11:00 AM.
