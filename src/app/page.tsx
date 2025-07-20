/**
 * Home Page Component
 *
 * Main landing page of the Trip Tracker application.
 * Serves as the entry point for users and displays the primary dashboard content.
 *
 * Features:
 * - Welcome message and application overview
 * - Quick access to main features
 * - Responsive layout with mobile support
 * - Integration with UI component library
 *
 * @author Ahmed Reda
 * @version 1.0.0
 */

import { Button } from "@/components/ui/button";

/**
 * Home page component that displays the main dashboard
 *
 * @returns JSX element containing the home page content
 */
export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Button>Test Shadcn Button</Button>
    </main>
  );
}
