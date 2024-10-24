import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Estudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
        try {
            const response = await axios.get("https://localhost:44324/api/Estudents");
            setStudents(response.data);
        } catch (error) {
            console.error("Error al obtener los estudiantes", error);
        }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este estudiante?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://localhost:44324/api/Estudents/${id}`);
            setStudents(students.filter((student) => student.id !== id));
            alert("Estudiante eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
            alert("Hubo un error al eliminar el estudiante");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-back-image h-screen bg-cover">
            <Link to="/PostEstudent" className="bg-purple-400 text-white py-2 rounded-lg hover:bg-purple-500 transition duration-300 w-40 text-center">
                Agregar Estudiante
            </Link>

            {/* Lista de estudiantes */}
            <div>
                <table className="bg-white/5 backdrop-blur-sm p-6 rounded-lg w-auto text-left mt-10">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Nombre</th>
                            <th className="border px-4 py-2">Edad</th>
                            <th className="border px-4 py-2">Correo Electrónico</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td className="border px-4 py-2">{student.name}</td>
                                <td className="border px-4 py-2">{student.age} años</td>
                                <td className="border px-4 py-2">{student.email}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex gap-2">
                                        <button className="bg-purple-400 hover:bg-purple-500 transition duration-300 w-20 h-8 rounded-xl">
                                            <Link to={`/UpdateEstudent/${student.id}`}>Editar</Link>
                                        </button>
                                        <button className="bg-purple-400 hover:bg-purple-500 transition duration-300 w-20 h-8 rounded-xl" onClick={() => handleDelete(student.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Estudents