import "@/App.css";
import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import Landing from "@/pages/Landing";

function App() {
  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
        <div className="App grain-overlay">
          <Landing />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{ style: { fontFamily: "Manrope, sans-serif" } }}
          />
        </div>
      </ReactLenis>
    </ThemeProvider>
  );
}

export default App;
