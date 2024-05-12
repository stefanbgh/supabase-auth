import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./scss/main.scss";
import "react-toastify/dist/ReactToastify.css";

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(root).render(<App />);
