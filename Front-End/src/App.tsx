import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/estudiantes";
import PostEstudent from "./components/AgregarEstudiante";
import UpdateEstudent from "./components/ActualizarEstudiante";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/PostEstudent" element={<PostEstudent/>}/>
          <Route path="/UpdateEstudent/:id" element={<UpdateEstudent/>}/>
        </Routes>
      </Router>
  )
}

export default App