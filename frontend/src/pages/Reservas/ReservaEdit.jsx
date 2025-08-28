// src/pages/matriculas/MatriculaEdit.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaSave } from "react-icons/fa";
import storeAuth from "../../context/storeAuth";
import axios from "axios";

const MatriculaEdit = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { token } = storeAuth();
  const navigate = useNavigate();

  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traer estudiantes
        const resEst = await axios.get(
          "https://gestionmatriculas-production.up.railway.app/api/estudiantes",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEstudiantes(resEst.data);

        // Traer materias
        const resMat = await axios.get(
          "https://gestionmatriculas-production.up.railway.app/api/materias",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMaterias(resMat.data);

        // Traer matrícula específica
        const resMatricula = await axios.get(
          "https://gestionmatriculas-production.up.railway.app/api/matriculas",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const matricula = resMatricula.data.find(m => m._id === id);

        if (!matricula) {
          toast.error("Matrícula no encontrada");
          navigate("/dashboard/matriculas");
          return;
        }

        // Llenar formulario
        setValue("codigo", matricula.codigo);
        setValue("descripcion", matricula.descripcion);
        setValue("estudianteId", matricula.estudianteId);
        setValue("materiaId", matricula.materiaId);

        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar datos de la matrícula");
        console.error(error);
      }
    };

    fetchData();
  }, [id, token, setValue, navigate]);

  const updateMatricula = async (data) => {
    try {
      await axios.put(
        `https://gestionmatriculas-production.up.railway.app/api/matriculas/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Matrícula actualizada con éxito");
      setTimeout(() => navigate("/dashboard/matriculas"), 1500);
    } catch (error) {
      toast.error("Ocurrió un error al actualizar la matrícula");
      console.error(error);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando matrícula...</p>;

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Editar Matrícula</h2>
        <form onSubmit={handleSubmit(updateMatricula)} style={formStyle}>
          <input
            type="text" // antes era number, ahora text para evitar warning
            placeholder="Código"
            {...register("codigo", { required: "El código es obligatorio" })}
            style={inputStyle}
          />
          {errors.codigo && <p style={errorText}>{errors.codigo.message}</p>}

          <input
            type="text"
            placeholder="Descripción"
            {...register("descripcion", { required: "La descripción es obligatoria" })}
            style={inputStyle}
          />
          {errors.descripcion && <p style={errorText}>{errors.descripcion.message}</p>}

          <select
            {...register("estudianteId", { required: "El estudiante es obligatorio" })}
            style={inputStyle}
          >
            <option value="">Seleccione un estudiante</option>
            {estudiantes.map(est => (
              <option key={est._id} value={est._id}>{est.nombre}</option>
            ))}
          </select>
          {errors.estudianteId && <p style={errorText}>{errors.estudianteId.message}</p>}

          <select
            {...register("materiaId", { required: "La materia es obligatoria" })}
            style={inputStyle}
          >
            <option value="">Seleccione una materia</option>
            {materias.map(mat => (
              <option key={mat._id} value={mat._id}>{mat.nombre}</option>
            ))}
          </select>
          {errors.materiaId && <p style={errorText}>{errors.materiaId.message}</p>}

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Estilos ---
const container = { minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem", background: "#f4f5f7", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const formWrapper = { width: "100%", maxWidth: "700px", background: "#fff", padding: "3rem", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", color: "#1E1E2F" };
const title = { marginBottom: "2.5rem", fontSize: "2rem", textAlign: "center", color: "#525b6d" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1.8rem" };
const inputStyle = { padding: "1rem", borderRadius: "10px", border: "1px solid #ccc", background: "#f9f9f9", color: "#1E1E2F", fontSize: "1.1rem", width: "100%" };
const buttonStyle = { padding: "1rem", background: "#525b6d", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" };
const errorText = { color: "#E04A4A", fontSize: "0.9rem" };

export default MatriculaEdit;
