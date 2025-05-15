# Developer-Snippet-Library

Developer-Snippet-Library is a code snippet management and saving app where users can securely save, organize, and access their code snippets in any programming language, with features like tagging, syntax highlighting, and search for improved productivity.

## Features
- **User Authentication**: Signup & Login functionality
- **Snippet Management**:
  - Add snippet
  - edit snippet
  - Delete snippet
- **Next.js Server Actions** for backend processing

## Tech Stack
- **Frontend**: Next.js 14 with React & Tailwind CSS
- **Backend**: Server Actions in Next.js
- **Database**: (MongoDB)
- **Authentication**: JSON Web Tokens (JWT)

## Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/vinitsahoo1000/developer-snippet-library
   cd developer-snippet-library
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
- **Snippet Management**: All snippet-related actions are performed on the `/` route.
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
 │   ├── snippet.ts
 │   ├── user.ts
 │
 ├── page.tsx         # Main page where snippet are managed
 │    
 ├── components  # Reusable UI components
 │   ├── common
 │   │     ├── Button.tsx
 │   │     ├── CodeBox.tsx
 │   │     ├── InputBox.tsx
 │   │     ├── PasswordBox.tsx
 │   ├── AuthLogin.tsx
 │   ├── AuthSignup.tsx
 │   ├── CreateSnippet.tsx
 │   ├── SideMenu.tsx
 │   ├── SnippetCard.tsx
 │   ├── SnippetEditor.tsx
 │   ├── SnippetGrid.tsx
 │   ├── SnippetView.tsx
 │   ├── LanguageSelector.tsx
 │
 ├── db               # Database connection setup
 │   ├── index.ts
 │
 ├── prisma
 │    ├── schema.prisma
 │
 ├── lib
 │    ├── auth.ts    
 │    ├── utils.ts   
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



## License
This project is licensed under the **MIT License**.

---
### Happy Snippet Managing! ✅

