// src/pages/matriculas/MatriculasList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import storeAuth from "../../context/storeAuth";

export default function MatriculasList() {
  const [matriculas, setMatriculas] = useState([]);
  const { token } = storeAuth();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const response = await axios.get(
          "https://gestionmatriculas-production.up.railway.app/api/matriculas",
          headers
        );
        setMatriculas(response.data);
      } catch (error) {
        console.error("Error al obtener matrículas:", error);
      }
    };
    fetchMatriculas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://gestionmatriculas-production.up.railway.app/api/matriculas/${id}`,
        headers
      );
      setMatriculas(matriculas.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Error al eliminar matrícula:", error);
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Lista de Matrículas</h2>

      <Link to="/dashboard/matriculas/create">
        <button style={addButton}>
          <FaClipboardList style={{ marginRight: "8px" }} />
          Nueva Matrícula
        </button>
      </Link>

      <div style={tableContainer}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Código</th>
              <th style={th}>Descripción</th>
              <th style={th}>Estudiante</th>
              <th style={th}>Cédula</th>
              <th style={th}>Email</th>
              <th style={th}>Materia</th>
              <th style={th}>Código Materia</th>
              <th style={th}>Créditos</th>
              <th style={th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((m) => (
              <tr key={m._id} style={tr}>
                <td style={td}>{m.codigo}</td>
                <td style={td}>{m.descripcion}</td>
                <td style={td}>
                  {m.estudiante?.nombre} {m.estudiante?.apellido}
                </td>
                <td style={td}>{m.estudiante?.cedula}</td>
                <td style={td}>{m.estudiante?.email}</td>
                <td style={td}>{m.materia?.nombre}</td>
                <td style={td}>{m.materia?.codigo}</td>
                <td style={td}>{m.materia?.creditos}</td>
                <td style={tdCenter}>
                  <Link to={`/dashboard/matriculas/edit/${m._id}`}>
                    <button style={editButton}>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(m._id)}
                    style={deleteButton}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {matriculas.length === 0 && (
              <tr>
                <td colSpan="9" style={emptyMessage}>
                  No hay matrículas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Estilos ---
const container = {
  padding: "20px",
  background: "#f9fafb",
  minHeight: "100vh",
  color: "#1E1E2F",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const title = { marginBottom: "20px", fontSize: "2rem", color: "#525b6d" };

const addButton = {
  marginBottom: "20px",
  padding: "10px 20px",
  background: "#525b6d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
};

const tableContainer = {
  overflowX: "auto",
  borderRadius: "12px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "900px",
  background: "#fff",
  borderRadius: "12px",
  tableLayout: "fixed",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const th = {
  padding: "14px 12px",
  color: "#525b6d",
  textAlign: "center",
  background: "#e8eaf0",
  fontWeight: "600",
};

const tr = {
  borderBottom: "1px solid #ddd",
  transition: "0.2s",
};

const td = {
  padding: "12px 10px",
  color: "#1E1E2F",
  textAlign: "center",
  whiteSpace: "normal",   // permite saltos de línea
  wordBreak: "break-word" // evita que se salga de la celda
};


const tdCenter = {
  ...td,
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const editButton = {
  padding: "6px 12px",
  background: "#4A90E2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};
const deleteButton = {
  padding: "6px 12px",
  background: "#E04A4A",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};
const emptyMessage = {
  textAlign: "center",
  padding: "20px",
  color: "#777",
};
