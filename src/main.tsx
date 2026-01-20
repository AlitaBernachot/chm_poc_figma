
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadOpenAIApiKey } from "./utils/localStorage";
import { initializePOIs } from "./utils/poiStore";

// Load OpenAI API key from localStorage at app initialization
loadOpenAIApiKey();

// Initialize POI data at app start (fetches and caches POIs)
initializePOIs();

createRoot(document.getElementById("root")!).render(<App />);
