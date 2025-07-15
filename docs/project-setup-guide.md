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
