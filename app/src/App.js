import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import PaginaPrincipal from "./pages/Principal";
import Pagina1 from "./pages/Page1";
import Pagina2 from "./pages/Page2";
import Pagina3 from "./pages/Page3";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<PaginaPrincipal/>} />
          <Route path="/clima" element={<Pagina1/>} />
          <Route path="/temperatura" element={<Pagina2/>} />
          <Route path="/aire" element={<Pagina3/>} />
          <Route path="*" element={<Navigate to="/" replace={true}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
