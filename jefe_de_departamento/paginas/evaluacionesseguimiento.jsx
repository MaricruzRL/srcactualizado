import React from 'react';

const Evaluacionesseguimiento = () => {
  // Define tus datos en una matriz de objetos
  const alumnos = [
    {
      id: 1,
      numeroControl: '191900504',
      nombre: 'Maricruz Ruiz Luis',
      nombreProyecto: 'Ing Sistemas Computacionales',
      programaeducativo: 'Tec',
      periodo: 'Generador de Horarios',
      calificacionparcial: '2001-2023',
    },
    // Agrega más objetos para más filas
  ];

  return (
    <div className="contenido__evaluaciones__seguimiento">
      <h2>Relación de resultados de Evaluaciones Reporte</h2>
      <div className="tablita">
        <table border="1">
          <thead>
            <tr>
              <th>N° DE CONTROL</th>
              <th>NOMBRE</th>
              <th>NOMBRE DEL PROYECTO</th>
              <th>PROGRAMA EDUCATIVO</th>
              <th>PERIODO</th>
              <th>CALIFICACIÓN PARCIAL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>{alumno.numeroControl}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.nombreProyecto}</td>
                <td>{alumno.programaeducativo}</td>
                <td>{alumno.periodo}</td>
                <td>{alumno.calificacionparcial}</td>
                <td>
                  <button>MODIFICAR</button>
                  <br />
                  <button>ELIMINAR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluacionesseguimiento;