import React, { useState, useEffect } from "react";

import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
  updateDataDoc,
} from "./formato";
import axios from "axios";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */


const AlumnosResidentesAsign = (props) => {
  const nombrealm = props.graphData.graphData.graphData.displayName;
  //const correo = props.graphData.graphData.graphData.mail;
  const correo = props.graphData.graphData.graphData.mail.toLowerCase();
  const numerosExtraidos = correo.match(/\d+/);
  const numerosComoCadena = numerosExtraidos ? numerosExtraidos[0] : "";
  // Para obtener los números como un número entero, puedes hacer:
  //const numerosComoEntero = numerosExtraidos ? parseInt(numerosExtraidos[0], 10) : null;

  //console.log("esto es props", correo);
  const [data, setData] = useState(null);
  //PARA VISUALIZAR ESPECIALIDEDEDES
  const [especialidades, setEspecialidades] = useState(null);
  //PARA VISUALIZAR ESPECIALIDEDEDES
  const [asesores, setAsesores] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [editingId, setEditingId] = useState(null); // ID del elemento en edición
  const [documentId, setDocumentId] = useState(null);
  const [documents, setDocuments] = useState([]);

  const [documentoCargado, setDocumentoCargado] = useState(false);

  const [newItem, setNewItem] = useState({
    nombre: nombrealm,
    ncontrol: numerosComoCadena,
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
    carrera: "",
  });

  ///api/residentesuploads
  //pruebas de importacion
  const nombretabla = "api/residentesuploads";
  const nombredocumentos = "api/upload/files/";
  //#####################################
  const nombreespecialidades = "api/especialidads";
  const nombreasesores = "api/asesores-is";
  //pruebas de importacion
  const contenidodocumento = "api/upload";
  //
  const direccionapi = "http://localhost:1337/";
  ///

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //#######################################

  useEffect(() => {
    // Cargar los datos iniciales al montar el componente
    async function fetchDataAsync() {
      try {
        const data = await fetchData(nombretabla);
        setData(data);
        const especialidades = await fetchData(nombreespecialidades);
        setEspecialidades(especialidades);
        const asesores = await fetchData(nombreasesores);
        setAsesores(asesores);
        console.log("Cargo todos los datos !");
        //setEditingMode(true)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchDataAsync();
  }, []);
  useEffect(() => {
    // Realiza una solicitud GET a la API de Strapi para obtener la lista de documentos
    async function fetchDocuments() {
      try {
        //http://localhost:1337/api/upload/files/
        const response = await axios.get(`${direccionapi}${nombredocumentos}`); // Asegúrate de usar la URL correcta
        //boleano = true;
        setDocumentoCargado(true);
        setDocuments(response.data);
      } catch (error) {
        setDocumentoCargado(false);
        console.error("Error al obtener la lista de documentos:", error);
      }
    }
    fetchDocuments();
  }, []);
  const [errors, setErrors] = useState({
    nombre: "",
    ncontrol: "",
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
    carrera: "",
    // Otros campos del ítem
  });
  const verdocumentos = async (datos) => {
    const url = "http://localhost:1337" + datos; // Concatena la URL base con el valor de datos
    window.open(url, "_blank");
  };

  return (

    <div className="contenido">
      <div className="contenido_generalasi"></div>
    <div className="informacion__tabla">
    <div className="Anteproyectosubir__titulo">
      <h1>BUEN DÍA {nombrealm} ESTOS SON SUS RESIDENTES ASIGNADOS:</h1>
    </div>
    <table border="1">
      <thead>
        <tr>
          <th>Número de Control</th>
          <th>Nombre</th>
          <th>Nombre de Anteproyecto</th>
          <th>Nombre de documento</th>
          <th>Estado</th>
          <th>Carrera</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.data
            .filter((item) => item.attributes.correoasesor === correo)
            .map((item) => (
              <tr key={item.id}>
                <td>{item.attributes.ncontrol}</td>
                <td>{item.attributes.nombre}</td>
                <td>{item.attributes.nombre_anteproyecto}</td>
                <td>{item.attributes.namedoc}</td>
                <td
                  className={
                    item.attributes.estado === "Aprobado"
                      ? "aprobado"
                      : item.attributes.estado === "En Revisión"
                      ? "en-revision"
                      : item.attributes.estado === "Corregir"
                      ? "corregir"
                      : item.attributes.estado === "Rechazado"
                      ? "rechazado"
                      : ""
                  }
                >
                  {item.attributes.estado}
                </td>
                <td>{item.attributes.carrera}</td>
                <td>


                  {documents
                    .filter(
                      (document) =>
                        document.id ===
                        (typeof item.attributes.iddocumento === "string"
                          ? parseInt(item.attributes.iddocumento, 10)
                          : item.attributes.iddocumento)
                    )
                    .map((document) => (
                      <div key={document.id}>
                                                        <button
                                className="btnrec"
                                onClick={() => verdocumentos(document.url)}
                              >
                                ver documento
                              </button>
                      </div>
                    ))}
    
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  </div>
  </div>
  );
};

export default AlumnosResidentesAsign;
