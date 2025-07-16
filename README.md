# 🏢 BuildNest

**BuildNest** is a responsive, role-based Building Management System (BMS) built with React and Firebase. It supports user registration, authentication, apartment management, and admin controls—all tailored for managing a **single building**.

---

## 🌐 Live URL

**[🔗 Live Demo](https://your-live-site-url.com)**  
_(Replace with your deployed URL)_

---

## 🎯 Project Purpose

The goal of **BuildNest** is to provide a robust, secure, and user-friendly building management platform where:
- Users can register, login, and access member dashboards
- Admins can manage apartments, coupons, announcements, and members
- All operations are synchronized through Firebase Auth and MongoDB

---

## 🚀 Key Features

- 🔐 **User Authentication** (Email/Password + Google Sign-in)
- 🎨 **Responsive UI** with TailwindCSS + DaisyUI
- 🧠 **Role-based Access** (`member`, `admin`, etc.)
- 🧾 **Coupon Management**
- 📢 **Announcements System**
- 💳 **Payment Integration Ready**
- 🗂️ **Protected Routes & Dashboards**
- ☁️ **Image Upload via ImgBB**
- 📦 **Data Storage using MongoDB Atlas**
- 📍 **Interactive Maps using Leaflet**
- 💬 **Notifications via SweetAlert2 and React Hot Toast**
- 📡 **Global State Management** using React Query

---

## 🧰 Tech Stack & Packages

### ✅ Frontend
| Package | Purpose |
|--------|---------|
| `react` | Core frontend library |
| `react-dom` | DOM rendering |
| `react-router` | SPA routing |
| `tailwindcss` | Utility-first CSS framework |
| `daisyui` | UI component library for Tailwind |
| `firebase` | Authentication |
| `axios` | HTTP requests |
| `react-hot-toast` | Toast notifications |
| `sweetalert2` | Modal alerts |
| `aos` | Scroll animations |
| `react-icons` | Icon library |
| `leaflet` + `react-leaflet` | Interactive maps |
| `swiper` | Sliders / carousels |
| `@tanstack/react-query` | Server state management |

### 🛠️ Dev Dependencies
| Package | Purpose |
|--------|---------|
| `vite` | Frontend build tool |
| `@vitejs/plugin-react` | React support in Vite |
| `eslint`, `eslint-plugin-*` | Linting |
| `@types/react` / `@types/react-dom` | Type definitions for React (if using TypeScript) |

---

## 📁 Folder Structure (simplified)

src/
│
├── Components/ # Reusable UI components
├── Contexts/ # Auth context
├── Pages/ # Login, Register, Dashboard, etc.
├── api/ # Axios instance and saveUser.js
├── router/ # React Router setup
├── Firebase/ # Firebase config/init
├── App.jsx
└── main.jsx

License
MIT © 2025 — BuildNest by Debajit Roy