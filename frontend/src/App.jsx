import { Toaster } from "react-hot-toast";
import AppRouter from "./router.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-color)",
            border: "1px solid var(--toast-border)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
            style: {
              "--toast-bg": "#f0fdf4",
              "--toast-color": "#166534",
              "--toast-border": "#bbf7d0",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
            style: {
              "--toast-bg": "#fef2f2",
              "--toast-color": "#991b1b",
              "--toast-border": "#fecaca",
            },
          },
        }}
      />
      <AppRouter />
    </div>
  );
}

export default App;
