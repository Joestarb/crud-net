import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        const response = await axios.get(`https://localhost:44324/api/Estudents/${id}`);
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
      await axios.put(`https://localhost:44324/api/Estudents/${id}`, updatedEstudiante);
      alert("Estudiante actualizado exitosamente");
      navigate("/"); // Redirigir a la lista de estudiantes después de actualizar
    } catch (error) {
      console.error("Error al actualizar el estudiante", error);
      alert("Hubo un error al actualizar el estudiante");
    }
  };

  return (
    <div className="flex justify-center items-center bg-back-image h-screen bg-cover">
      <div>
        <form
          className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg w-96 mx-auto mt-10 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-black font-bold text-center mb-4">Actualizar Estudiante</h2>
          <div className="flex flex-col">
            <label className="text-lg text-black font-light">Nombre:</label>
            <input
              className="p-3 bg-white/70 border text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-xl"
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-black font-light">Edad:</label>
            <input
              className="p-3 bg-white/70 border text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-xl"
              type="number"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-black font-light">Correo:</label>
            <input
              className="p-3 bg-white/70 border text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-xl"
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-purple-400 text-white py-2 rounded-lg hover:bg-purple-500 transition duration-300">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEstudent;
