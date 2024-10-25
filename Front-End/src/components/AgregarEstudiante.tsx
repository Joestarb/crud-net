import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert

const Formulario: React.FC = () => {
    const [Name, setName] = useState("");
    const [Age, setAge] = useState("");
    const [Email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevoEstudiante = {
            Name,
            Age: parseInt(Age),
            Email,
        };

        try {
            const response = await fetch("http://localhost:5111/api/Estudents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoEstudiante),
            });

            if (!response.ok) {
                throw new Error("Error al agregar el estudiante");
            }

            // Limpiar los campos del formulario
            setName("");
            setAge("");
            setEmail("");

            // Muestra un SweetAlert de éxito
            Swal.fire({
                title: "Éxito!",
                text: "Estudiante agregado exitosamente",
                icon: "success",
                confirmButtonText: "Aceptar",
            });

            navigate("/");
        } catch (error) {
            console.error(error);
            // Muestra un SweetAlert de error
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al agregar el estudiante",
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
                    <h2 className="text-2xl text-gray-800 font-bold text-center mb-4">
                        Agregar Estudiante
                    </h2>
                    <div className="flex flex-col">
                        <label className="text-lg text-gray-700 font-light">Nombre:</label>
                        <input
                            className="p-3 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg"
                            type="text"
                            name="nombre"
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
                            name="edad"
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
                            name="direccion"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Agregar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Formulario;
