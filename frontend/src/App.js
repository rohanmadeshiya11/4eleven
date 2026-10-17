import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import Landing from "@/pages/Landing";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import WorkPage from "@/pages/WorkPage";
import ContactPage from "@/pages/ContactPage";

function App() {
  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
        <BrowserRouter>
          <div className="App grain-overlay">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Landing />} />
            </Routes>
            <Toaster
              position="bottom-right"
              theme="dark"
              toastOptions={{ style: { fontFamily: "Manrope, sans-serif" } }}
            />
          </div>
        </BrowserRouter>
      </ReactLenis>
    </ThemeProvider>
  );
}

export default App;
