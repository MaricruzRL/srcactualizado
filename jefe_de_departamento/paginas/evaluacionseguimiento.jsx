import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
  updateDataDoc,
  residenteaceptado,
  agregarevaluacion,
} from "./formato";

import './../../estilos_impresion/externo/vertical/estilos-impresion_externo_vertical.css';

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
const Evalucionseguimiento = (props) => {
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
    nombre: "",
    ncontrol: "",
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
    carrera: "",
  });

  const [evaluacion, setevaluacion] = useState({
    dato1: "",
    dato2: "",
    dato3: "",
    dato4: "",
    dato5: "",
    dato6: "",
    dato7: "",
    dato8: "",
    dato9: "",
    dato10: "",
    dato11: "",
    dato12: "",
    dato13: "",
    dato14: "",
    dato15: "",
    idevaluado: "",
    fecha:"",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    ncontrol: "",
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
    carrera: "",
    // Otros campos del ítem
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
//ESTO ES PARA LOS QUE TIENEN 15 DATOS
//Evaluacion1 Tiene 15 datos y es para los asesores Internos
//Evaluacion1E Tiene 15 datos y es para los asesores Eterno


const naevalua = "api/evaluacion1s";
const naevaluaE = "api/evaluacion1-es";

//ESTO ES PARA LOS QUE TIENEN 10 DATOS

//Evaluacion2 Tiene 10 datos y es para los asesores Internos
//Evaluacion2E Tiene 10 datos y es para los asesores Eterno

const nuevalua2 = "api/evaluacion2s"
const nuevaluaE2 = "api/evaluacion2-es"

  //para  las 2 segudnas
  
  const [evalu2, setEvalu2] = useState(null);
  const [evaluE2, setEvalue2] = useState(null);



  const [evalu, setEvalu] = useState(null);

  const [evaluE, setEvalue] = useState(null);
  //#######################################

  const jefedepartamento = "api/jefedepartamentos";
  const [jefedep, setjefedep] = useState(null);


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
        const evalu = await fetchData(naevalua);
        setEvalu(evalu);
        const evaluE = await fetchData(naevaluaE);
        setEvalue(evaluE);

        const fetchedEvalu2 = await fetchData(nuevalua2);
        setEvalu2(fetchedEvalu2);
        const fetchedEvaluE2 = await fetchData(nuevaluaE2);
        setEvalue2(fetchedEvaluE2);

        const jefedep = await fetchData(jefedepartamento);
        setjefedep(jefedep);

        console.log("Cargo todos los datos !", evaluE);
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

  const handleCrearClick = () => {
    // Lógica para mostrar el popup
    const fieldsToValidate = [
      "nombre",
      "ncontrol",
      "nombre_anteproyecto",
      "periodo",
      "empresa",
      "asesorE",
      "carrera",
    ];

    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      if (newItem[field].trim() === "") {
        newErrors[field] = `El ${field.replace("_", " ")} es obligatorio`;
      }
    });

    // Si hay errores, no enviar el formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const successMessage = "Seleccione un Residente a Evaluar";
      alert(successMessage);
      return;
    }

    const camposLlenos = calificaciones.every(
      (calificacion) => calificacion.valor !== ""
    );

    if (!camposLlenos) {
      alert(
        "Por favor, Rellene todo los criterios a evualuar para poder generar la evaluacion"
      );
      return;
    }

    setMostrarPopup(true);
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
        carrera: residenteSeleccionado.attributes.carrera,
        califasesorI: residenteSeleccionado.attributes.califasesorI,
        califasesorE: residenteSeleccionado.attributes.califasesorE,
      });

      console.log("ESTO ES ID", residenteSeleccionado.id);
    } else {
      // Manejar el caso en que no se encontró un residente
      console.log("Residente no encontrado");
      setNewItem({
        ...newItem,
        nombre: "",
        ncontrol: "",
        nombre_anteproyecto: "",
        periodo: "",
        empresa: "",
        asesorE: "",
        carrera: "",
        califasesorI: "",
        califasesorR: "",
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

  const [calificaciones, setCalificaciones] = useState([
    { id: 1, valor: "", maximo: 5, nombre: "Asiste puntualmente en el horario establecido " },
    { id: 2, valor: "", maximo: 10, nombre: "Trabaja en equipo y se comunica de forma efectiva (oral y escrita) ." },
    { id: 3, valor: "", maximo: 5, nombre: "Tiene iniciativa para colaborar   " },
    { id: 4, valor: "", maximo: 10, nombre: "Propone mejoras al proyecto  " },
    { id: 5, valor: "", maximo: 10, nombre: "Cumple con los objetivos correspondientes al proyecto  " },
    { id: 6, valor: "", maximo: 15, nombre: "Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos del cronograma " },
    { id: 7,valor: "",maximo: 15,nombre: "Demuestra liderazgo en su actuar ",
    },
    { id: 8, valor: "", maximo: 20, nombre: "Demuestra conocimiento en el área de su especialidad " },
    { id: 9, valor: "", maximo: 10, nombre: "Demuestra un comportamiento ético (es disciplinado, acata órdenes, respeta a sus compañeros de trabajo, entre otros)   " },
    { id: 10, valor: 0, maximo: 100, nombre: "Calificación total " },
    // Otras filas...
  ]);

  const obtenerSumatoriaTotal = () => {
    return calificaciones
      .filter((calificacion) => calificacion.id !== 10) // Excluye la calificación total de la sumatoria
      .reduce((total, calificacion) => total + Number(calificacion.valor), 0);
  };

  const handleCalificacionChange = (id, nuevoValor) => {
    nuevoValor = isNaN(Number(nuevoValor))
      ? 0
      : Math.min(
          Math.max(Number(nuevoValor), 0),
          calificaciones.find((c) => c.id === id).maximo
        );

    setCalificaciones((prevCalificaciones) => {
      const nuevasCalificaciones = prevCalificaciones.map((calificacion) =>
        calificacion.id === id
          ? { ...calificacion, valor: nuevoValor }
          : calificacion
      );

      const calificacionTotal = nuevasCalificaciones.find(
        (calificacion) => calificacion.id === 10
      );
      if (calificacionTotal) {
        calificacionTotal.valor = obtenerSumatoriaTotal();
      }

      return nuevasCalificaciones;
    });
  };

  const [observaciones, setObservaciones] = useState("");
  function calcularDiferenciaMesesDiasDesdeTexto(textoFecha) {
    // Dividir el texto en las fechas
    const fechas = textoFecha.split("-").map((fecha) => fecha.trim());

    // Obtener el día, mes y año de cada fecha
    const [diaInicio, mesInicio] = fechas[0].split(" DE ");
    const [diaFin, mesFin] = fechas[1].split(" DE ");

    // Obtener el índice del mes (0-indexed)
    const indiceMesInicio = obtenerIndiceMes(mesInicio);
    const indiceMesFin = obtenerIndiceMes(mesFin);

    // Crear objetos Date para ambas fechas
    const fechaInicio = new Date(
      new Date().getFullYear(),
      indiceMesInicio,
      parseInt(diaInicio, 10)
    );
    const fechaFin = new Date(
      new Date().getFullYear(),
      indiceMesFin,
      parseInt(diaFin, 10)
    );

    // Calcular la diferencia en días y meses
    const diferenciaMilisegundos = fechaFin - fechaInicio;
    const diferenciaDias = Math.floor(
      diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );
    const diferenciaMeses = Math.floor(diferenciaDias / 30);
    const diasRestantes = diferenciaDias % 30;

    return { meses: diferenciaMeses, dias: diasRestantes };
  }

  function obtenerIndiceMes(nombreMes) {
    const meses = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE",
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    return meses.indexOf(nombreMes.toUpperCase());
  }

  // Ejemplo de uso
  //const textoFecha = "1 DE ENERO - 5 DE JUNIO";
  // const diferencia = calcularDiferenciaMesesDiasDesdeTexto(textoFecha);
  // console.log(`La diferencia es: ${diferencia.meses} meses y ${diferencia.dias} días`);

  const pruebas = async (idresidente) => {
    const residenteSeleccionado = data.data.find(
      (item) => item.attributes.nombre === newItem.nombre
    );

    const residenteevaluado = evalu.data.find(
      (item) =>
        item?.attributes?.idevaluado?.toString() === newItem.id?.toString()
    );

    const evaExterno = evaluE.data.find(
      (item) =>
        item?.attributes?.idevaluado?.toString() === newItem.id?.toString()
    );

    if (evaExterno) {
      console.log("Asesor E", evaExterno);
    } else {
      console.log("Asesor NO E", evaExterno);
    }
/*
    if (residenteevaluado) {
      //console.log("Se encontró un residente evaluado:", residenteevaluado);
      const successMessage = "Usted Ya a evaluado a " + newItem.nombre;
      alert(successMessage);
      return;
    } else {
      console.log(
        "No se encontró un residente evaluado para newItem.id:",
        newItem.id
      );
    }*/

    const fieldsToValidate = [
      "nombre",
      "ncontrol",
      "nombre_anteproyecto",
      "periodo",
      "empresa",
      "asesorE",
      "carrera",
    ];

    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      if (newItem[field].trim() === "") {
        newErrors[field] = `El ${field.replace("_", " ")} es obligatorio`;
      }
    });

    // Si hay errores, no enviar el formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const successMessage = "Seleccione un Residente a Evaluar";
      alert(successMessage);
      return;
    }

    const camposLlenos = calificaciones.every(
      (calificacion) => calificacion.valor !== ""
    );

    if (!camposLlenos) {
      alert(
        "Por favor, Rellene todos los criterios a evaluar para poder generar la evaluación"
      );
      return;
    }

    const fechactual = new Date();
    const anioactual = fechactual.toLocaleDateString('es-ES');

    if (residenteSeleccionado) {
      const nuevaEvaluacion = {
        dato1: calificaciones
          .find((calificacion) => calificacion.id === 1)
          .valor.toString(),
        dato2: calificaciones
          .find((calificacion) => calificacion.id === 2)
          .valor.toString(),
        dato3: calificaciones
          .find((calificacion) => calificacion.id === 3)
          .valor.toString(),
        dato4: calificaciones
          .find((calificacion) => calificacion.id === 4)
          .valor.toString(),
        dato5: calificaciones
          .find((calificacion) => calificacion.id === 5)
          .valor.toString(),
        dato6: calificaciones
          .find((calificacion) => calificacion.id === 6)
          .valor.toString(),
        dato7: calificaciones
          .find((calificacion) => calificacion.id === 7)
          .valor.toString(),
          dato8: calificaciones
          .find((calificacion) => calificacion.id === 8)
          .valor.toString(),
          dato9: calificaciones
          .find((calificacion) => calificacion.id === 9)
          .valor.toString(),
          dato10: calificaciones
          .find((calificacion) => calificacion.id === 10)
          .valor.toString(),
        //idevaluado: newItem.id.toString(),
        observaciones:observaciones.toString(),
       // asesori: nombrealm.toString(),
       asesori: residenteSeleccionado.attributes.asesorE,
        fecha: anioactual.toString(),
      };

      // Actualiza el estado de evaluacion
      setevaluacion(nuevaEvaluacion);
      

      try {
        await updateData(idresidente, nuevaEvaluacion, nuevaluaE2);

        console.log("Evaluación registrada exitosamente");
        window.location.reload();
      } catch (error) {
        alert("No se ha podido registrar la Evaluación");
        return;
      }
    } else {
      console.log("No se encontró ningún residente con ese nombre");
    }
  };

  const versuma = () => {
    // Obtén los valores de dato15 o establece 0 si es undefined
    // Obtén los valores de dato15 o establece 0 si es undefined

    // Obtén los valores de idvaluado o establece un array vacío si es undefined
    const idvaluadoA =
      evalu?.data?.map((item) => item?.attributes?.idvaluado) || [];
    const idvaluadoB =
      evaluE?.data?.map((item) => item?.attributes?.idvaluado) || [];

    // Filtra y suma los valores de dato15 que coinciden con idvaluado
    const suma = idvaluadoA.reduce((total, id) => {
      // Verifica si el id está en el otro conjunto y si los valores son números
      const valorB = idvaluadoB.includes(id)
        ? evaluE.data.find((item) => item.attributes.idvaluado === id)
            ?.attributes?.dato15
        : undefined;
      const valorA = evalu.data.find((item) => item.attributes.idvaluado === id)
        ?.attributes?.dato15;

      // Suma solo si los valores son números
      if (!isNaN(valorA)) total += parseInt(valorA);
      if (!isNaN(valorB)) total += parseInt(valorB);

      return total;
    }, 0);

    console.log("La suma de dato15 que coinciden con idvaluado es:", suma);
  };

  const vercosola = (ideresidente) => {
    
    console.log("Esto es el ID des residente", ideresidente)
  
    
  };

  // Obtén los valores de dato15 o establece 0 si es undefined
  // Obtén los valores de dato15 o establece 0 si es undefined

  // Obtén los valores de idvaluado o establece un array vacío si es undefined
  const idvaluadoA =
    evalu?.data?.map((item) => item?.attributes?.idvaluado) || [];
  const idvaluadoB =
    evaluE?.data?.map((item) => item?.attributes?.idvaluado) || [];

  // Filtra y suma los valores de dato15 que coinciden con idvaluado
  const suma = idvaluadoA.reduce((total, id) => {
    // Verifica si el id está en el otro conjunto y si los valores son números
    const valorB = idvaluadoB.includes(id)
      ? evaluE.data.find((item) => item.attributes.idvaluado === id)?.attributes
          ?.dato15
      : undefined;
    const valorA = evalu.data.find((item) => item.attributes.idvaluado === id)
      ?.attributes?.dato15;

    // Suma solo si los valores son números
    if (!isNaN(valorA)) total += parseInt(valorA);
    if (!isNaN(valorB)) total += parseInt(valorB);

    return total;
  }, 0);

  console.log("La suma de dato15 que coinciden con idvaluado es:", suma);

  return (
    <div className="contenido__Evalucionreporteresidente">
      <div className="Evalucionreporteresidente__titulo">
        <h1>Evaluación De Seguimiento De Residencia Profesional</h1>
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
                data.data
                  .filter(
                    (item) =>
                      item.attributes.correoasesorE === correo &&
                      item.attributes.califasesorE === "0" 
                      && item.attributes.fuera === "No"
                  )
                  .map((item) => (
                    <option key={item.id} value={item.attributes.nombre}>
                      {item.attributes.nombre}
                    </option>
                  ))}
              {errores.nombre && (
                <p style={{ color: "red" }}>{errores.nombre}</p>
              )}
            </select>

            <span>Nombre del Residente:</span>
            <input
              type="text"
              name="name"
              value={newItem.nombre}
              onChange={(e) =>
                setNewItem({ ...newItem, nombre: e.target.value })
              }
            ></input>
            <span>Nombre del proyecto:</span>
            <input
              type="text"
              name="name"
              value={newItem.nombre_anteproyecto}
              onChange={(e) =>
                setNewItem({ ...newItem, nombre_anteproyecto: e.target.value })
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
          <div className="informacion__pregunta">
            <span>Número de Control:</span>
            <input
              type="text"
              name="name"
              value={newItem.ncontrol}
              onChange={(e) =>
                setNewItem({ ...newItem, ncontrol: e.target.value })
              }
            ></input>
            <span>Programa Educativo:</span>
            <input
              type="text"
              name="name"
              value={newItem.carrera}
              onChange={(e) =>
                setNewItem({ ...newItem, carrera: e.target.value })
              }
            ></input>
            <span>
              Calificación Parcial <br /> (promedio de ambas evaluaciones):
            </span>
            <input
              type="text"
              name="name"
              value={newItem.califasesorI}
              onChange={(e) =>
                setNewItem({ ...newItem, califasesorI: e.target.value })
              }
            ></input>
          </div>
        </div>

        <div className="informacion__tabla">
          <table>
            <thead>
              <tr>
                <th>Criterio</th>
                <th>Máximo</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {calificaciones.map((calificacion) => (
                <tr key={calificacion.id}>
                  <td>{calificacion.nombre}</td>
                  <td>{calificacion.maximo}</td>
                  <td>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      value={calificacion.valor}
                      min="0"
                      onChange={(e) =>
                        handleCalificacionChange(
                          calificacion.id,
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="observaciones">
            <span>Observaciones:</span>
            <textarea
              name="textarea"
              placeholder="Ingrese las observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
           
          </div>
        </div>
      

      <button className="btn-asig" onClick={handleCrearClick}>
        Imprimir Evaluación
      </button>
      {data &&
                data.data
                  .filter(
                    (item) =>
                      item.attributes.correoasesorE === correo &&
                      item.attributes.califasesorE === "0"
                  )
                  .map((item, index, array) => (
                    // Solo mostrar el botón si es el último elemento del array filtrado
                    index === array.length - 1 && (
                      <button
                      className="btn-asig"
                      onClick={() => {
                        const residenteSeleccionado = data.data.find(
                          (item) => item.attributes.nombre === newItem.nombre
                        );
                    
                        if (residenteSeleccionado) {
                          const evaluItem = evaluE2?.data?.find(
                            (evaluItem) =>
                              evaluItem.attributes.idevaluado ===
                              residenteSeleccionado.id.toString()
                          );
                    
                          const evaluId = evaluItem ? parseInt(evaluItem.id, 10) : 0;
                    
                          // Resto de tu lógica
                          console.log('evaluId:', residenteSeleccionado.id);
                          pruebas(evaluId)
                        } else {
                          console.error('Residente no encontrado');
                        }
                      }}
                    >
                      Registrar Evaluación
                    </button>
                    )
                  ))}
        
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
            <p style={{ textAlign: "left" }}>
              Nombre del Residente: {newItem.nombre}{" "}
            </p>
            <p style={{ textAlign: "left" }}>
              Número de control: {newItem.ncontrol}
            </p>
            <p style={{ textAlign: "left" }}>
              Nombre del Proyecto: {newItem.nombre_anteproyecto}
            </p>
            <p style={{ textAlign: "left" }}>
              Programa Educativo: {newItem.carrera}
            </p>
            <p style={{ textAlign: "left" }}>
              Periodo de realización de la residencia profesional:
              {newItem.periodo}{" "}
            </p>
            <p style={{ textAlign: "left" }}>
              Calificación Parcial (Promedio de ambas evaluaciones) :{" "}
              {newItem.califasesorI}
            </p>

            <table className="mi-tabla">
              <tbody>
                {calificaciones.map((calificacion) => (
                  <tr key={calificacion.id}>
                    <td>{calificacion.nombre}</td>
                    <td>{calificacion.maximo}</td>

                    <td>{calificacion.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <p style={{ textAlign: "left" }}>Observaciones</p>
            <p style={{ textAlign: "left" }}>{observaciones}</p>
            <table className="mi-tabla">
              <tbody>
                <tr>
                  <td>
                    <p style={{ textAlign: "center" }}>
                      <br />
                      <br />
                      <br />
                      {jefedep && jefedep.data.length > 0 && (
                        <p>{jefedep.data[0].attributes.nombre}</p>
                      )}
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
                      <br />
                      Fecha de evaluación
                      <br />
                      {new Date().toLocaleDateString('es-ES')}
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
export default Evalucionseguimiento;
