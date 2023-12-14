import React, { useState, useEffect } from "react";

import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
  updateDataDoc,
  residenteaceptado,
} from "./formato";
import axios from "axios";
import './../../estilos_impresion/externo/vertical/estilos-impresion_externo_vertical.css';
/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */

const Asignacionasesorint = (props) => {
  const nombrealm = props.graphData.graphData.graphData.displayName;
    //const correo = props.graphData.graphData.graphData.mail;
    const correo = props.graphData.graphData.graphData.mail.toLowerCase();
  const numerosExtraidos = correo.match(/\d+/);
  const numerosComoCadena = numerosExtraidos ? numerosExtraidos[0] : "";
  // Para obtener los números como un número entero, puedes hacer:
  //const numerosComoEntero = numerosExtraidos ? parseInt(numerosExtraidos[0], 10) : null;
  const nombreasesoresE = "api/asesores-es";
  const [asesoresE, setAsesoresE] = useState(null);



  //console.log("esto es props", correo);
  const [data, setData] = useState(null);
  //PARA VISUALISAR ESPECIALIDEDEDES
  const [especialidades, setEspecialidades] = useState(null);
  //PARA VISUALISAR ESPECIALIDEDEDES
  const [asesores, setAsesores] = useState(null);

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
  //const residentesregistro =
  const jefedepartamento = "api/jefedepartamentos";
  const [jefedep, setjefedep] = useState(null);

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
        const asesoresE = await fetchData(nombreasesoresE);
        setAsesoresE(asesoresE);

        const jefedep = await fetchData(jefedepartamento);
        setjefedep(jefedep);
        console.log("¡Cargo todos los datos!");
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

  //##################################################

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const crear = async () => {
    /*
    const residenteSeleccionado = data.data.find(
        (item) => item.attributes.nombre === newItem.nombre
      );
    
      // Verificar si se encontró un residente
      if (residenteSeleccionado) {
        try {
          // Agregar lógica para crear el elemento con los datos del residente seleccionado
          await residenteaceptado({
            // Incluir aquí las propiedades del residente seleccionado que desees agregar al nuevo elemento
            nombre: residenteSeleccionado.attributes.nombre,
            ncontrol: residenteSeleccionado.attributes.ncontrol,
            nombre_anteproyecto: residenteSeleccionado.attributes.nombre_anteproyecto,
            periodo: residenteSeleccionado.attributes.periodo,
            empresa: residenteSeleccionado.attributes.empresa,
            asesorE: residenteSeleccionado.attributes.asesorE,
            carrera: residenteSeleccionado.attributes.carrera,
          });
    
          // Puedes realizar otras acciones después de crear el elemento
          console.log("Elemento creado exitosamente");
        } catch (error) {
          console.error("Error al crear el elemento:", error);
        }
      } else {
        // Manejar el caso en que no se encontró un residente
        console.log("Residente no encontrado");
      }
  
      */
    //setMostrarVentanaEmergente(true);
    console.log("PRESIONADO");
  };
  const handleCrearClick = () => {
    // Lógica para mostrar el popup
    setMostrarPopup(true);
  };

  const registrar =  async () =>{
    const residenteSeleccionado = data.data.find(
      (item) => item.attributes.nombre === newItem.nombre
    );
    if(residenteSeleccionado){
      setNewItem({
        ...newItem,
        id: residenteSeleccionado.id,
        nombre: residenteSeleccionado.attributes.nombre,
        ncontrol: residenteSeleccionado.attributes.ncontrol,
        nombre_anteproyecto:
          residenteSeleccionado.attributes.nombre_anteproyecto,
        periodo: residenteSeleccionado.attributes.periodo,
        empresa: residenteSeleccionado.attributes.empresa,
        asesorE: residenteSeleccionado.attributes.asesorE,
        asesorI: residenteSeleccionado.attributes.asesorI,
        carrera: residenteSeleccionado.attributes.carrera,
       
      });
      await updateData(newItem.id, newItem, nombretabla);
      window.location.reload();
    }else{
      console.log("No se selecciono")
    }
   
    // Lógica para mostrar el popup
   
   
  };

  const handleCerrarPopup = () => {
    // Lógica para cerrar el popup
    setMostrarPopup(false);
  };
  //########################################################################

  const handleResidenteChange = (e) => {
    // Obtener el residente seleccionado
    const residenteSeleccionado = data.data.find(
      (item) => item.attributes.nombre === e.target.value
    );

    // Verificar si se encontró un residente
    if (residenteSeleccionado) {
      // Actualizar el estado con la información del residente seleccionado
      setNewItem({
        ...newItem,
        id: residenteSeleccionado.id,
        nombre: residenteSeleccionado.attributes.nombre,
        ncontrol: residenteSeleccionado.attributes.ncontrol,
        nombre_anteproyecto:
          residenteSeleccionado.attributes.nombre_anteproyecto,
        periodo: residenteSeleccionado.attributes.periodo,
        empresa: residenteSeleccionado.attributes.empresa,
        asesorE: residenteSeleccionado.attributes.asesorE,
        asesorI: residenteSeleccionado.attributes.asesorI,
        carrera: residenteSeleccionado.attributes.carrera,
       
      });

      console.log("ESTO ES ID",residenteSeleccionado.id);
      
    } else {
      // Manejar el caso en que no se encontró un residente
      console.log("Residente no encontrado");
      setNewItem({
        //...newItem,
        nombre: "",
        ncontrol: "",
        nombre_anteproyecto: "",
        periodo: "",
        empresa: "",
        carrera: "",
      });
    }
  };
  //#####################################################################
  const imprimir3 = () => {
      // Ocultar otros elementos antes de imprimir
      const style = document.createElement('style');
      style.innerHTML = `
      @page { 
          size: letter;
      }
      @media print {
          body *{
              font-size: 11px;
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

  

  return (
    <div className="contenido">
      <div className="contenido__texto">
        <h1>Asignación de Asesor Interno de Residencia Profesional</h1>
      </div>
      <div className="Evalucionreporteresidente__preguntas">
        <div className="contenido__preguntas">
          <div className="informacion__pregunta">
            <span>Seleccione al Residente Aprobado:</span>

            <select
              value={newItem.nombreResidente}
              onChange={handleResidenteChange}
            >
              <option value="">Seleccionar Un Residente</option>
              {data &&
                data.data.map((item) => (
                  <option key={item.id} value={item.attributes.nombre}>
                    {item.attributes.nombre}
                  </option>
                ))}
            </select>

            <span>Seleccione al Asesor Interno:</span>
            <select
              value={newItem.asesorI || ""}
              onChange={(e) => {
                const selectedAsesor =
                  asesores && asesores.data
                    ? asesores.data.find(
                        (asesor) => asesor.attributes.nombre === e.target.value
                      )
                    : null;

                setNewItem({
                  ...newItem,
                  asesorI: e.target.value,
                  idasesor: selectedAsesor ? selectedAsesor.id.toString() : "",
                  correoasesor: selectedAsesor
                    ? selectedAsesor.attributes.correo
                    : "",
                });
              }}
            >
              <option value="">Selecciona un Asesor</option>
              {asesores &&
                asesores.data &&
                asesores.data.map((asesor) => (
                  <option key={asesor.id} value={asesor.attributes.nombre}>
                    {asesor.attributes.nombre}
                  </option>
                ))}
            </select>

            {errors.asesorE && <p style={{ color: "red" }}>{errors.asesorE}</p>}
            <span>Nombre del proyecto:</span>
            <input
              type="text"
              name="name"
              value={newItem.nombre_anteproyecto}
              onChange={(e) =>
                setNewItem({ ...newItem, nombre_anteproyecto: e.target.value })
              }
            ></input>
            <span>Número de Control:</span>
            <input
              type="text"
              name="name"
              value={newItem.ncontrol}
              onChange={(e) =>
                setNewItem({ ...newItem, ncontrol: e.target.value })
              }
            ></input>
          </div>
          <div className="informacion__pregunta">
            <span>Nombre del Residente:</span>
            <input
              type="text"
              name="name"
              value={newItem.nombre}
              onChange={(e) =>
                setNewItem({ ...newItem, nombre: e.target.value })
              }
            ></input>
            <span>Carrera:</span>
            <input
              type="text"
              name="name"
              value={newItem.carrera}
              onChange={(e) =>
                setNewItem({ ...newItem, carrera: e.target.value })
              }
            ></input>
            <span>Periodo de Realización:</span>
            <input
              type="text"
              name="name"
              value={newItem.periodo}
              onChange={(e) =>
                setNewItem({ ...newItem, periodo: e.target.value })
              }
            ></input>
          </div>
        </div>
        <button className="btn-asig" onClick={registrar}>
          Registrar
        </button>

        <button className="btn-asig" onClick={handleCrearClick}>
          Imprimir
        </button>
      </div>

      {mostrarPopup && (
        <div className="externovertical">
          <div className="externoverticalcontenido">
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
                    ASIGNACIÓN DE ASESOR INTERNO DE RESIDENCIA
                    <br />
                    PROFESIONAL
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Código:
                    <br />
                    FR-ITISMO-7.5.1-07-02
                    <br />
                    Versión:
                    <br />
                    Rev. 1
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <p style={{ textAlign: "right", fontWeight: "bold" }}>
              Departamento: SISTEMAS Y
              <br />
              COMPUTACIÓN
              <br />
              No. Oficio: {newItem.id}
              {" / "} {soloanio()}
            </p>
            <p style={{ textAlign: "right", fontWeight: "bold" }}>
              ASUNTO: Asesor interno de Residencia Profesionales
            </p>
            <p style={{ textAlign: "right" }}>
              Hca. Ciudad de Juchitán De Zaragoza, Oaxaca, a{" "}
              {obtenerFechaFormateada()}.
            </p>
            <p style={{ textAlign: "left", fontWeight: "bold" }}>
              {newItem.asesorI}
              <br />
              Docente de Sistemas y Computación
              <br />P R E S E N T E.
            </p>

            <p style={{ textAlign: "left" }}>
              Por este conducto informo a usted que ha sido asignado para fungir
              como Asesor interno del Proyecto
              <br />
              de Residencia Profesionales que a continuación se describe:
            </p>
            <table className="mi-tabla">
              <tbody>
                <tr>
                  <td>
                    <p style={{ textAlign: "left" }}>
                      Nombre del <br />
                      Residente:
                    </p>
                  </td>
                  <td>
                    <p>{newItem.nombre}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style={{ textAlign: "left" }}>Carrera:</p>
                  </td>
                  <td>
                    <p>{newItem.carrera}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style={{ textAlign: "left" }}>Nombre del Proyecto:</p>
                  </td>
                  <td>
                    <p>{newItem.nombre_anteproyecto}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style={{ textAlign: "left" }}>Periodo de realización:</p>
                  </td>
                  <td>
                    <p>{newItem.periodo}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style={{ textAlign: "left" }}>Nombre de la Empresa:</p>
                  </td>
                  <td>
                    <p>{newItem.empresa}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <p style={{ textAlign: "left" }}>
              Así mismo, le solicito dar el seguimiento y asesoria pertinente a
              la realización del proyeto aplicando <br />
              los lineamientos establecidos para ello e informar el avance de
              dicha residencia.
            </p>
            <p style={{ textAlign: "left" }}>
              Agradezco de antemano su valioso apoyo en esta importante
              actividad para la formación profesional <br />
              de nuestro estudiantado.
            </p>

            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Atentamente
            </p>
            <br />
            <br />
            <br />
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
            {jefedep && jefedep.data.length > 0 && (
                        <p>{jefedep.data[0].attributes.nombre}</p>
                      )}<br />
             
              SISTEMAS Y COMPUTACIÓN
            </p>
            <p style={{ textAlign: "left" }}>C.c.p. Expediente</p>
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
};
export default Asignacionasesorint;
