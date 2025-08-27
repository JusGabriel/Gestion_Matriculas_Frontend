// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./layout/Dashboard";
import Home from "./pages/Home"; // ← agregada

// Estudiantes
import EstudiantesList from "./pages/estudiantes/EstudiantesList";
import EstudianteCreate from "./pages/estudiantes/EstudianteCreate";
import EstudianteEdit from "./pages/estudiantes/EstudianteEdit";

// Materias
import MateriasList from "./pages/materias/MateriasList";
import MateriaCreate from "./pages/materias/MateriaCreate";
import MateriaEdit from "./pages/materias/MateriaEdit";

// Matrículas
import MatriculasList from "./pages/matriculas/MatriculasList";
import MatriculaCreate from "./pages/matriculas/MatriculaCreate";
import MatriculaEdit from "./pages/matriculas/MatriculaEdit";

import PublicRoute from "./routers/PublicRoute";
import ProtectedRoute from "./routers/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Rutas protegidas */}
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          <Route index element={<Home />} /> {/* ← agregada */}

          {/* Estudiantes */}
          <Route path="estudiantes" element={<EstudiantesList />} />
          <Route path="estudiantes/create" element={<EstudianteCreate />} />
          <Route path="estudiantes/edit/:id" element={<EstudianteEdit />} />

          {/* Materias */}
          <Route path="materias" element={<MateriasList />} />
          <Route path="materias/create" element={<MateriaCreate />} />
          <Route path="materias/edit/:id" element={<MateriaEdit />} />

          {/* Matrículas */}
          <Route path="matriculas" element={<MatriculasList />} />
          <Route path="matriculas/create" element={<MatriculaCreate />} />
          <Route path="matriculas/edit/:id" element={<MatriculaEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
