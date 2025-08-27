// src/pages/matriculas/MatriculaCreate.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import storeAuth from "../../context/storeAuth";
import { FaSave } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const MatriculaCreate = () => {
  const navigate = useNavigate();
  const { token } = storeAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);

  // Cargar estudiantes y materias desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEst = await fetch(
          "https://gestionmatriculas-production.up.railway.app/api/estudiantes",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataEst = await resEst.json();
        setEstudiantes(dataEst);

        const resMat = await fetch(
          "https://gestionmatriculas-production.up.railway.app/api/materias",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataMat = await resMat.json();
        setMaterias(dataMat);
      } catch (error) {
        toast.error("Error cargando estudiantes o materias");
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  const createMatricula = async (data) => {
    try {
      const response = await fetch(
        "https://gestionmatriculas-production.up.railway.app/api/matriculas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            codigo: data.codigo,
            descripcion: data.descripcion,
            estudianteId: data.estudianteId,
            materiaId: data.materiaId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.msg || "Error al crear la matrícula");
        return;
      }

      toast.success("Matrícula creada con éxito");
      setTimeout(() => navigate("/dashboard/matriculas"), 1500);
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
      console.error(error);
    }
  };

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Crear Matrícula</h2>
        <form onSubmit={handleSubmit(createMatricula)} style={formStyle}>
          <div style={inputGroup}>
            <label style={label}>Código</label>
            <input
              type="number"
              placeholder="Código de la matrícula"
              {...register("codigo", { required: "El código es obligatorio" })}
              style={inputStyle}
            />
            {errors.codigo && <p style={errorText}>{errors.codigo.message}</p>}
          </div>

          <div style={inputGroup}>
            <label style={label}>Descripción</label>
            <input
              type="text"
              placeholder="Descripción de la matrícula"
              {...register("descripcion", { required: "La descripción es obligatoria" })}
              style={inputStyle}
            />
            {errors.descripcion && <p style={errorText}>{errors.descripcion.message}</p>}
          </div>

          <div style={inputGroup}>
            <label style={label}>Estudiante</label>
            <select
              {...register("estudianteId", { required: "Debe seleccionar un estudiante" })}
              style={inputStyle}
            >
              <option value="">Seleccione un estudiante</option>
              {estudiantes.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.nombre} {e.apellido}
                </option>
              ))}
            </select>
            {errors.estudianteId && <p style={errorText}>{errors.estudianteId.message}</p>}
          </div>

          <div style={inputGroup}>
            <label style={label}>Materia</label>
            <select
              {...register("materiaId", { required: "Debe seleccionar una materia" })}
              style={inputStyle}
            >
              <option value="">Seleccione una materia</option>
              {materias.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.nombre} ({m.codigo})
                </option>
              ))}
            </select>
            {errors.materiaId && <p style={errorText}>{errors.materiaId.message}</p>}
          </div>

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Guardar Matrícula
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Estilos ---
const container = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "2rem",
  background: "#f4f5f7",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formWrapper = {
  width: "100%",
  maxWidth: "700px",
  background: "#fff",
  padding: "3rem",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  color: "#1E1E2F",
};

const title = { marginBottom: "2rem", fontSize: "2rem", textAlign: "center", color: "#525b6d" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1.8rem" };
const inputGroup = { display: "flex", flexDirection: "column" };
const label = { marginBottom: "0.5rem", fontWeight: "600", color: "#525b6d" };
const inputStyle = {
  padding: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  background: "#f9f9f9",
  color: "#1E1E2F",
  fontSize: "1.1rem",
  transition: "0.2s",
};

const buttonStyle = {
  padding: "1rem",
  background: "#525b6d",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1.1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
};
buttonStyle[':hover'] = { background: "#434b5a" };

const errorText = { color: "#E04A4A", fontSize: "0.9rem", marginTop: "0.3rem" };

export default MatriculaCreate;
