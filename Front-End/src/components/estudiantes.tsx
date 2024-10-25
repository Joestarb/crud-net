import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert


function Estudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:5111/api/Estudents");
                setStudents(response.data);
            } catch (error) {
                console.error("Error al obtener los estudiantes", error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id: number) => {
        // Usar SweetAlert para confirmar la eliminación
        const { isConfirmed } = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminarlo",
            cancelButtonText: "Cancelar"
        });
    
        if (!isConfirmed) return; // Salir si no se confirma
    
        try {
            await axios.delete(`http://localhost:5111/api/Estudents/${id}`);
            setStudents(students.filter((student) => student.id !== id));
    
            // Usar SweetAlert para mostrar un mensaje de éxito
            Swal.fire({
                title: "Eliminado!",
                text: "Estudiante eliminado exitosamente.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
    
            // Usar SweetAlert para mostrar un mensaje de error
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al eliminar el estudiante.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">

            {/* Lista de estudiantes */}
            <div className="overflow-auto w-full max-w-4xl">
                <table className="min-w-full  rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-blue-400 text-white">
                            <th className="border px-4 py-2">Nombre</th>
                            <th className="border px-4 py-2">Edad</th>
                            <th className="border px-4 py-2">Correo Electrónico</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length == 0 ?(<>
                        <div className=" bg-gray-100 ">
                            <p className=" text-center text-3xl">sin registros</p>
                            </div>
                        </>):(<>
                            {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{student.name}</td>
                                <td className="border px-4 py-2">{student.age} años</td>
                                <td className="border px-4 py-2">{student.email}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex gap-2">
                                        <Link to={`/UpdateEstudent/${student.id}`} className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 w-20 h-8 rounded-xl flex items-center justify-center">
                                            Editar
                                        </Link>
                                        <button className="bg-red-500 text-white hover:bg-red-600 transition duration-300 w-20 h-8 rounded-xl" onClick={() => handleDelete(student.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </>)}
                        
                    </tbody>
                </table>
            </div>
            
            <div className=" pt-12">
            <Link to="/PostEstudent" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-6">
                Agregar Estudiante
            </Link>
            </div>


        </div>
    );
}

export default Estudents;
