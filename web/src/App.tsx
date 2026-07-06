import { Route, Routes } from "react-router";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { Redirect } from "./pages/Redirect/Redirect";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortUrl" element={<Redirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
