import React, { useState, useEffect } from "react";

import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
  updateDataDoc,
  agregarevaluacion,
} from "./formato";
import axios from "axios";
import "../../estilos_impresion/estudiante/estilos-impresion_estudiante.css"
/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */


const Resultadoevaluaciones = (props) => {

  const nombrealm = props.graphData.graphData.graphData.displayName;
  const correo = props.graphData.graphData.graphData.mail;
  const numerosExtraidos = correo.match(/\d+/);
  const numerosComoCadena = numerosExtraidos ? numerosExtraidos[0] : "";
  // Para obtener los números como un número entero, puedes hacer:
  //const numerosComoEntero = numerosExtraidos ? parseInt(numerosExtraidos[0], 10) : null;

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
  const naevalua = "api/evaluacion1s";
  const naevaluaE = "api/evaluacion1-es";

  ///ESTO ES LAS 2 SEGUNDAS EVALUACIONES

  const nuevalua2 = "api/evaluacion2s"
  const nuevaluaE2 = "api/evaluacion2-es"

  const [evalu2, setEvalu2] = useState(null);
  const [evaluE2, setEvalue2] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //#######################################
  const [evalu, setEvalu] = useState(null);

  const [evaluE, setEvalue] = useState(null);
  const fetchDataAsync = async () => {
    try {
      const fetchedData = await fetchData(nombretabla);
      setData(fetchedData);

      const fetchedEspecialidades = await fetchData(nombreespecialidades);
      setEspecialidades(fetchedEspecialidades);

      const fetchedAsesores = await fetchData(nombreasesores);
      setAsesores(fetchedAsesores);

      const fetchedEvalu = await fetchData(naevalua);
      setEvalu(fetchedEvalu);

      const fetchedEvaluE = await fetchData(naevaluaE);
      setEvalue(fetchedEvaluE);

      const fetchedEvalu2 = await fetchData(nuevalua2);
      setEvalu2(fetchedEvalu2);
      const fetchedEvaluE2 = await fetchData(nuevaluaE2);
      setEvalue2(fetchedEvaluE2);

      console.log("¡Cargo todos los datos!", fetchedEvalu);
      //setEditingMode(true)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    // Cargar los datos iniciales al montar el componente
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
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarPopupS, setMostrarPopupS] = useState(false);


  const [mostrarPopup3, setMostrarPopup3] = useState(false);
  const [mostrarPopup4, setMostrarPopup4] = useState(false);

  const imprimir3 = () => {
    // Ocultar otros elementos antes de imprimir
    const style = document.createElement('style');
    style.innerHTML = `
    @page { 
        size: letter;
    }
    @media print {
        body *{
            font-size: 13px;
        }
        
    }
`;
  
    // Agregar el estilo al head del documento
    document.head.appendChild(style);
    window.print();
  };

  const handleCerrarPopup = () => {
    // Lógica para cerrar el popup
    setMostrarPopup(false);
  };

  const handleCrearClick = () => {
    setMostrarPopup(true);
  };

  const mostrarp2 = () => {
    setMostrarPopupS(true);
  };
  const cerrarp2 = () => {
    setMostrarPopupS(false);
  };

  const mostrarp3 = () => {
    setMostrarPopup3(true);
  };
  const cerrarp3 = () => {
    setMostrarPopup3(false);
  };
  const mostrarp4 = () => {
    setMostrarPopup4(true);
  };
  const cerrarp4 = () => {
    setMostrarPopup4(false);
  };
//########################################################

const [mensajeresultado, setmensajeresultado] = useState(false);


useEffect(() => {
  fetchDataAsync2();
}, [correo]);

async function fetchDataAsync2() {
  try {
    const responseData = await fetchData(nombretabla);
    const residenteSeleccionado = responseData.data.find(
      (item) => item.attributes.correo === correo
    );

    // Actualizar el estado solo con el nombre del residente
    const nombreResidente = residenteSeleccionado
      ? residenteSeleccionado.attributes.nombre
      : "";
    const ncontrol = residenteSeleccionado
      ? residenteSeleccionado.attributes.ncontrol
      : "";
    const nproyecto = residenteSeleccionado
      ? residenteSeleccionado.attributes.nombre_anteproyecto
      : "";
    const perio = residenteSeleccionado
      ? residenteSeleccionado.attributes.periodo
      : "";
    const nempresa = residenteSeleccionado
      ? residenteSeleccionado.attributes.empresa
      : "";
    const asesorex = residenteSeleccionado
      ? residenteSeleccionado.attributes.asesorE
      : "";
    const asesorin = residenteSeleccionado
      ? residenteSeleccionado.attributes.asesorI
      : "";
    const especialidad = residenteSeleccionado
      ? residenteSeleccionado.attributes.carrera
      : "";

    setNewItem({
      nombre: nombreResidente,
      ncontrol: ncontrol,
      nombre_anteproyecto: nproyecto,
      periodo: perio,
      empresa: nempresa,
      asesorE: asesorex,
      carrera: especialidad,
      asesorI: asesorin,
    });
      
    if(!residenteSeleccionado){
      const successMessage = "Por favor, cargue su anteproyecto para una visualización más detallada de esta sección.";
      alert(successMessage);

    }else{
      setmensajeresultado(true);  
    }
    console.log("Esto es residente seleccionado", residenteSeleccionado);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
//##########################################################
  const criteriosAEvaluar = [
    { label: "Portada", valor: 2, atributo: "dato1" },
    { label: "Agradecimientos", valor: 2, atributo: "dato2" },
    { label: "Resumen", valor: 2, atributo: "dato3" },
    { label: "Índice", valor: 2, atributo: "dato4" },
    { label: "Introducción", valor: 2, atributo: "dato5" },
    { label: "Problemas a resolver, priorizándolos", valor: 5, atributo: "dato6" },
    { label: "Objetivos", valor: 5, atributo: "dato7" },
    { label: "Justificación", valor: 5, atributo: "dato8" },
    { label: "Marco teórico (fundamentos teóricos)", valor: 10, atributo: "dato9" },
    { label: "Procedimiento y descripción de las actividades realizadas", valor: 5, atributo: "dato10" },
    { label: "Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativaes, regulaciones y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio económico", valor: 45, atributo: "dato11" },
    { label: "Conclusiones, recomendaciones y experiencia profesional adquirida", valor: 2, atributo: "dato12" },
    { label: "Competencias desarrolladas y/o aplicadas", valor: 10, atributo: "dato13" },
    { label: "Fuentes de información", valor: 3, atributo: "dato14" },
    { label: "Calificación total", valor: 100, atributo: "dato15" },
  ];


  const criteriosAEvaluar2 = [
    { label: "Asiste puntualmente en el horario establecido ", valor: 5, atributo: "dato1" },
    { label: "Trabaja en equipo y se comunica de forma efectiva (oral y escrita) ", valor: 10, atributo: "dato2" },
    { label: "Tiene iniciativa para colaborar ", valor: 5, atributo: "dato3" },
    { label: "Propone mejoras al proyecto ", valor: 10, atributo: "dato4" },
    { label: "Cumple con los objetivos correspondientes al proyecto ", valor: 15, atributo: "dato5" },
    { label: "Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos del cronograma ", valor: 15, atributo: "dato6" },
    { label: "Demuestra liderazgo en su actuar ", valor: 10, atributo: "dato7" },
    { label: "Demuestra conocimiento en el área de su especialidad ", valor: 20, atributo: "dato8" },
    { label: "Demuestra un comportamiento ético (es disciplinado, acata órdenes, respeta a sus compañeros de trabajo, entre otros)  ", valor: 10, atributo: "dato9" },
    { label: "Calificación total ", valor: 100, atributo: "dato10" },
  ];
  return (
      <div className="contenido">
              <div className="informacion__tabla">
        <table border="1">
          <thead>
            <tr>
              <th>EVALUACIÓN DE REPORTE FINAL DE RESIDENCIA PROFESIONAL</th>
              <th>Calificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => {
                  // Verificar si evalu es diferente de null y tiene la propiedad data
                  if (evalu && evalu.data && evaluE && evaluE.data) {
                    // Verificar si existe un elemento en evalu con el mismo idevaluado
                    const evaluacionCorrespondiente = evalu.data.find(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado === item.id.toString()
                    );

                    // Verificar lo mismo para evaluE
                    const evaluacionCorrespondienteE = evaluE.data.find(
                      (evaluEItem) =>
                        evaluEItem.attributes.idevaluado === item.id.toString()
                    );

                    // Mostrar la fila solo si se encuentra una correspondencia en evalu o evaluE
                    if (
                      evaluacionCorrespondiente ||
                      evaluacionCorrespondienteE
                    ) {
                      return (
                        <React.Fragment key={item.id}>
                          {/* Fila para evalu */}
                          {evaluacionCorrespondiente && (
                            <tr>
                              <td>Evaluación de Asesor Interno</td>
                              <td>
                                {evaluacionCorrespondiente.attributes.dato15}
                              </td>
                              <button
                                className="btn-asig"
                                onClick={handleCrearClick}
                              >
                                Imprimir Evaluación Interna
                              </button>
                            </tr>
                          )}

                          {/* Fila para evaluE */}
                          {evaluacionCorrespondienteE && item.attributes.fuera === "No" && (
                            <tr>
                              <td>Evaluación de Asesor Externo</td>
                              <td>
                                {evaluacionCorrespondienteE.attributes.dato15}
                              </td>
                              <button className="btn-asig" onClick={mostrarp2}>
                                Imprimir Evaluación Externa 
                              </button>
                              {/* Agrega un botón o lo que necesites para evaluE */}
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    }
                  }

                  return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                })}
          </tbody>
        </table>
      </div>
      {mostrarPopup && (
        <div className="estvertical">
          <div className="estverticalcontenido">
            <table className="mi-tabla2">
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
                    EVALUACIÓN Y SEGUIMIENTO DE RESIDENCIA
                    <br />
                    PROFESIONAL
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Código:
                    <br />
                    FR-ITISTMO-7.5.1-07-07
                    <br />
                    Versión:
                    <br />
                    Rev. 1
                  </td>
                </tr>
              </tbody>
            </table>

            <br />

            <p style={{ textAlign: "center" }}>"Hoja Oficial membretada"</p>
            {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => (
                  
                  <>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Residente: {item.attributes.nombre}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Número de control: {newItem.ncontrol}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Proyecto: {item.attributes.nombre_anteproyecto}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Programa Educativo: {item.attributes.carrera}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Periodo de realización de la residencia profesional:
                      {item.attributes.periodo}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Calificación Parcial (Promedio de ambas evaluaciones) :{" "}
                      {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => {
                  // Verificar si evalu es diferente de null y tiene la propiedad data
                  if (evaluE && evaluE.data && evalu && evalu.data) {
                    // Verificar si existe un elemento en evalu con el mismo idevaluado
                    const evaluacion1asesorinterno = evaluE.data.find(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado === item.id.toString()
                    );

                    // Verificar lo mismo para evaluE
                    const evaluacion1asexterno = evalu.data.find(
                      (evaluEItem) =>
                        evaluEItem.attributes.idevaluado === item.id.toString()
                    );

                    const dato10_1 = parseFloat(evaluacion1asesorinterno.attributes.dato15);
                    const dato10_2 = parseFloat(evaluacion1asexterno.attributes.dato15);

                    const promedio = (dato10_1 + dato10_2) / 2;
                    {console.log("DATO 15 EXTERNO", evaluacion1asesorinterno.attributes.dato15)}
                    {console.log("DATO 15 INTERNO", evaluacion1asexterno.attributes.dato15)}
                    // Mostrar la fila solo si se encuentra una correspondencia en evalu o evaluE
                    if (
                      evaluacion1asesorinterno ||
                      evaluacion1asexterno
                    ) {
                      return (
                        <React.Fragment key={item.id}>
                          {/* Fila para evalu */}
                        {promedio}
                        </React.Fragment>
                      );
                    }
                  }

                  return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                })}
                    </p>
                  </>
                ))}

            <table className="mi-tabla2">
              <tbody>
                {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evalu && evalu.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evalu.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                              <tr>
                                En qué medida el residente cumple con lo
                                siguiente
                              </tr>

                              <th>Criterios a evaluar </th>
                              <th>Valor</th>
                              <th>Evaluación</th>

                              {criteriosAEvaluar.map((criterio, index) => (
                                <tr key={item.id + `-dato${index + 1}`}>
                                  <td>{criterio.label}</td>
                                  <td>{criterio.valor}</td>
                                  <td>
                                    {
                                      evaluacionCorrespondiente.attributes[
                                        criterio.atributo
                                      ]
                                    }
                                  </td>
                                </tr>
                              ))}

                              {/* Agrega más filas si es necesario */}
                              <p style={{ textAlign: "left" }}>Observaciones</p>
                                <p style={{ textAlign: "left" }}>
                                    {evaluacionCorrespondiente.attributes.observaciones}

                                </p>
                            </>
                          );
                        }
                      }

                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
              </tbody>
            </table>
            <br />
           
            <table className="mi-tabla">
              <tbody>
                <tr>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evalu && evalu.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evalu.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p> {evaluacionCorrespondiente.attributes.asesori} </p>
                            
                            </>
                          );
                        }
                      }

                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    </p>
                  </td>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      Sello de la empresa, organismo o dependencia
                    </p>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evalu && evalu.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evalu.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p>
                            Fecha Evaluacion
                            <br />
                             {evaluacionCorrespondiente.attributes.fecha} </p>
                            
                            </>
                          );
                        }
                      }
                      // Evaluacion 1 Asesor Interno
                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

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

      {mostrarPopupS && (
        <div className="estvertical">
        <div className="estverticalcontenido">
            <table className="mi-tabla2">
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
                    Instituto Tecnológico Del Istmo 2
                    <br />
                    "Por una Tecnología Propia como principio de libertad"
                    <br />
                    EVALUACIÓN Y SEGUIMIENTO DE RESIDENCIA
                    <br />
                    PROFESIONAL
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Código:
                    <br />
                    FR-ITISTMO-7.5.1-07-07
                    <br />
                    Versión:
                    <br />
                    Rev. 1
                  </td>
                </tr>
              </tbody>
            </table>

            <br />

            <p style={{ textAlign: "center" }}>"Hoja Oficial membretada"</p>
            {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => (
                  <>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Residente: {item.attributes.nombre}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Número de control: {item.attributes.ncontrol}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Proyecto: {item.attributes.nombre_anteproyecto}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Programa Educativo: {item.attributes.carrera}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Periodo de realización de la residencia profesional:
                      {item.attributes.periodo}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Calificación Parcial (Promedio de ambas evaluaciones) :{" "}
                      {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => {
                  // Verificar si evalu es diferente de null y tiene la propiedad data
                  if (evaluE && evaluE.data && evalu && evalu.data) {
                    // Verificar si existe un elemento en evalu con el mismo idevaluado
                    const evaluacion1asesorinterno = evaluE.data.find(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado === item.id.toString()
                    );

                    // Verificar lo mismo para evaluE
                    const evaluacion1asexterno = evalu.data.find(
                      (evaluEItem) =>
                        evaluEItem.attributes.idevaluado === item.id.toString()
                    );

                    const dato10_1 = parseFloat(evaluacion1asesorinterno.attributes.dato15);
                    const dato10_2 = parseFloat(evaluacion1asexterno.attributes.dato15);

                    const promedio = (dato10_1 + dato10_2) / 2;
                    {console.log("DATO 15 EXTERNO", evaluacion1asesorinterno.attributes.dato15)}
                    {console.log("DATO 15 INTERNO", evaluacion1asexterno.attributes.dato15)}
                    // Mostrar la fila solo si se encuentra una correspondencia en evalu o evaluE
                    if (
                      evaluacion1asesorinterno ||
                      evaluacion1asexterno
                    ) {
                      return (
                        <React.Fragment key={item.id}>
                          {/* Fila para evalu */}
                        {promedio}
                        </React.Fragment>
                      );
                    }
                  }

                  return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                })}
                    </p>
                  </>
                ))}

            <table className="mi-tabla2">
              <tbody>
                {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evaluE && evaluE.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondienteE = evaluE.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondienteE) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                              <tr>
                                En qué medida el residente cumple con lo
                                siguiente
                              </tr>

                              <th>Criterios a evaluar </th>
                              <th>Valor</th>
                              <th>Evaluación</th>
                              {criteriosAEvaluar.map((criterio, index) => (
                                <tr key={item.id + `-dato${index + 1}`}>
                                  <td>{criterio.label}</td>
                                  <td>{criterio.valor}</td>
                                  <td>
                                    {
                                      evaluacionCorrespondienteE.attributes[
                                        criterio.atributo
                                      ]
                                    }
                                  </td>
                                </tr>
                              ))}

                              {/* Agrega más filas si es necesario */}
                              {/* Agrega más filas si es necesario */}
                              <p style={{ textAlign: "left" }}>Observaciones</p>
                                <p style={{ textAlign: "left" }}>
                                    {evaluacionCorrespondienteE.attributes.observaciones}

                                </p>
                            </>
                          );
                        }
                      }

                      return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
              </tbody>
            </table>
            <br />
           
            <table className="mi-tabla">
              <tbody>
                <tr>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evaluE2 && evaluE2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evaluE2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p> {evaluacionCorrespondiente.attributes.asesori} </p>
                            
                            </>
                          );
                        }
                      }

                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    
                    </p>
                  </td>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      Sello de la empresa, organismo o dependencia
                    </p>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evaluE2 && evaluE2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evaluE2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p>
                            Fecha Evaluación 
                            <br />
                             {evaluacionCorrespondiente.attributes.fecha} </p>
                            
                            </>
                          );
                        }
                      }

                      return null;
                      //Evaluacion 1 Asesor Externo
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Agrega más campos según sea necesario */}
            <button className="btn-asig" onClick={imprimir3}>
              Imprimir
            </button>
            <button className="btn-asig" onClick={cerrarp2}>
              Cerrar
            </button>
          </div>
        </div>
      )}
{/*   //////////////////////////////////////////////////////////////////////////////////////////////                          */ }
<div className="informacion__tabla">
        <table border="1">
          <thead>
            <tr>
              <th>EVALUACIÓN Y SEGUIMIENTO DE RESIDENCIA PROFESIONAL</th>
              <th>Calificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => {
                  // Verificar si evalu es diferente de null y tiene la propiedad data
                  if (evalu2 && evalu2.data && evaluE2 && evaluE2.data) {
                    // Verificar si existe un elemento en evalu con el mismo idevaluado
                    const evaluacionCorrespondiente = evalu2.data.find(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado === item.id.toString()
                    );

                    // Verificar lo mismo para evaluE
                    const evaluacionCorrespondienteE = evaluE2.data.find(
                      (evaluEItem) =>
                        evaluEItem.attributes.idevaluado === item.id.toString()
                    );

                    // Mostrar la fila solo si se encuentra una correspondencia en evalu o evaluE
                    if (
                      evaluacionCorrespondiente ||
                      evaluacionCorrespondienteE
                    ) {
                      return (
                        <React.Fragment key={item.id}>
                          {/* Fila para evalu */}
                          {evaluacionCorrespondiente && (
                            <tr>
                              <td>Evaluación de Asesor Interno</td>
                              <td>
                                {evaluacionCorrespondiente.attributes.dato10}
                              </td>
                              <button
                                className="btn-asig"
                                onClick={mostrarp3}
                              >
                                Imprimir Evaluación Interna
                              </button>
                            </tr>
                          )}

                          {/* Fila para evaluE */}
                          {evaluacionCorrespondienteE && item.attributes.fuera === "No" && (
                            <tr>
                              <td>Evaluación de Asesor Externo</td>
                              <td>
                                {evaluacionCorrespondienteE.attributes.dato10}
                              </td>
                              <button className="btn-asig" onClick={mostrarp4}>
                                Imprimir Evaluación Externa
                              </button>
                              {/* Agrega un botón o lo que necesites para evaluE */}
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    }
                  }

                  return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                })}
          </tbody>
        </table>
      </div>  

      {mostrarPopup3 && (
        <div className="estvertical">
        <div className="estverticalcontenido">
            <table className="mi-tabla2">
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
                    EVALUACIÓN Y SEGUIMIENTO DE RESIDENCIA
                    <br />
                    PROFESIONAL
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Código:
                    <br />
                    FR-ITISTMO-7.5.1-07-07
                    <br />
                    Versión:
                    <br />
                    Rev. 1
                  </td>
                </tr>
              </tbody>
            </table>

            <br />

            <p style={{ textAlign: "center" }}>"Hoja Oficial membretada"</p>
            {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => (
                  <>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Residente: {item.attributes.nombre}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Número de control: {newItem.ncontrol}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Proyecto: {item.attributes.nombre_anteproyecto}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Programa Educativo: {item.attributes.carrera}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Periodo de realización de la residencia profesional:
                      {item.attributes.periodo}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Calificación Parcial (Promedio de ambas evaluaciones) :{" "}
                      {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => {
                  // Verificar si evalu es diferente de null y tiene la propiedad data
                  if (evaluE2 && evaluE2.data && evalu2 && evalu2.data) {
                    // Verificar si existe un elemento en evalu con el mismo idevaluado
                    const evaluacion1asesorinterno = evaluE2.data.find(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado === item.id.toString()
                    );

                    // Verificar lo mismo para evaluE
                    const evaluacion1asexterno = evalu2.data.find(
                      (evaluEItem) =>
                        evaluEItem.attributes.idevaluado === item.id.toString()
                    );

                    const dato10_1 = parseFloat(evaluacion1asesorinterno.attributes.dato10);
                    const dato10_2 = parseFloat(evaluacion1asexterno.attributes.dato10);

                    const promedio = (dato10_1 + dato10_2) / 2;
                    {console.log("DATO 15 EXTERNO", evaluacion1asesorinterno.attributes.dato15)}
                    {console.log("DATO 15 INTERNO", evaluacion1asexterno.attributes.dato15)}
                    // Mostrar la fila solo si se encuentra una correspondencia en evalu o evaluE
                    if (
                      evaluacion1asesorinterno ||
                      evaluacion1asexterno
                    ) {
                      return (
                        <React.Fragment key={item.id}>
                          {/* Fila para evalu */}
                        {promedio}
                        </React.Fragment>
                      );
                    }
                  }

                  return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                })}
                    </p>
                  </>
                ))}

            <table className="mi-tabla2">
              <tbody>
                {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evalu2 && evalu2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evalu2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                              <tr>
                                En qué medida el residente cumple con lo
                                siguiente
                              </tr>

                              <th>Criterios a evaluar </th>
                              <th>Valor</th>
                              <th>Evaluación</th>

                              {criteriosAEvaluar2.map((criterio, index) => (
                                <tr key={item.id + `-dato${index + 1}`}>
                                  <td>{criterio.label}</td>
                                  <td>{criterio.valor}</td>
                                  <td>
                                    {
                                      evaluacionCorrespondiente.attributes[
                                        criterio.atributo
                                      ]
                                    }
                                  </td>
                                </tr>
                              ))}

                              {/* Agrega más filas si es necesario */}
                              <p style={{ textAlign: "left" }}>Observaciones</p>
                                <p style={{ textAlign: "left" }}>
                                    {evaluacionCorrespondiente.attributes.observaciones}

                                </p>
                            </>
                          );
                        }
                      }

                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
              </tbody>
            </table>
            <br />
           
            <table className="mi-tabla">
              <tbody>
                <tr>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evalu2 && evalu2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evalu2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p> {evaluacionCorrespondiente.attributes.asesori} </p>
                            
                            </>
                          );
                        }
                      }

                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    </p>
                  </td>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      Sello de la empresa, organismo o dependencia
                    </p>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evalu2 && evalu2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evalu2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p> 
                            Fecha Evaluación 
                            <br />
                            {evaluacionCorrespondiente.attributes.fecha} </p>
                            
                            </>
                          );
                        }
                      }

                      return null;
                      //EVALUACION 2 ASESOR INTERNO
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Agrega más campos según sea necesario */}
            <button className="btn-asig" onClick={imprimir3}>
              Imprimir
            </button>
            <button className="btn-asig" onClick={cerrarp3}>
              Cerrar
            </button>
          </div>
        </div>
      )}


{mostrarPopup4 && (
        <div className="estvertical">
        <div className="estverticalcontenido">
            <table className="mi-tabla2">
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
                    EVALUACIÓN Y SEGUIMIENTO DE RESIDENCIA
                    <br />
                    PROFESIONAL
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Código:
                    <br />
                    FR-ITISTMO-7.5.1-07-07
                    <br />
                    Versión:
                    <br />
                    Rev. 1
                  </td>
                </tr>
              </tbody>
            </table>

            <br />

            <p style={{ textAlign: "center" }}>"Hoja Oficial membretada"</p>
            {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => (
                  <>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Residente: {item.attributes.nombre}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Número de control: {newItem.ncontrol}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Nombre del Proyecto: {item.attributes.nombre_anteproyecto}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Programa Educativo: {item.attributes.carrera}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Periodo de realización de la residencia profesional:
                      {item.attributes.periodo}{" "}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Calificación Parcial (Promedio de ambas evaluaciones) :{" "}
                      {data &&
              data.data
                .filter((item) => item.attributes.correo === correo)
                .map((item) => {
                  // Verificar si evalu es diferente de null y tiene la propiedad data
                  if (evaluE2 && evaluE2.data && evalu2 && evalu2.data) {
                    // Verificar si existe un elemento en evalu con el mismo idevaluado
                    const evaluacion1asesorinterno = evaluE2.data.find(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado === item.id.toString()
                    );

                    // Verificar lo mismo para evaluE
                    const evaluacion1asexterno = evalu2.data.find(
                      (evaluEItem) =>
                        evaluEItem.attributes.idevaluado === item.id.toString()
                    );

                    const dato10_1 = parseFloat(evaluacion1asesorinterno.attributes.dato10);
                    const dato10_2 = parseFloat(evaluacion1asexterno.attributes.dato10);

                    const promedio = (dato10_1 + dato10_2) / 2;
                    {console.log("DATO 15 EXTERNO", evaluacion1asesorinterno.attributes.dato15)}
                    {console.log("DATO 15 INTERNO", evaluacion1asexterno.attributes.dato15)}
                    // Mostrar la fila solo si se encuentra una correspondencia en evalu o evaluE
                    if (
                      evaluacion1asesorinterno ||
                      evaluacion1asexterno
                    ) {
                      return (
                        <React.Fragment key={item.id}>
                          {/* Fila para evalu */}
                        {promedio}
                        </React.Fragment>
                      );
                    }
                  }

                  return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                })}
                    </p>
                  </>
                ))}

            <table className="mi-tabla2">
              <tbody>
                {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evaluE2 && evaluE2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evaluE2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                              <tr>
                                En qué medida el residente cumple con lo
                                siguiente
                              </tr>

                              <th>Criterios a evaluar </th>
                              <th>Valor</th>
                              <th>Evaluación</th>

                              {criteriosAEvaluar2.map((criterio, index) => (
                                <tr key={item.id + `-dato${index + 1}`}>
                                  <td>{criterio.label}</td>
                                  <td>{criterio.valor}</td>
                                  <td>
                                    {
                                      evaluacionCorrespondiente.attributes[
                                        criterio.atributo
                                      ]
                                    }
                                  </td>
                                </tr>
                              ))}

                              {/* Agrega más filas si es necesario */}
                              <p style={{ textAlign: "left" }}>Observaciones</p>
                                <p style={{ textAlign: "left" }}>
                                    {evaluacionCorrespondiente.attributes.observaciones}

                                </p>
                            </>
                          );
                        }
                      }

                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
              </tbody>
            </table>
            <br />
           
            <table className="mi-tabla">
              <tbody>
                <tr>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evaluE2 && evaluE2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evaluE2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p> {evaluacionCorrespondiente.attributes.asesori} </p>
                            
                            </>
                          );
                        }
                      }

                      return null;
                      
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    </p>
                  </td>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      <br />
                      Sello de la empresa, organismo o dependencia
                    </p>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      {data &&
                  data.data
                    .filter((item) => item.attributes.correo === correo)
                    .map((item) => {
                      // Verificar si evalu es diferente de null y tiene la propiedad data
                      if (evaluE2 && evaluE2.data) {
                        // Verificar si existe un elemento en evalu con el mismo idevaluado
                        const evaluacionCorrespondiente = evaluE2.data.find(
                          (evaluItem) =>
                            evaluItem.attributes.idevaluado ===
                            item.id.toString()
                        );

                        // Mostrar la fila solo si se encuentra una correspondencia en evalu
                        if (evaluacionCorrespondiente) {
                          // Ahora puedes acceder a item.attributes.nombre si se cumple la condición
                          return (
                            <>
                           
                           <p>
                            Fecha Evaluación
                            <br />
                             {evaluacionCorrespondiente.attributes.fecha} </p>
                            
                            </>
                          );
                        }
                      }

                      return null;
                      //EVALUACION 2 ASESOR EXTERNO
                      // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
                    })}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Agrega más campos según sea necesario */}
            <button className="btn-asig" onClick={imprimir3}>
              Imprimir
            </button>
            <button className="btn-asig" onClick={cerrarp4}>
              Cerrar
            </button>
          </div>
        </div>
      )}     

{mensajeresultado && (
  <div className="mensajeseguimiento">
      <div className="mensajeseguimientocontenido">
      <h5>Hola {newItem.nombre}</h5>
      <p style={{ textAlign: 'center', color: 'red' }}>¡Aviso!</p>
      <p style={{ textAlign: 'left', color: 'black' }}>Si usted no está realizando
      su residencia profesional en la Institución,
      por favor, no tome en cuenta la evaluación del asesor externo.
      </p>
      <p style={{ textAlign: 'left', color: 'black' }}>
        Deberá acudir con dicho asesor para que le realice la evaluación.
      </p>
      <p style={{ textAlign: 'left', color: 'black' }}>
       De igual manera,deberá capturar la evaluación realizada por el asesor interno
       y realizar el cálculo del promedio de ambas evaluaciones.
      </p>
      <p style={{ textAlign: 'left', color: 'black' }}>
       En caso contrario, puede continuar con sus resultados de cada evaluación
       que se generarán de manera automática si se esta realizando dentro de la Institución.
      </p>
      <p style={{ textAlign: 'left', color: 'blue' }}>
       Si todavía no tiene asesor interno, favor de esperar a que se le asigne uno.
      </p>
      <button onClick={() => setmensajeresultado(false)}>Enterado</button>
    </div>
  </div>

)}



      </div>
  );
};
export default Resultadoevaluaciones;