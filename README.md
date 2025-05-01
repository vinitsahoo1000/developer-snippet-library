# Task Note

Task Note is a simple task management application built with **Next.js** using **Server Actions**. It allows users to **sign up, log in, add tasks, mark tasks as completed, view pending tasks, and delete tasks**.

## Features
- **User Authentication**: Signup & Login functionality
- **Task Management**:
  - Add tasks
  - Mark tasks as completed
  - View pending tasks
  - Delete tasks
- **Next.js Server Actions** for backend processing

## Tech Stack
- **Frontend**: Next.js 14 with React & Tailwind CSS
- **Backend**: Server Actions in Next.js
- **Database**: (Specify if using a database, e.g., MongoDB, PostgreSQL, etc.)
- **Authentication**: JSON Web Tokens (JWT)

## Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/vinitsahoo1000/taskManagementApp
   cd taskManagementApp
   ```
2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```
3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```sh
   MONGODB_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
   ```
4. **Run the application**
   ```sh
   npm run dev  # or yarn dev
   ```
   The app will be available at `http://localhost:3000`

## Usage
- **User Authentication**: Navigate to `/signup` or `/login`.
- **Task Management**: All task-related actions are performed on the `/` route.
- **Logout**: Clicking the logout button will clear authentication and redirect the user.

## Folder Structure
```
/app
 ├── (auth)           # Authentication pages
 │   ├── login       
 │   │   ├── page.tsx # Login page
 │   ├── signup       
 │   │   ├── page.tsx # Signup page
 │
 ├── actions          # Server Actions for handling user and task logic
 │   ├── task.ts
 │   ├── user.ts
 │
 ├── page.tsx         # Main page where tasks are managed
 │    
 ├── components/common  # Reusable UI components
 │   ├── AuthLogin.tsx
 │   ├── AuthSignup.tsx
 │   ├── CreateTask.tsx
 │   ├── SideMenu.tsx
 │   ├── TaskCard.tsx
 │   ├── TaskEditor.tsx
 │   ├── TaskGrid.tsx
 │
 ├── db               # Database connection setup
 │   ├── index.ts
 │   ├── prisma/schema.prisma  # Prisma schema for MongoDB
 │
 ├── middleware.ts     # Middleware for authentication
 ├── next.config.js    # Next.js configuration
 ├── .env              # Environment variables

```

## Deployment
You can deploy this app on **Vercel** easily:
1. Push your code to GitHub/GitLab.
2. Connect your repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy!

## Contributing
If you find a bug or have a feature request, feel free to open an issue or contribute by making a pull request.

## License
This project is licensed under the **MIT License**.

---
### Happy Task Managing! ✅

