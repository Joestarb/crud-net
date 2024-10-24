import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Estudents";
import PostEstudent from "./components/PostEstudent";
import UpdateEstudent from "./components/UpdateEstudent";

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