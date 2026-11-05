import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./hooks/useLang";
import Cursor   from "./components/Cursor";
import Home     from "./pages/Home";
import About    from "./pages/About";
import Projects from "./pages/Projects";
import Contact  from "./pages/Contact";

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Cursor />
        <Routes>
          <Route path="/"         element={<Home />}     />
          <Route path="/about"    element={<About />}    />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact"  element={<Contact />}  />
          <Route path="*"         element={<Home />}     />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
