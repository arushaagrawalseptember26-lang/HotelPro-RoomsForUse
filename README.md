# HotelPro - Complete Hotel Booking and Management Solution
### UI Branding: **RoomsForUse**
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://react.dev)
[![Architecture](https://img.shields.io/badge/Architecture-MVC%20Decoupled-teal.svg)](https://expressjs.com)
[![SkillWallet](https://img.shields.io/badge/SkillWallet-19%20Tasks%20%2F%206%20Epics-success.svg)](https://myskillwallet.ai)

---

## 🏨 1. Executive Summary & Overview
**HotelPro** (branded in the UI as **RoomsForUse**) is an enterprise-grade, end-to-end full-stack hospitality reservation and hotel management platform built with the **MERN** stack (MongoDB, Express.js, React.js, and Node.js). 

The platform bridges ordinary travelers seeking seamless luxury room bookings and hotel administrators requiring centralized visibility across room inventories, guest registries, and revenue analytics.

### Key Capabilities:
- **Dynamic Room Discovery:** Real-time inventory browsing with multi-parameter category filtering (*Delux*, *Non-Delux*, *Luxury*, *Ordinary*), keyword search, and price sorting.
- **Duration Math & Payment Simulation:** Automatic check-in/out date difference calculations (`totaldays = todate - fromdate`), instant price computation (`totalAmount = totaldays * rent`), and credit card checkout simulation.
- **Reservation Portfolio & Self-Service Cancellation:** Personal booking history with color-coded status badges (`BOOKED` in green, `CANCELLED` in red), and instant cancellation that atomically frees up reserved room dates.
- **4-Tab Administrative Control Center:** Single-pane-of-glass administrative hub for auditing all reservations (*Tab 1: All Bookings*), reviewing room catalogs (*Tab 2: All Rooms / Booking History*), provisioning new rooms (*Tab 3: Add Room*), and managing registered accounts (*Tab 4: All Users*).
- **Stateless JWT Security & RBAC:** Cryptographic JSON Web Token (JWT) session authorization and 10-round salted Bcrypt password hashing safeguarding administrative and customer endpoints.
- **Automated SkillWallet Documentation Engine:** Python script (`build_skillwallet_docs.py`) compiling 19 professional, evaluation-ready `.docx` deliverables across all 6 Epics.

---

## 🛠️ 2. Production Tech Stack

| Tier | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend SPA** | React.js 18 (Vite 5) | Component-driven UI, sub-second HMR, and virtual DOM |
| **Client Routing** | React Router DOM v6 | Declarative routing with `ProtectedRoute` guards |
| **HTTP Client** | Axios 1.6+ | REST client with automated JWT request interceptors |
| **Application Server** | Node.js 20+ & Express 4 | Non-blocking MVC REST API and middleware pipeline |
| **Database & ODM** | MongoDB & Mongoose 8 | Document storage with schema constraints and auto-reconnect loop |
| **Security & Auth** | Bcryptjs & JSON Web Token | Salted password hashing and stateless Bearer authorization |
| **Theme & UI** | Custom Responsive CSS Tokens | Deep Indigo (`#1a365d`), Electric Blue (`#2563eb`), modern card grids |
| **Documentation** | Python 3 (`python-docx`) | Automated compilation of all 19 SkillWallet submission `.docx` files |

---

## 📂 3. Repository Architecture

```text
HotelPro/
├── client/                           # React 18 Single Page Application (Vite)
│   ├── public/                       # Static public assets
│   ├── src/
│   │   ├── assets/                   # Vector graphics and icons
│   │   ├── components/
│   │   │   ├── common/               # Navbar, Footer, ProtectedRoute, HeroCarousel, RoomCard, About
│   │   │   ├── auth/                 # Login, SignUp (Split-card with vector illustration)
│   │   │   ├── user/                 # UserHome, MyBookings, BookingModal, BookingStatus
│   │   │   └── admin/                # AdminHome (Tabs: All Bookings, All Rooms, Add Room, Users)
│   │   ├── context/                  # AuthContext (JWT session state & user profile)
│   │   ├── services/                 # Axios API Client & centralized endpoint functions
│   │   ├── App.jsx                   # Central declarative routing definitions
│   │   ├── main.jsx                  # React DOM root bootstrapping
│   │   └── index.css                 # Modern CSS tokens, utility classes, and components
│   ├── index.html                    # HTML5 entry template
│   ├── package.json                  # Frontend dependencies and run scripts
│   └── vite.config.js                # Vite build configuration and API reverse proxy
│
├── server/                           # Node.js + Express REST API Backend (MVC)
│   ├── config/
│   │   └── db.js                     # Resilient Mongoose connection with retry loop
│   ├── controllers/
│   │   ├── authController.js         # User registration, JWT login, and profile fetching
│   │   ├── roomController.js         # Room discovery, room creation, and deletion
│   │   ├── bookingController.js      # Booking reservation, stay math, cancellation logic
│   │   └── adminController.js        # User registry, booking audit, and KPI metrics
│   ├── middlewares/
│   │   ├── fetchUser.js              # Cryptographic JWT authentication middleware
│   │   └── roleCheck.js              # Admin vs Customer authorization guards
│   ├── models/
│   │   ├── userModel.js              # User Mongoose Schema (name, email, password, role)
│   │   ├── roomModel.js              # Room Schema (roomNumber, count, rent, currentbooking)
│   │   └── bookingModel.js           # Booking Schema (dates, totaldays, cardDetails)
│   ├── routes/
│   │   ├── authRoutes.js             # /api/user/SignUp, /api/user/Login
│   │   ├── roomRoutes.js             # /api/rooms/getrooms, /api/rooms/addroom
│   │   ├── bookingRoutes.js          # /api/bookings/bookroom, /cancelbooking
│   │   └── adminRoutes.js            # /api/admin/allusers, /api/admin/allbookings
│   ├── seed/
│   │   └── seedData.js               # Database seeder populating test admin, guest, and rooms
│   ├── .env                          # Server environment configuration
│   ├── .env.example                  # Environment template
│   ├── package.json                  # Backend dependencies and run scripts
│   └── server.js                     # Express application entry point
│
├── SkillWallet_Submissions/          # 19 Task documentation deliverables across 6 Epics (.docx)
│   ├── 01_Project_Architecture/      # Tasks 1 to 6
│   ├── 02_Project_Setup_And_Configuration/ # Tasks 7 to 9
│   ├── 03_Backend_Development/       # Tasks 10 and 11
│   ├── 04_Database_Development/      # Tasks 12 to 14
│   ├── 05_Frontend_Development/      # Tasks 15 and 16
│   └── 06_Project_Execution/         # Tasks 17 to 19
│
├── build_skillwallet_docs.py         # Autonomous python-docx generator
└── README.md                         # Complete project documentation & evaluation guide
```

---

## 🗄️ 4. Data Schemas (Exact SkillWallet Specification)

### A. User Schema (`server/models/userModel.js`)
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true },
  password: { type: String, required: [true, "Password is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  userType: { 
    type: String, 
    required: [true, "UserType is required"], 
    enum: ["admin", "customer", "ordinary"], 
    default: "ordinary" 
  },
  gender: { type: String, default: "Not specified" },
  age: { type: Number, default: 25 }
}, { timestamps: true });
```

### B. Room Schema (`server/models/roomModel.js`)
```javascript
const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  count: { type: Number, required: true, default: 1 }, // availability count
  rent: { type: Number, required: true },               // rent per day
  type: { type: String, required: true, enum: ["Delux", "Non-Delux", "ordinary", "luxury"] },
  photos: [{ type: String }],                          // array of image URLs
  description: { type: String, required: true },
  currentbooking: [{
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'booked' }
  }]
}, { timestamps: true });
```

### C. Booking Schema (`server/models/bookingModel.js`)
```javascript
const bookingSchema = new mongoose.Schema({
  roomid: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  fromdate: { type: String, required: true },
  todate: { type: String, required: true },
  totaldays: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  phone: { type: String, required: true },
  cardDetails: {
    cardholdername: { type: String, required: true },
    cardnumber: { type: String, required: true },
    cvvcode: { type: String, required: true },
    expmonthyear: { type: String, required: true }
  },
  status: { type: String, default: "booked", enum: ["booked", "cancelled"] }
}, { timestamps: true });
```

---

## ⚡ 5. Quickstart & Execution Protocol

### Step 1: Clone & Configure Server
```bash
# Navigate to backend
cd server

# Install dependencies
npm install

# Verify or edit .env
# PORT=8000
# MONGO_URI=mongodb://127.0.0.1:27017/hotelpro
# JWT_SECRET=hotelpro_roomsforuse_jwt_secret_key_2026
```

### Step 2: Seed Sample Data
Ensure your local MongoDB daemon is running (or provide a remote MongoDB Atlas URI in `.env`), then seed default rooms and test accounts:
```bash
npm run seed
```
*Output: Populates 6 luxury suites and 3 test accounts (Admin, Customer, Ordinary).*

### Step 3: Start Backend REST API
```bash
npm run dev
# Server is running on port 8000
# API Base URL: http://localhost:8000/api
```

### Step 4: Start Frontend SPA
In a separate terminal window:
```bash
cd client
npm install
npm run dev
# VITE v5 ready in 250 ms
# Local: http://localhost:5173/
```

---

## 🔑 6. Default Test Credentials

| Role | Email Address | Password | Portal Permissions |
| :--- | :--- | :--- | :--- |
| **Hotel Administrator** | `admin@hotelpro.com` | `Admin@123` | Full access to `/admin/dashboard` (All Bookings, All Rooms, Add Room, Users) |
| **Ordinary Customer** | `guest@hotelpro.com` | `Guest@123` | Access to `/user/home`, Room booking modal, `/user/bookings`, Cancellation |
| **Test Ordinary User** | `rahul@hotelpro.com` | `Guest@123` | Access to room discovery and personal reservations |

> **Evaluator Tip:** The Login page (`/login`) includes **Quick Fill Demo Credentials** buttons to instantly populate the form for 1-click evaluation!

---

## 📋 7. SkillWallet 6-Epic, 19-Task Submission Package

All 19 professional `.docx` files are compiled in the `SkillWallet_Submissions/` directory:

| Epic | Task ID | File Deliverable | Description |
| :--- | :--- | :--- | :--- |
| **Epic 1: Project Architecture** | Task 1 | `01_Technical_Architecture.docx` | Full 3-tier architecture, component communication, and tech stack |
| | Task 2 | `02_ER_Diagram.docx` | Complete ER diagram, schemas, attributes, and cardinality |
| | Task 3 | `03_Features.docx` | Customer features, Admin features, and responsive UI |
| | Task 4 | `04_Roles_And_Responsibilities.docx` | RBAC matrix separating Customer vs Admin |
| | Task 5 | `05_User_Flow.docx` | End-to-end visitor, customer, and admin journeys |
| | Task 6 | `06_MVC_Pattern.docx` | Model, View, and Controller breakdown and advantages |
| **Epic 2: Project Setup & Config** | Task 7 | `07_Creating_Project_Folder.docx` | Monorepo layout, workspace setup, and guidelines |
| | Task 8 | `08_Client_Setup.docx` | Vite + React scaffolding, packages, and proxy setup |
| | Task 9 | `09_Server_Setup.docx` | Express server, `.env`, CORS, and middleware integration |
| **Epic 3: Backend Development** | Task 10 | `10_Backend_Structure.docx` | Modular organization of config, controllers, models, routes |
| | Task 11 | `11_Backend_Development_And_Explanation.docx` | REST endpoints, request/response contracts, and error handling |
| **Epic 4: Database Development** | Task 12 | `12_Configure_Mongoose.docx` | Mongoose installation and driver configuration |
| | Task 13 | `13_Create_Database_Connection.docx` | Database resilience, event handlers, and retry loop |
| | Task 14 | `14_Create_Schema_And_Models.docx` | Full User, Room, and Booking schemas with validation |
| **Epic 5: Frontend Development** | Task 15 | `15_Frontend_Structure.docx` | React source layout, components, and context architecture |
| | Task 16 | `16_Frontend_Development_And_Explanation.docx` | Header, HeroCarousel, RoomCard, BookingModal, AdminTabs |
| **Epic 6: Project Execution** | Task 17 | `17_Steps_For_Project_Execution.docx` | Step-by-step startup guide, test credentials, and UAT matrix |
| | Task 18 | `18_Output_Screenshots.docx` | Visual proof documenting all 10 core interfaces |
| | Task 19 | `19_Demo_Video.docx` | 4:30 minute presentation walkthrough script & timestamps |

To regenerate all 19 submission documents at any time:
```bash
python build_skillwallet_docs.py
```

---

## 🎯 8. Software Engineering Lifecycle Compliance
- **Ideation Phase:** Problem statement definition (friction in hotel reservation, manual check-in headaches) and Empathy Map.
- **Project Planning Phase:** Agile Product Backlog, User Stories with Story Points, and Sprint schedule.
- **Requirement Analysis:** Functional vs Non-Functional Requirements and Data Flow Diagrams (Level 0 and Level 1 DFD).
- **Project Design Phase:** Solution architecture & Component interaction models.
- **Performance & UAT Phase:** User Acceptance Testing (UAT) test cases with 100% passed test matrices.

---
© 2026 HotelPro / RoomsForUse Development Team. Prepared for SkillWallet MERN Full-Stack Submission.
