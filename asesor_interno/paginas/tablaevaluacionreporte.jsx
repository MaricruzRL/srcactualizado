import React, { useState, useEffect } from "react";


import "../../estilos_impresion/interno/estilos-impresion_asesor_interno.css"

import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
  updateDataDoc,
  agregarevaluacion,
} from "./formato";
import axios from "axios";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */

const Tablaevaluacionreporte = (props) => {
  const nombrealm = props.graphData.graphData.graphData.displayName;
   //const correo = props.graphData.graphData.graphData.mail;
   const correo = props.graphData.graphData.graphData.mail.toLowerCase();
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

  const nuevalua2 = "api/evaluacion2s";
  const nuevaluaE2 = "api/evaluacion2-es";

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

  const imprimir3 = () => {
     // Ocultar otros elementos antes de imprimir
     const style = document.createElement('style');
     style.innerHTML = `
     @page { 
         size: letter;
     }
     @media print {
         body *{
             font-size: 12px;
         }
         
     }
 `;
   
     // Agregar el estilo al head del documento
     document.head.appendChild(style);
     window.print();
  };

  const [activeDataset, setActiveDataset] = useState("evalu");
  const [activeDataset2, setActiveDataset2] = useState("evaluE");

  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedItem2, setSelectedItem2] = useState(null);

  const handleCerrarPopup = () => {
    // Lógica para cerrar el popup
    setMostrarPopup(false);
    setSelectedItem(null);
    setSelectedItem2(null);
  };

  const handleCrearClick = (item2) => {
    setSelectedItem(item2);
    setActiveDataset("evalu");
    setMostrarPopup(true);
  };

  const handleCrearClick2 = (item3) => {
    setSelectedItem2(item3);
    setActiveDataset2("evaluE");
    setMostrarPopup(true);
  };

  const mostrarp2 = () => {
    setMostrarPopupS(true);
  };
  const cerrarp2 = () => {
    setMostrarPopupS(false);
  };

  const criteriosAEvaluar = [
    { label: "Portada", valor: 2, atributo: "dato1" },
    { label: "Agradecimientos", valor: 2, atributo: "dato2" },
    { label: "Resumen", valor: 2, atributo: "dato3" },
    { label: "Índice", valor: 2, atributo: "dato4" },
    { label: "Introducción", valor: 2, atributo: "dato5" },
    {
      label: "Problemas a resolver, priorizándolos",
      valor: 5,
      atributo: "dato6",
    },
    { label: "Objetivos", valor: 5, atributo: "dato7" },
    { label: "Justificación", valor: 5, atributo: "dato8" },
    {
      label: "Marco teórico (fundamentos teóricos)",
      valor: 10,
      atributo: "dato9",
    },
    {
      label: "Procedimiento y descripción de las actividades realizadas",
      valor: 5,
      atributo: "dato10",
    },
    {
      label:
        "Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativaes, regulaciones y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio económico",
      valor: 45,
      atributo: "dato11",
    },
    {
      label:
        "Conclusiones, recomendaciones y experiencia profesional adquirida",
      valor: 2,
      atributo: "dato12",
    },
    {
      label: "Competencias desarrolladas y/o aplicadas",
      valor: 10,
      atributo: "dato13",
    },
    { label: "Fuentes de información", valor: 3, atributo: "dato14" },
    { label: "Calificación total", valor: 100, atributo: "dato15" },
  ];

  const criteriosAEvaluar2 = [
    {
      label: "Asiste puntualmente en el horario establecido ",
      valor: 5,
      atributo: "dato1",
    },
    {
      label:
        "Trabaja en equipo y se comunica de forma efectiva (oral y escrita) ",
      valor: 10,
      atributo: "dato2",
    },
    { label: "Tiene iniciativa para colaborar ", valor: 5, atributo: "dato3" },
    { label: "Propone mejoras al proyecto ", valor: 10, atributo: "dato4" },
    {
      label: "Cumple con los objetivos correspondientes al proyecto ",
      valor: 15,
      atributo: "dato5",
    },
    {
      label:
        "Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos del cronograma ",
      valor: 15,
      atributo: "dato6",
    },
    {
      label: "Demuestra liderazgo en su actuar ",
      valor: 10,
      atributo: "dato7",
    },
    {
      label: "Demuestra conocimiento en el área de su especialidad ",
      valor: 20,
      atributo: "dato8",
    },
    {
      label:
        "Demuestra un comportamiento ético (es disciplinado, acata órdenes, respeta a sus compañeros de trabajo, entre otros)  ",
      valor: 10,
      atributo: "dato9",
    },
    { label: "Calificación total ", valor: 100, atributo: "dato10" },
  ];

  const promedios = [];
  const calcularpromedio = () => {
  
    {data &&
      data.data
        .filter((item) => item.attributes.correoasesor === correo)
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

            const dato10_1 = parseFloat(evaluacion1asesorinterno?.attributes.dato15) || 0;
            const dato10_2 = parseFloat(evaluacion1asexterno?.attributes.dato15) || 0;
            

            const promedio = (dato10_1 + dato10_2) / 2;
          
            {console.log("DATO 15 EXTERNO", evaluacion1asesorinterno.attributes.dato15)}
            {console.log("DATO 15 INTERNO", evaluacion1asexterno.attributes.dato15)}
            console.log("Promedio:", promedio);
            // Mostrar la fila solo si se encuentra una correspondencia en evalu o evaluE
            if (
              evaluacion1asesorinterno ||
              evaluacion1asexterno
            ) {
              return (
                <>
                  {/* Fila para evalu */}
                {promedio}
                </>
              );
            }
          }

          return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
        })}


  };

  return (
    <div className="contenido">
      <div className="Anteproyectosubir__titulo">
        <h1>¡Bienvenido Asesor!</h1>
        <h1>
          En este apartado tu podrás visualizar las evaluaciones que ha
          realizado
        </h1>
      </div>
      <div className="contenido_general">
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
                .filter((item) => item.attributes.correoasesor === correo)
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
                              <td>{item.attributes.nombre}</td>
                              <td>
                                {evaluacionCorrespondiente.attributes.dato15}
                              </td>
                              <button
                                className="btn-asig"
                                onClick={() => handleCrearClick(item)}
                              >
                                Imprimir Evaluación Interna
                              </button>
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
                .filter((item) => item.attributes.correoasesor === correo)
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
                              <td>{item.attributes.nombre}</td>
                              <td>
                                {evaluacionCorrespondiente.attributes.dato10}
                              </td>
                              <button
                                className="btn-asig"
                                onClick={() => handleCrearClick2(item)}
                              >
                                Imprimir Evaluación Interna
                              </button>
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
      </div>
      {/* AQUI SE MUESTRAN LAS EVALUACIONES  */}



      {selectedItem && (
        <div>
          <h2>Detalles del Elemento Seleccionado</h2>
          {/* Muestra los detalles específicos del elemento */}
          <p>ID: {selectedItem.id}</p>
          <p>Nombre: {selectedItem.attributes.nombre}</p>
          {/* Agrega más detalles según tu estructura de datos */}
        </div>
      )}

      {selectedItem && (
        <div className="aivertical">
          <div className="aiverticalcontenido">
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

            <p style={{ textAlign: "center" }}>"Hoja Oficial membretada 1"</p>

            <>
              <p style={{ textAlign: "left" }}>
                Nombre del Residente: {selectedItem.attributes.nombre}{" "}
              </p>
              <p style={{ textAlign: "left" }}>
                Número de control: {selectedItem.attributes.ncontrol}
              </p>
              <p style={{ textAlign: "left" }}>
                Nombre del Proyecto:{" "}
                {selectedItem.attributes.nombre_anteproyecto}
              </p>
              <p style={{ textAlign: "left" }}>
                Programa Educativo: {selectedItem.attributes.carrera}
              </p>
              <p style={{ textAlign: "left" }}>
                Periodo de realización de la residencia profesional:
                {selectedItem.attributes.periodo}{" "}
              </p>
              {console.log("ESTO ES CORREO:", correo)}
              <p style={{ textAlign: "left" }}>
                Calificación Parcial (Promedio de ambas evaluaciones) :{" "}
                {data &&
  data.data
    .filter((item) => item.attributes.correoasesor === correo)
    .map((item) => {
      if (evaluE && evaluE.data && evalu && evalu.data) {
        // Verificar si el elemento actual es el seleccionado
        if (selectedItem && item.id === selectedItem.id) {
          const evaluacion1asesorinterno = evaluE.data.find(
            (evaluItem) => evaluItem.attributes.idevaluado === selectedItem.id.toString()
          );

          const evaluacion1asexterno = evalu.data.find(
            (evaluEItem) => evaluEItem.attributes.idevaluado === selectedItem.id.toString()
          );

          const dato10_1 = parseFloat(evaluacion1asesorinterno?.attributes.dato15) || 0;
          const dato10_2 = parseFloat(evaluacion1asexterno?.attributes.dato15) || 0;

          const promedio = (dato10_1 + dato10_2) / 2;

          console.log("DATO 15 EXTERNO", evaluacion1asesorinterno?.attributes.dato15);
          console.log("DATO 15 INTERNO", evaluacion1asexterno?.attributes.dato15);
          console.log("Promedio:", promedio);

          if (evaluacion1asesorinterno || evaluacion1asexterno) {
            return (
              <React.Fragment key={item.id}>
                {/* Fila para evalu */}
                {promedio}
              </React.Fragment>
            );
          }
        }
      }

      return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
    })}

              </p>
            </>

            <table className="mi-tabla2">
              <tbody>
                {evalu &&
                  evalu.data &&
                  evalu.data
                    .filter(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado ===
                        selectedItem.id.toString()
                    )
                    .map((evaluacionCorrespondiente) => {
                      // Mostrar la fila solo si se encuentra una correspondencia en evalu
                      if (evaluacionCorrespondiente) {
                        return (
                          <>
                            <tr>
                              En qué medida el residente cumple con lo siguiente
                            </tr>

                            <th>Criterios a evaluar </th>
                            <th>Valor</th>
                            <th>Evaluación</th>

                            {criteriosAEvaluar.map((criterio, index) => (
                              <tr key={`dato${index + 1}`}>
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
                              {
                                evaluacionCorrespondiente.attributes
                                  .observaciones
                              }
                            </p>
                          </>
                        );
                      }

                      return null;
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
                      {evalu &&
                        evalu.data &&
                        evalu.data
                          .filter(
                            (evaluItem) =>
                              evaluItem.attributes.idevaluado ===
                              selectedItem.id.toString()
                          )
                          .map((evaluacionCorrespondiente) => {
                            // Mostrar la fila solo si se encuentra una correspondencia en evalu
                            if (evaluacionCorrespondiente) {
                              return (
                                <>
                                  <p>
                                    {" "}
                                    {
                                      evaluacionCorrespondiente.attributes
                                        .asesori
                                    }{" "}
                                  </p>
                                </>
                              );
                            }

                            return null;
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
                      {evalu &&
                        evalu.data &&
                        evalu.data
                          .filter(
                            (evaluItem) =>
                              evaluItem.attributes.idevaluado ===
                              selectedItem.id.toString()
                          )
                          .map((evaluacionCorrespondiente) => {
                            // Mostrar la fila solo si se encuentra una correspondencia en evalu
                            if (evaluacionCorrespondiente) {
                              return (
                                <>
                                  <p>
                                    Fecha Evaluación
                                    <br />
                                    {" "}
                                    {
                                      evaluacionCorrespondiente.attributes
                                        .fecha
                                    }{" "}
                                  </p>
                                </>
                              );
                            }

                            return null;
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

      {selectedItem2 && (
        <div className="aivertical">
        <div className="aiverticalcontenido">
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

            <p style={{ textAlign: "center" }}>"Hoja Oficial membretada 2"</p>

            <>
              <p style={{ textAlign: "left" }}>
                Nombre del Residente: {selectedItem2.attributes.nombre}{" "}
              </p>
              <p style={{ textAlign: "left" }}>
                Número de control: {selectedItem2.attributes.ncontrol}
              </p>
              <p style={{ textAlign: "left" }}>
                Nombre del Proyecto:{" "}
                {selectedItem2.attributes.nombre_anteproyecto}
              </p>
              <p style={{ textAlign: "left" }}>
                Programa Educativo: {selectedItem2.attributes.carrera}
              </p>
              <p style={{ textAlign: "left" }}>
                Periodo de realización de la residencia profesional:
                {selectedItem2.attributes.periodo}{" "}
              </p>
              <p style={{ textAlign: "left" }}>
                Calificación Parcial (Promedio de ambas evaluaciones) :{" "}
                {data &&
  data.data
    .filter((item) => item.attributes.correoasesor === correo)
    .map((item) => {
      if (evaluE && evaluE.data && evalu && evalu.data) {
        // Verificar si el elemento actual es el seleccionado
        if (selectedItem2 && item.id === selectedItem2.id) {
          const evaluacion1asesorinterno = evaluE2.data.find(
            (evaluItem) => evaluItem.attributes.idevaluado === selectedItem2.id.toString()
          );

          const evaluacion1asexterno = evalu2.data.find(
            (evaluEItem) => evaluEItem.attributes.idevaluado === selectedItem2.id.toString()
          );

          const dato10_1 = parseFloat(evaluacion1asesorinterno?.attributes.dato10) || 0;
          const dato10_2 = parseFloat(evaluacion1asexterno?.attributes.dato10) || 0;

          const promedio = (dato10_1 + dato10_2) / 2;

          console.log("DATO 10 EXTERNO", evaluacion1asesorinterno?.attributes.dato10);
          console.log("DATO 10 INTERNO", evaluacion1asexterno?.attributes.dato10);
          console.log("Promedio:", promedio);

          if (evaluacion1asesorinterno || evaluacion1asexterno) {
            return (
              <React.Fragment key={item.id}>
                {/* Fila para evalu */}
                {promedio}
              </React.Fragment>
            );
          }
        }
      }

      return null; // O puedes mostrar un mensaje o lo que desees cuando no haya correspondencia
    })}
              </p>
            </>

            <table className="mi-tabla2">
              <tbody>
              {evalu2 &&
                  evalu2.data &&
                  evalu2.data
                    .filter(
                      (evaluItem) =>
                        evaluItem.attributes.idevaluado ===
                        selectedItem2.id.toString()
                    )
                    .map((evaluacionCorrespondiente) => {
                      // Mostrar la fila solo si se encuentra una correspondencia en evalu
                      if (evaluacionCorrespondiente) {
                        return (
                          <>
                            <tr>
                              En qué medida el residente cumple con lo siguiente
                            </tr>

                            <th>Criterios a evaluar </th>
                            <th>Valor</th>
                            <th>Evaluación</th>

                            {criteriosAEvaluar2.map((criterio, index) => (
                              <tr key={`dato${index + 1}`}>
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
                              {
                                evaluacionCorrespondiente.attributes
                                  .observaciones
                              }
                            </p>
                          </>
                        );
                      }

                      return null;
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
                      {evalu2 &&
                        evalu2.data &&
                        evalu2.data
                          .filter(
                            (evaluItem) =>
                              evaluItem.attributes.idevaluado ===
                              selectedItem2.id.toString()
                          )
                          .map((evaluacionCorrespondiente) => {
                            // Mostrar la fila solo si se encuentra una correspondencia en evalu
                            if (evaluacionCorrespondiente) {
                              return (
                                <>
                                  <p>
                                    {" "}
                                    {
                                      evaluacionCorrespondiente.attributes
                                        .asesori
                                    }{" "}
                                  </p>
                                </>
                              );
                            }

                            return null;
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
                      {evalu2 &&
                        evalu2.data &&
                        evalu2.data
                          .filter(
                            (evaluItem) =>
                              evaluItem.attributes.idevaluado ===
                              selectedItem2.id.toString()
                          )
                          .map((evaluacionCorrespondiente) => {
                            // Mostrar la fila solo si se encuentra una correspondencia en evalu
                            if (evaluacionCorrespondiente) {
                              return (
                                <>
                                  <p>
                                    Fecha Evaluación
                                    <br />
                                    {" "}
                                    {
                                      evaluacionCorrespondiente.attributes
                                        .fecha
                                    }{" "}
                                  </p>
                                </>
                              );
                            }

                            return null;
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
    </div>
  );
};
export default Tablaevaluacionreporte;
