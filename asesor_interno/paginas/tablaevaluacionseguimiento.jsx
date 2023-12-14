import React from 'react';

const Tablaevaluacionseguimiento = () => {
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
          
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button>MODIFICAR</button>
                  <br />
                  <button>ELIMINAR</button>
                </td>
             
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tablaevaluacionseguimiento;