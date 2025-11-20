# SnapVault

Image Gallery is a full-stack web application that allows users to upload images, create albums, and organize photos efficiently. It provides an intuitive interface for managing personal image collections with secure user authentication.

**Live Site:** [https://imagegallery-et3o.onrender.com/](https://imagegallery-et3o.onrender.com/)

---

## Features

* Upload images with real-time preview
* Create, edit, and manage albums
* Store and organize images within albums
* Clean gallery layout for browsing images
* Backend API built with Node.js + Express
* MongoDB for storing image & album metadata
* Cloudinary integration for image hosting
* Secure authentication using JWT

---

## Screenshots

### **Home Gallery View**

![alt text](<frontend/public/Screenshot 2025-11-16 142752.png>)

---

### **Image Preview Modal**

![alt text](<frontend/public/Screenshot 2025-11-16 142809.png>)

---

### **Albums Section**

![alt text](<frontend/public/Screenshot 2025-11-16 142822.png>)

---

## Technology Stack

### **Backend**

* Node.js + Express (v5.1.0)
* MongoDB with Mongoose (v8.19.2)
* Cloudinary (v2.8.0) for image hosting
* Multer (v2.0.2) for file uploads
* JWT (jsonwebtoken v9.0.2) for authentication
* dotenv for environment variables
* Utilities: bcryptjs, cors, cookie-parser, zod

---

### **Frontend**

* React (v19.1.1)
* React Router (tanstack/react-router v1.134.13)
* React Hook Form + Zod for validation
* Zustand for global state management
* Tailwind CSS + DaisyUI for UI styling
* Axios for API communication
* React Hot Toast for notifications
* Vite for development bundling

---

## Installation

### **Backend Setup**

1. Navigate to the backend folder.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file containing:

   * MongoDB URI
   * Cloudinary credentials
   * JWT secret
4. Start the server:

```bash
npm run dev
```

---

### **Frontend Setup**

1. Navigate to the frontend folder.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Visit the app at:

```
http://localhost:5173
```

---

## Usage

* Upload and preview images
* Create albums to organize photos
* View images in a responsive gallery layout
* Image metadata stored in MongoDB; images stored on Cloudinary
* Secure authentication for user login/signup

---

## Author

**Himanshu**
