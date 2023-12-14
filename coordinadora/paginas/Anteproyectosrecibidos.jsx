import React, { useState, useEffect } from "react";

import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
  updateDataDoc,
  stado,
} from "./Api";
import axios from "axios";

function Anteproyectosrecibidos() {
  const [data, setData] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [editingId, setEditingId] = useState(null); // ID del elemento en edición
  const [documentId, setDocumentId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentoCargado, setDocumentoCargado] = useState(false);

  const [newItem, setNewItem] = useState({
    nombre: "",
    ncontrol: "",
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
  });

  ///api/residentesuploads
  //pruebas de importacion
  const nombretabla = "api/residentesuploads";
  const nombredocumentos = "api/upload/files/";
  //#####################################

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
        console.log("Cargo data !", data);
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

  const handleCreate = async () => {
    try {
      if (!selectedFile) {
        console.log("Selecciona un archivo PDF antes de cargarlo.");
        const successMessage = "Selecciona un archivo PDF antes de cargarlo.";
        alert(successMessage);
        return;
      }
      const formData = new FormData();
      formData.append("files", selectedFile);

      try {
        //'http://localhost:1337/api/upload'
        const response = await axios.post(
          `${direccionapi}${contenidodocumento}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // El archivo se ha cargado con éxito
          console.log("Archivo PDF cargado con éxito.");
          setUploadedFileName(selectedFile.name);
          const namedocs = selectedFile.name;
          const fileId = response.data[0].id;
          setDocumentId(fileId);
          await createData(newItem, nombretabla, fileId.toString(), namedocs);
          const updatedData2 = await fetchData(nombretabla);
          const lastIndex = updatedData2.data.length - 1;
          const lastItem = updatedData2.data[lastIndex];
          const lastItemId = lastItem.id;
          console.log("ID del último elemento:", lastItemId);
        }
      } catch (error) {
        console.error("Error al cargar el archivo PDF:", error);
        const successMessage = "Error al cargar el archivo PDF";
        alert(successMessage);
      }

      // Actualizar la lista después de crear
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);

      // Limpiar los campos
      setNewItem({
        nombre: "",
        ncontrol: "",
        nombre_anteproyecto: "",
        periodo: "",
        empresa: "",
        asesorE: "",
      });
    } catch (error) {
      console.error("Error al crear el elemento:", error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    // Obtener los datos del elemento en edición
    const itemToEdit = data.data.find((item) => item.id === id);
    if (itemToEdit) {
      setNewItem({
        nombre: itemToEdit.attributes.nombre,
        ncontrol: itemToEdit.attributes.ncontrol,
        nombre_anteproyecto: itemToEdit.attributes.nombre_anteproyecto,
        periodo: itemToEdit.attributes.periodo,
        empresa: itemToEdit.attributes.empresa,
        asesorE: itemToEdit.attributes.asesorE,
      });
    }
  };

  const Aceptado = async (userid, desc) => {
    const estatus = "Aprobado";
    try {
      await stado(userid, estatus.toString(), desc.toString(), nombretabla);
      // Actualizar la lista después de actualizar
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);
    } catch (error) {
      console.error("Error al actualizar el elemento:", error);
    }
  };

  const Rechazado = async (userid, desc) => {
    const estatus = "Rechazado";
    try {
      await stado(userid, estatus.toString(), desc.toString(), nombretabla);
      // Actualizar la lista después de actualizar
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);
    } catch (error) {
      console.error("Error al actualizar el elemento:", error);
    }
  };

  const corregir = async (userid, desc) => {
    const estatus = "Corregir";
    try {
      await stado(userid, estatus.toString(), desc.toString(), nombretabla);
      // Actualizar la lista después de actualizar
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);
    } catch (error) {
      console.error("Error al actualizar el elemento:", error);
    }
  };

  //#################

  //#################

  const pruebas = async (datos) => {
    const url = "http://localhost:1337" + datos; // Concatena la URL base con el valor de datos
    window.open(url, "_blank");
  };

  const [texto, setTexto] = useState("");

  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  // Función que se llama cuando se hace clic en el botón y recibe el contenido del textarea como parámetro
  const procesarTexto = (texto) => {
    // Realiza la lógica que deseas con el contenido del textarea
    console.log("Contenido del textarea:", texto);
  };

  return (
    <div className="contenido__anteproyectosubir">
      <div className="Anteproyectosubir__titulo">
        <h1>Anteproyecto De Residencia Profesional</h1>
      </div>
      <div className="Anteproyectosubir__preguntas">
        <div className="informacion__tabla">
          <table border="1">
            <thead>
              <tr>
                <th>Número de Control</th>
                <th>Nombre</th>
                <th>Nombre de Anteproyecto</th>
                <th>Periodo</th>
                <th>Empresa</th>
                <th>AsesorE</th>
                <th>Nombre Documento</th>
                <th>Carrera</th>
                <th>Estado</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.attributes.ncontrol}</td>
                    <td>{item.attributes.nombre}</td>
                    <td>{item.attributes.nombre_anteproyecto}</td>
                    <td>{item.attributes.periodo}</td>
                    <td>{item.attributes.empresa}</td>
                    <td>{item.attributes.asesorE}</td>

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
                          <div key={document.id}>{document.name}</div>
                        ))}
                    </td>
                    <td>
                    {item.attributes.carrera}
                    </td>
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
                    <td>
                      <div className="observaciones">
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
                              <textarea
                                name="textarea"
                                onChange={handleChange}
                                placeholder={
                                  "Observaciones:" +
                                  "\n" +
                                  item.attributes.observaciones
                                }
                              />
                            </div>
                          ))}
                      </div>
                    </td>

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
                              onClick={() => pruebas(document.url)}
                            >
                              ver documento
                            </button>
                            <button
                              className="btnrec"
                              onClick={() => Aceptado(item.id, texto)}
                            >
                              Aceptar
                            </button>
                            <button
                              className="btnrec"
                              onClick={() => Rechazado(item.id, texto)}
                            >
                              Rechazar
                            </button>
                            <button
                              className="btnrec"
                              onClick={() => corregir(item.id, texto)}
                            >
                              Corregir
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
    </div>
  );
}

export default Anteproyectosrecibidos;
