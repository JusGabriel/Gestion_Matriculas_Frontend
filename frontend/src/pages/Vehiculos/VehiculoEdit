// src/pages/materias/MateriaEdit.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storeAuth from "../../context/storeAuth";
import axios from "axios";

export default function MateriaEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = storeAuth();

  const [form, setForm] = useState({ nombre: "", codigo: "", descripcion: "", creditos: "" });
  const [loading, setLoading] = useState(true);

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // --- Cargar materia existente ---
  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const response = await axios.get(
          `https://gestionmatriculas-production.up.railway.app/api/materias`,
          headers
        );

        const materia = response.data.find((m) => m._id === id);
        if (!materia) {
          toast.error("Materia no encontrada");
          navigate("/dashboard/materias");
          return;
        }

        setForm({
          nombre: materia.nombre || "",
          codigo: materia.codigo || "",
          descripcion: materia.descripcion || "",
          creditos: materia.creditos || "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar datos de la materia");
        console.error(error);
      }
    };

    fetchMateria();
  }, [id, token, navigate]);

  // --- Manejo de cambios en inputs ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Actualizar materia ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://gestionmatriculas-production.up.railway.app/api/materias/${id}`,
        {
          nombre: form.nombre,
          codigo: form.codigo,
          descripcion: form.descripcion,
          creditos: Number(form.creditos),
        },
        headers
      );

      toast.success("Materia actualizada con éxito");
      setTimeout(() => navigate("/dashboard/materias"), 1500);
    } catch (error) {
      toast.error("Ocurrió un error al actualizar la materia");
      console.error(error);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem", color: "#525b6d" }}>Cargando materia...</p>;

  return (
    <div style={container}>
      <ToastContainer />
      <div style={formWrapper}>
        <h2 style={title}>Editar Materia</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la materia"
            value={form.nombre}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="codigo"
            placeholder="Código de la materia"
            value={form.codigo}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="creditos"
            placeholder="Créditos"
            value={form.creditos}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle}>
            <FaSave style={{ marginRight: "8px" }} /> Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Estilos ---
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
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

const title = { marginBottom: "2.5rem", fontSize: "2rem", textAlign: "center", color: "#525b6d" };
const formStyle = { display: "flex", flexDirection: "column", gap: "1.8rem" };

const inputStyle = {
  padding: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  background: "#f9f9f9",
  color: "#1E1E2F",
  fontSize: "1.1rem",
  width: "100%",
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
