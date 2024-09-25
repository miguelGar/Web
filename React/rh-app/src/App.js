import ListadoEmpleados from "./empleados/ListadoEmpleados";
import Navegacion from "./compartido/Navegacion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Navegacion/>
      <Routes>
        <Route exact path='/' element={<ListadoEmpleados/>}/>
        <Route exact path='/agregar' element={<AgregarEmpleado/>}/>
        <Route exact path='/editar/:id' element={<EditarEmpleado/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
