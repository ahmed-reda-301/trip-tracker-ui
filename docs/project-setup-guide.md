# Trip Tracker UI Project Setup and Execution Steps

## 1. Create the Project

- Run the following command to create a new Next.js project:
  ```bash
  npx create-next-app@latest trip-tracker-ui
  ```
- Navigate to the project directory:
  ```bash
  cd trip-tracker-ui
  ```
- Open the project in VS Code:
  ```bash
  code .
  ```

## 2. Install Dependencies

- Make sure you have Node.js and npm installed.
- Install all required packages:
  ```bash
  npm install
  ```

## 3. Run the Application Locally

- Start the development server:
  ```bash
  npm run dev
  ```
- The app will be available at: http://localhost:3000

## 4. Build for Production

- Create a production build:
  ```bash
  npm run build
  ```
- Start the production server:
  ```bash
  npm start
  ```

## 5. Project Structure

- `src/app/` : Main pages and components
- `public/` : Images and media files
- `docs/` : Documentation files

## 6. Additional Notes

- You can modify settings in configuration files like `next.config.ts` and `tsconfig.json`.
- For more information, check the README.md file.

## 7. Upload Project to GitHub

Follow these steps to initialize a git repository and upload your project to GitHub:

- **Repository Name:** `trip-tracker-ui`
- **Suggested Description:** A modern web application for tracking trips, built with Next.js and React.

1. Initialize git in your project folder:
   ```bash
   git init
   ```
2. Add all project files:
   ```bash
   git add .
   ```
3. Commit your changes:
   ```bash
   git commit -m "Initial commit"
   ```
4. Create a new repository on GitHub with the name `trip-tracker-ui` and the suggested description above.
5. Link your local repo to GitHub (replace `<your-username>` with your GitHub username):
   ```bash
   git remote add origin git@github.com:ahmed-reda-301/trip-tracker-ui.git
   ```
6. Push your code to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

Now your project will be available on GitHub.

# Recent Project Steps Documentation

## 1. Font Setup in layout.tsx

- Imported Google fonts Roboto and Cairo using `next/font/google`.
- Configured both fonts with weights 400, 500, 700 and enabled preload for performance.
- Applied the Roboto font to the `<body>` element in the root layout.

## 2. Cleaned Up Page Component

- Simplified `page.tsx` to a minimal "Hello World" example for clarity and easier testing.

## 3. Code Cleanup

- Removed unused imports and template code from both `layout.tsx` and `page.tsx`.
- Ensured the codebase is clean and easier to maintain.

## 4. Version Control

- Staged and committed all changes with a clear, descriptive commit message.
- Pushed the updates to the GitHub repository.

## 5. Add shadcn UI and Test Integration

### Step 1: Install shadcn UI (Updated)

- The `shadcn-ui` package is deprecated. Use the new CLI:
  ```bash
  npx shadcn@latest init
  ```
- Follow the CLI prompts to configure your project (choose your preferred settings).
- During initialization, you will be prompted to select a base color for your UI components (e.g., Neutral, Gray, Zinc, Stone, Slate). Use the arrow keys to choose and press Enter to confirm.
- For this project, the **Slate** color was selected. Slate provides a modern, professional look suitable for dashboards and business applications, with excellent contrast and readability in both light and dark modes.
- For more information, visit: https://ui.shadcn.com/docs/cli

### Step 2: Add a Sample Button Component

- Run the following command to add a Button component:
  ```bash
  npx shadcn@latest add button
  ```
- This will generate a reusable Button component in your project (usually in `components/ui/button.tsx`).

### Step 3: Test the Button Component

- Import and use the Button in your page, for example in `src/app/page.tsx`:

  ```tsx
  import { Button } from "@/components/ui/button";

  export default function Home() {
    return (
      <main>
        <h1>Hello World</h1>
        <Button>Test Shadcn Button</Button>
      </main>
    );
  }
  ```

- Start your development server and verify the button appears and works as expected.

---

These steps improve project readability, maintainability, and ensure a clean start for further development.
