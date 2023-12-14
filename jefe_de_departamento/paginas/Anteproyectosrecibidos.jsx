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
import "./../../estilos_impresion/externo/horizontal/estilo-impresion_externo_horizontal.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */

function Anteproyectosrecibidos(props) {
  const nombrealm = props.graphData.graphData.graphData.displayName;
  //const correo = props.graphData.graphData.graphData.mail;
  const correo = props.graphData.graphData.graphData.mail.toLowerCase();

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
  const [asesores, setAsesores] = useState(null);
  ///api/residentesuploads
  //pruebas de importacion
  const nombretabla = "api/residentesuploads";
  const nombredocumentos = "api/upload/files/";
  //#####################################
  const nombreasesores = "api/asesores-is";

  //pruebas de importacion
  const contenidodocumento = "api/upload";
  //
  const direccionapi = "http://localhost:1337/";
  ///
  //PRESIDENTE Y SUBDIRECTOACTUAL
  const presidenteactual = "api/presidenteacademicos";
  const subdirectoractual = "api/subdirectoractuals";
  const jefedepartamento = "api/jefedepartamentos";
  const [presiactual, setpresiactual] = useState(null);
  const [subdiactual, setsubdiactual] = useState(null);
  const [jefedep, setjefedep] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //#######################################

  const [GrupoAsesores, setGrupoAsesores] = useState(null);
  useEffect(() => {
    // Cargar los datos iniciales al montar el componente
    async function fetchDataAsync() {
      try {
        const data = await fetchData(nombretabla);
        setData(data);
        const asesores = await fetchData(nombreasesores);
        setAsesores(asesores);

        const presiactual = await fetchData(presidenteactual);
        setpresiactual(presiactual);
        const subdiactual = await fetchData(subdirectoractual);
        setsubdiactual(subdiactual);

        const jefedep = await fetchData(jefedepartamento);
        setjefedep(jefedep);
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

  const [mostrarPopup, setMostrarPopup] = useState(false);

  const handleCrearClick = () => {
    // Lógica para mostrar el popup
    setMostrarPopup(true);
  };

  const handleCerrarPopup = () => {
    // Lógica para cerrar el popup
    setMostrarPopup(false);
  };

  const imprimir3 = () => {
    // Ocultar otros elementos antes de imprimir
    const style = document.createElement("style");
    style.innerHTML = `
       @page { 
           size: landscape; 
       }
       @media print {
           body *{
               font-size: 16px;
           }
       }
   `;

    // Agregar el estilo al head del documento
    document.head.appendChild(style);
    window.print();
  };

  //####################################
  const obtenerFechaFormateada = () => {
    const opcionesFecha = {
      //weekday: 'long', // día de la semana completo
      day: "numeric", // día del mes
      month: "long", // nombre del mes completo
      year: "numeric", // año con cuatro dígitos
    };

    const fechaActual = new Date();

    const dia = fechaActual.toLocaleDateString("es-MX", opcionesFecha);

    return dia;
  };
  const soloanio = () => {
    const opcionesFecha = {
      // nombre del mes completo
      year: "numeric", // año con cuatro dígitos
    };

    const fechaActual = new Date();

    const anio = fechaActual.toLocaleDateString("es-MX", opcionesFecha);

    return anio;
  };

  const elementosConAsesores =
    Array.isArray(data?.data) && Array.isArray(asesores?.data)
      ? data.data.map((elemento) => {
          const asesor = asesores.data.find(
            (a) => a.attributes.nombre === elemento.attributes.asesorI
          );
          return {
            ...elemento,
            asesorNombre: asesor ? asesor.attributes.nombre : "Desconocido",
          };
        })
      : [];

  console.log("Esto es grupo asesores !", elementosConAsesores);

  function getSemester() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    let semester1 = "";
    let semester2 = "";

    if (currentMonth >= 1 && currentMonth <= 6) {
      semester1 = ` ${currentYear}`;
      semester2 = " ";
    } else {
      semester1 = " ";
      semester2 = `  ${currentYear}`;
    }

    return { semester1, semester2 };
  }
  const { semester1, semester2 } = getSemester();

  /*
const fecha = new Date();
const dia = String(fecha.getDate()).padStart(2, '0');
const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1.
const anio = fecha.getFullYear();
const anioactual = `${mes}/${dia}/${anio}`;

const fecha = new Date();
const anioactual = fecha.toLocaleDateString('es-ES');

console.log("Esto es el año actual !", anioactual);
*/

  //############

  //const [rangoInicio, setRangoInicio] = useState(1);
  //const [rangoFin, setRangoFin] = useState(3);

  //const elementosFiltrados = elementosConAsesores
  //.filter((item, index) => index + 1 >= rangoInicio && index + 1 <= rangoFin && item.attributes.estado === "Aprobado");

  const [rangoInicio, setRangoInicio] = useState(1);
  const [rangoFin, setRangoFin] = useState(elementosConAsesores.length);

  const elementosFiltrados = elementosConAsesores.filter(
    (item, index) =>
      index + 1 >= rangoInicio &&
      index + 1 <= rangoFin &&
      item.attributes.estado === "Aprobado"
  );


  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div className="contenido__anteproyectosubir">
      <div className="Anteproyectosubir__titulo">
        <h1>
          Buen día Jefe de departamento, estos son los Anteproyectos aceptados
          por la coordinadora
          <br />
          De Residencia Profesional
        </h1>

      </div>
      <div className="Anteproyectosubir__preguntas">
      <p>Imprimir dictamenes </p>

      <div>

<select
value={rangoInicio}
onChange={(e) => setRangoInicio(Number(e.target.value))}
>
{Array.from({ length: elementosConAsesores.length }, (_, index) => (
<option key={index + 1} value={index + 1}>
{`Del ${index + 1}`}
</option>
))}
</select>

<span> a </span>

<select
value={rangoFin}
onChange={(e) => {
const nuevoRangoFin = Number(e.target.value);
const diferencia = nuevoRangoFin - rangoInicio;

if (diferencia > 3) {
// Si la diferencia es más de 3, ajustamos el rango final
setRangoFin(rangoInicio + 3);
} else {
// Si la diferencia es 3 o menos, aceptamos el valor seleccionado
setRangoFin(nuevoRangoFin);
}
}}
>
{Array.from({ length: elementosConAsesores.length }, (_, index) => (
<option key={index + 1} value={index + 1}>
{`Al ${index + 1}`}
</option>
))}
</select>
</div>
<div>
<label>Selecciona una fecha: </label>
<DatePicker
selected={selectedDate}
onChange={handleDateChange}
dateFormat="dd/MM/yyyy"
// Ajusta otros props según tus necesidades
/>

</div>
        <div className="informacion__tabla">
          <table className="tablaprueba" border="1">
            <thead>
              <tr>
                <th>Número de Control</th>
                <th>Nombre</th>
                <th>Nombre de Anteproyecto</th>
                <th>Periodo</th>
                <th>Empresa</th>
                <th>Asesor Externo</th>
                <th>Asesor Interno</th>
                <th>Nombre Doc</th>
                <th>Carrera</th>
                <th>Estado</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* {data &&
                data.data.map((item) => (*/}
              {data &&
                data.data
                  .filter((item) => item.attributes.estado === "Aprobado")
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.attributes.ncontrol}</td>
                      <td>{item.attributes.nombre}</td>
                      <td>{item.attributes.nombre_anteproyecto}</td>
                      <td>{item.attributes.periodo}</td>
                      <td>{item.attributes.empresa}</td>
                      <td>{item.attributes.asesorE}</td>
                      <td>{item.attributes.asesorI}</td>

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
                      <td>{item.attributes.carrera}</td>
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
          <button onClick={handleCrearClick}> Generar Dictamen </button>
        </div>
      </div>

      {mostrarPopup && (
        <div className="externohorizontal">
          <div className="contenidoexternohorizontal">
            <div className="cabeceraimpresion">
              <table className="mi-tabla">
                <tbody>
                  <tr>
                    <td>
                      <img
                        src="https://istmo.tecnm.mx/wp-content/uploads/2021/08/logo-tec-png-naranja.png"
                        alt="Descripción de la imagen"
                        width="100" // Establece el ancho en píxeles
                        height="50" // Establece la altura en píxeles
                      />
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                      Instituto Tecnológico Del Istmo
                      <br />
                      "Por una Tecnología Propia como principio de libertad"
                      <br />
                      FORMATO PARA DICTAMEN DE RESIDENCIAS PROFESIONALES
                      <br />
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                      Código:
                      <br />
                      FR-ITISTMO-7.5.1-16-01
                      <br />
                      Versión:
                      <br />
                      Rev. 1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <br />
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              INSTITUTO TECNOLÓGICO DEL ISTMO
              <br />
              DEPARTAMENTO DE SISTEMAS Y COMPUTACIÓN
              <br />
              DICTAMEN DE ANTEPROYECTOS DE RESIDENCIAS PROFESIONALES
            </p>

            <div className="dictamencontenido">
              <div className="informacion__pregunta"></div>
              <div className="informacion__pregunta">
                <p style={{ textAlign: "right", fontWeight: "bold" }}>
                  <table className="mi-tabla2" border="1">
                    <tr>
                      <th rowSpan={2}>SEMESTRE</th>
                      <td>ENE - JUN</td>
                      <td>{semester1}</td>
                    </tr>
                    <tr>
                      <td>AGO - DIC</td>
                      <td>{semester2}</td>
                    </tr>
                  </table>
                </p>
              </div>
            </div>

            <table className="mi-tabla2" border="1">
              <thead>
                <tr>
                  <th>Num</th>
                  <th>Número de Control</th>
                  <th>Nombre del Estudiante</th>
                  <th>Genero</th>
                  <th>Nombre de Anteproyecto</th>
                  <th>Empresa</th>
                  <th>Asesor Externo</th>
                  <th>Asesor Interno</th>
                  <th>Dictamen</th>
                  <th>Fecha Dictamen</th>
                </tr>
              </thead>
              <tbody>
                {/* {data &&
                data.data.map((item) => (
                  o
                    {data &&
                data.data
                .filter((item) => item.attributes.estado === "Aprobado")
                .map((item,index) => (
                  
                  */}

                {/*
            {elementosConAsesores
            .filter((item) => item.attributes.estado === "Aprobado")
            .map((item, index) => (

            */}
                {elementosFiltrados.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: 'center'}}>{rangoInicio + index}</td>
                    <td style={{ textAlign: 'center'}}>{item.attributes.ncontrol.toUpperCase()}</td>
                    <td >{item.attributes.nombre.toUpperCase()}</td>
                    <td style={{ textAlign: 'center'}}>{item.attributes.genero.toUpperCase()}</td>
                    <td >{item.attributes.nombre_anteproyecto.toUpperCase()}</td>

                    <td>{item.attributes.empresa.toUpperCase()}</td>
                    <td >{item.attributes.asesorE.toUpperCase()}</td>
                    <td >{item.attributes.asesorI.toUpperCase()}</td>
                    <td style={{ textAlign: 'center'}}>{item.attributes.estado.toUpperCase()}</td>
                    <td style={{ textAlign: 'center'}}>{selectedDate.toLocaleDateString("es-ES")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p style={{ textAlign: "center" }}>
              <br />
              En caso que uno o más Anteproyectos sean rechazados se elaborará
              otro registro únicamente con los anteproyectos redictaminado
            </p>

            <div className="pie-paginaimpresion">
              <table className="mi-tabla">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                      Propone
                      <br />
                      <br />
                      <br />
                      {/*    {presiactual && presiactual.data.map((item) => (
                      <p>
                        {item.attributes.nombre}
                      </p>
                    ))}
                */}
                      {presiactual && presiactual.data.length > 0 && (
                        <p>{presiactual.data[0].attributes.nombre}</p>
                      )}
                      PRESIDENTE DE ACADEMIA
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                      Valida
                      <br />
                      <br />
                      <br />
                      {jefedep && jefedep.data.length > 0 && (
                        <p>{jefedep.data[0].attributes.nombre}</p>
                      )}
                      JEFE DEL DEPTO. ACADEMICO
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                      Vo Bo.
                      <br />
                      <br />
                      <br />
                      {subdiactual && subdiactual.data.length > 0 && (
                        <p>{subdiactual.data[0].attributes.nombre}</p>
                      )}
                      SUBDIRECTOR ACADEMICO
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Agrega más campos según sea necesario */}
            <button className="btn-asig" onClick={imprimir3}>
              Imprimir
            </button>
            <button className="btn-asig" onClick={handleCerrarPopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Anteproyectosrecibidos;
