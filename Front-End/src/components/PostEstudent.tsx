import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch("https://localhost:44324/api/Estudents", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoEstudiante),
        });

        if (!response.ok) {
            throw new Error("Error al agregar el estudiante");
        }

        setName("");
        setAge("");
        setEmail("");
        alert("Estudiante agregado exitosamente");
        navigate("/");
    } catch (error) {
        console.error(error);
        alert("Hubo un error al agregar el estudiante");
    }
  };

  return (
    <div className="flex justify-center items-center bg-back-image h-screen bg-cover">
        <div>
            <form
                className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg w-96 mx-auto mt-10 shadow-2xl"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl text-black font-bold text-center mb-4">
                    Agregar Estudiante
                </h2>
                <div className="flex flex-col">
                    <label className="text-lg text-black font-light">Nombre:</label>
                    <input
                    className="p-3 bg-white/70 border text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-xl"
                    type="text"
                    name="nombre"
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
                    name="edad"
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
                    name="direccion"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className="bg-purple-400 text-white py-2 rounded-lg hover:bg-purple-500 transition duration-300">
                    Agregar
                </button>
            </form>
        </div>
    </div>
  );
};

export default Formulario;