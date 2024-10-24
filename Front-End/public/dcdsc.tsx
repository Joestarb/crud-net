import React, { useState, useEffect } from 'react';

// Sample user data
const users = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'David' }
];

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;


// Crea un buscador de usuarios que filtre una lista en funcion de la entrada del usuario. Usa useEffect para realizar 
// una busqueda cuando el valor del input cambie. Tambien useState
import React, { useEffect, useState } from "react";

interface Usuario {
  nombre: string;
  direccion: string;
}

const Formulario: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    direccion: ""
  });

  const [usuariosMostrados, setUsuariosMostrados] = useState<Usuario[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUsuario({
      ...usuario,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsuariosMostrados([...usuariosMostrados, usuario]);
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setUsuario({
      nombre: "",
      direccion: ""
    });
  };

  useEffect(() => {
    const filtrarUsuarios = () => {
      const usuariosFiltrados = usuariosMostrados.filter((usuario) => {
        return usuario.nombre.toLowerCase().includes(usuario.nombre.toLowerCase());
      })
    }
  })

  return (
    <div className="flex">
      <div>
        <form onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg w-96 mx-auto mt-10 shadow-2xl"
        >
          <h2 className="text-2xl text-black font-bold text-center mb-4">
            Registro de Usuario
          </h2>
          <div className="flex flex-col">
            <label className="text-lg text-black font-light">Nombre:</label>
            <input
              className="p-3 bg-white/70 border text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-xl"
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-black font-light">Dirección:</label>
            <input
              className="p-3 bg-white/70 border text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-xl"
              type="text"
              name="direccion"
              value={usuario.direccion}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-400 text-white py-2 rounded-lg hover:bg-purple-500 transition duration-300"
          >
            Agregar Usuario
          </button>
        </form>
      </div>

      <div className="ml-10">
        {usuariosMostrados.length > 0 && (
          <div className="w-full">
            {usuariosMostrados.map((usuario, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 bg-white/30 backdrop-blur-sm p-6 rounded-lg w-96 mx-auto mt-5 shadow-lg"
              >
                <h2 className="text-2xl text-black font-bold text-center">
                  Usuario {index + 1}
                </h2>
                <p className="text-lg text-black font-light">
                  <strong>Nombre:</strong> {usuario.nombre}
                </p>
                <p className="text-lg text-black font-light">
                  <strong>Dirección:</strong> {usuario.direccion}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtrar usuario */}
      <div>
        <p>Buscar en la lista</p>
        <input />
        <button>Buscar</button>
      </div>
    </div>
  );
};

export default Formulario;