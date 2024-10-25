import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Importa SweetAlert

const UpdateEstudent: React.FC = () => {
  const { id } = useParams(); // Obtener el ID del estudiante desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar

  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Email, setEmail] = useState("");

  // Efecto para cargar los datos del estudiante
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5111/api/Estudents/${id}`);
        const student = response.data;
        setName(student.name);
        setAge(student.age.toString());
        setEmail(student.email);
      } catch (error) {
        console.error("Error al cargar el estudiante", error);
      }
    };

    fetchStudent();
  }, [id]);

  // Función para manejar el envío del formulario de actualización
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedEstudiante = {
      id: parseInt(id!), // Asegurarse de que el id se pase como número
      name: Name,
      age: parseInt(Age),
      email: Email,
    };

    try {
      // Enviar solicitud PUT para actualizar el estudiante
      await axios.put(`http://localhost:5111/api/Estudents/${id}`, updatedEstudiante);

      // Muestra un SweetAlert de éxito
      Swal.fire({
        title: "Éxito!",
        text: "Estudiante actualizado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      navigate("/"); // Redirigir a la lista de estudiantes después de actualizar
    } catch (error) {
      console.error("Error al actualizar el estudiante", error);
      // Muestra un SweetAlert de error
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al actualizar el estudiante",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div>
        <form
          className="flex flex-col gap-4 bg-white rounded-lg p-6 w-96 mx-auto mt-10 shadow-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-gray-800 font-bold text-center mb-4">Actualizar Estudiante</h2>
          <div className="flex flex-col">
            <label className="text-lg text-gray-700 font-light">Nombre:</label>
            <input
              className="p-3 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg"
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-700 font-light">Edad:</label>
            <input
              className="p-3 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg"
              type="number"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-700 font-light">Correo:</label>
            <input
              className="p-3 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg"
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEstudent;
