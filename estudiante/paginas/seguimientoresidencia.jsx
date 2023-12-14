import React, { useState, useEffect } from "react";
import { fetchData } from "./formato";
import "./estilosseguimiento.css";

function Seguimientoresidencia(props) {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const handleCerrarPopup = () => {
    // Lógica para cerrar el popup
    setMostrarPopup(false);
  };

  const handleCrearClick = () => {
    setMostrarPopup(true);
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
               font-size: 12px;
           }
           
       }
   `;

    // Agregar el estilo al head del documento
    document.head.appendChild(style);
    window.print();
  };

  const [data, setData] = useState(null);
  const [newItem, setNewItem] = useState({
    nombre: "",
    ncontrol: "",
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
    carrera: "",
    asesorI: "",
  });

  const nombretabla = "api/residentesuploads";
  const correo = props.graphData.graphData.graphData.mail;

  const jefes = "api/jefedepartamentos";
  const [jefedpt, setjefedpt] = useState(null);

  useEffect(() => {
    fetchDataAsync();
  }, [correo]);

  async function fetchDataAsync() {
    try {
      const responseData = await fetchData(nombretabla);
      const residenteSeleccionado = responseData.data.find(
        (item) => item.attributes.correo === correo
      );

      const jefedpt = await fetchData(jefes);
      setjefedpt(jefedpt);
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

      if (!residenteSeleccionado) {
        const successMessage =
          "Por favor, cargue su anteproyecto para una visualización más detallada de esta sección.";
        alert(successMessage);
      } else {
        handlePeriodoChange(perio);
        setmensajeseguimiento(true);
      }

      console.log("Esto es residente seleccionado", residenteSeleccionado);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }
  //##########################################################
  const obtenerFilasGuardadas = () => {
    const filasGuardadas = localStorage.getItem("filas");
    return filasGuardadas
      ? JSON.parse(filasGuardadas)
      : [
          { actividad: "", tiempo: "P" },
          { actividad: "", tiempo: "R" },
        ];
  };

  const obtenerColumnasGuardadas = () => {
    const columnasGuardadas = localStorage.getItem("columnas");
    return columnasGuardadas ? JSON.parse(columnasGuardadas) : [];
  };

  const obtenerColoresGuardados = () => {
    const coloresGuardados = localStorage.getItem("colores");
    return coloresGuardados
      ? JSON.parse(coloresGuardados)
      : Array(filas.length * columnas.length).fill("white");
  };

  const [filas, setFilas] = useState(obtenerFilasGuardadas);
  const [columnas, setColumnas] = useState(obtenerColumnasGuardadas);
  const [cellColors, setCellColors] = useState(obtenerColoresGuardados);
  const [selectedCell, setSelectedCell] = useState({
    rowIndex: null,
    colIndex: null,
  });

  useEffect(() => {
    localStorage.setItem("filas", JSON.stringify(filas));
  }, [filas]);

  useEffect(() => {
    localStorage.setItem("columnas", JSON.stringify(columnas));
    localStorage.setItem("colores", JSON.stringify(cellColors));
  }, [columnas, cellColors]);

  const getCellPosition = (rowIndex, colIndex) => {
    return rowIndex * columnas.length + colIndex;
  };

  const agregarFila = () => {
    const nuevasFilas = [...filas, { actividad: "", tiempo: "P" }];
    const nuevosColores = [...cellColors];

    setFilas(nuevasFilas);

    // Ajusta el color de las nuevas celdas
    for (let i = 0; i < columnas.length; i++) {
      nuevosColores.push("white"); // Actividad (P)
      nuevosColores.push("white"); // Tiempo (R)
    }

    setCellColors(nuevosColores);
  };

  const agregarColumna = () => {
    const nuevasColumnas = [...columnas, ` ${columnas.length + 1}`];
    const nuevosColores = cellColors.map((fila) => [...fila, "white"]);

    setColumnas(nuevasColumnas);
    setCellColors(nuevosColores);
  };

  const eliminarColumna = (index) => {
    if (columnas.length > 1) {
      const nuevasColumnas = [...columnas];
      const nuevosColores = [];

      for (let i = 0; i < filas.length * 2; i++) {
        const filaOriginal = cellColors.slice(
          i * nuevasColumnas.length,
          (i + 1) * nuevasColumnas.length
        );
        const nuevaFila = [
          ...filaOriginal.slice(0, index),
          ...filaOriginal.slice(index + 1),
        ];
        nuevosColores.push(...nuevaFila);
      }

      nuevasColumnas.splice(index, 1);

      setColumnas(nuevasColumnas);
      setCellColors(nuevosColores);
    }
  };

  const eliminarFila = (index) => {
    const nuevasFilas = [...filas];
    const nuevosColores = [...cellColors];
    nuevasFilas.splice(index, 1);

    // Elimina los colores de las celdas de la fila
    nuevosColores.splice(index * columnas.length * 2, columnas.length * 2);

    setFilas(nuevasFilas);
    setCellColors(nuevosColores);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const nuevosColores = [...cellColors];
    const cellPosition = getCellPosition(rowIndex, colIndex);
    setSelectedCell({ rowIndex, colIndex });

    if (rowIndex % 2 === 0) {
      // Para las filas de actividad (P)
      nuevosColores[cellPosition] =
        nuevosColores[cellPosition] === "white" ? "blue" : "white";
    } else {
      // Para las filas de tiempo (R)
      nuevosColores[cellPosition] =
        nuevosColores[cellPosition] === "white" ? "red" : "white";
    }

    setCellColors(nuevosColores);
  };

  const eliminarDatoLocalStorage = () => {
    // Supongamos que quieres eliminar un elemento llamado "miDato"

    localStorage.removeItem("filas");
    localStorage.removeItem("columnas");
    localStorage.removeItem("colores");
    alert("El dato ha sido eliminado del Local Storage.");
    window.location.reload();
  };
  //############PARA HACER LO DE PERIODO #############################################

  const [errorPeriodo, setErrorPeriodo] = useState("");

  const [realizarperiodos, setrealizarperiodos] = useState({
    revision1: "",
    revision2: "",
    revision3: "",
    cantidadsemanas: "",
  });

  const handlePeriodoChange = (fechas) => {
    const periodo = fechas;

    const match = periodo.match(
      /^([1-9]|[12]\d|3[01])\s+(DE|de)\s+([a-zA-Z]+)\s*-\s*([1-9]|[12]\d|3[01])\s+(DE|de)\s+([a-zA-Z]+)\s*(DEL?|del?)?\s*(\d{4})?$/
    );

    if (match) {
      const [
        ,
        diaInicio,
        preposicionInicio,
        mesInicio,
        diaFin,
        preposicionFin,
        mesFin,
        ,
        ,
        del,
        año,
      ] = match;

      const añoActual = new Date().getFullYear();
      const añoIngresado = match[8];
      const añoIngresadoEntero = añoIngresado
        ? parseInt(añoIngresado, 10)
        : null;
      console.log("Año ingresado (entero):", añoActual);

      if (añoIngresadoEntero >= añoActual) {
        const fechaInicio = new Date(
          añoIngresadoEntero,
          obtenerIndiceMes(mesInicio),
          parseInt(diaInicio, 10)
        );
        const textoFechainicio = `${diaInicio} ${mesInicio} ${añoIngresado}`;

        const fechaConvertida1 = convertirFecha(textoFechainicio);

        const textoFechafin = `${diaFin} ${mesFin} ${añoIngresado}`;

        const fechaConvertida2 = convertirFecha(textoFechafin);

        console.log("FECHAS INICIO", diaInicio, mesInicio, añoIngresado);
        console.log("FECHAS FINAL", diaFin, mesFin, añoIngresado);
        console.log("TEXTO FECHA", textoFechainicio);
        console.log("TEXTO FECHA CONVERTIDA", fechaConvertida1);

        console.log("TEXTO FECHA2", textoFechafin);
        console.log("TEXTO FECHA CONVERTIDA2", fechaConvertida2);
        const fechaFin = new Date(
          añoIngresadoEntero,
          obtenerIndiceMes(mesFin),
          parseInt(diaFin, 10)
        );

        console.log("año ingresado:", match);
        console.log("año actual :", añoIngresado);
        console.log("año actual :", añoActual);

        const diferenciaMeses =
          (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 +
          fechaFin.getMonth() -
          fechaInicio.getMonth();

        console.log("Diferencia Meses:", diferenciaMeses);

        const cantidadsemanas = obtenerSemanas(
          fechaConvertida2,
          fechaConvertida1
        );
        if (diferenciaMeses === 4 || diferenciaMeses === 5) {
          const fechasDivididas = dividirPeriodo(
            fechaConvertida1,
            fechaConvertida2
          );

          console.log("FECHAS DIVIDIDAS", fechasDivididas);
          setrealizarperiodos({
            revision1: fechasDivididas[0],
            revision2: fechasDivididas[1],
            revision3: fechasDivididas[2],
            cantidadsemanas: cantidadsemanas,
          });
          setErrorPeriodo("");
        } else {
          setErrorPeriodo("El periodo debe ser de 4 o 6 meses.");
        }
      } else {
        setErrorPeriodo("Por favor, ingrese el año actual.");
      }
    } else {
      setErrorPeriodo(
        'Formato incorrecto. Por favor, ingrese los periodos como "1 de Enero - 1 de Febrero" y asegúrese de usar días válidos.'
      );
    }
  };

  const calcularDiferenciaMeses = (fechaInicio, fechaFin) => {
    return (
      (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 +
      fechaFin.getMonth() -
      fechaInicio.getMonth()
    );
  };

  function dividirPeriodo(fechaInicioStr, fechaFinStr) {
    // Convertir las cadenas de fecha a objetos Date
    const fechaInicio = new Date(fechaInicioStr);
    const fechaFin = new Date(fechaFinStr);

    // Calcular el número total de días entre las fechas
    const duracionTotalDias = Math.ceil(
      (fechaFin - fechaInicio) / (24 * 60 * 60 * 1000)
    );

    // Calcular la duración aproximada de cada subintervalo en días
    const duracionSubintervalo = Math.floor(duracionTotalDias / 3);

    // Calcular las fechas para cada subintervalo y formatear la salida
    const fechasSubintervalo = Array.from({ length: 3 }, (_, index) => {
      const inicioSubintervalo = new Date(
        fechaInicio.getTime() +
          index * duracionSubintervalo * 24 * 60 * 60 * 1000
      );
      const finSubintervalo = new Date(
        inicioSubintervalo.getTime() +
          (duracionSubintervalo - 1) * 24 * 60 * 60 * 1000
      );

      //return `Revision ${index + 1}: ${formatoFecha(inicioSubintervalo)} al ${formatoFecha(finSubintervalo)}`;
      return `Revision ${index + 1}: ${formatoFecha(finSubintervalo)}`;
    });

    return fechasSubintervalo;
  }

  // Función para formatear una fecha en el formato 'd de MMMM'
  function formatoFecha(fecha) {
    const opciones = { day: "numeric", month: "long" };
    return fecha.toLocaleDateString("es-ES", opciones);
  }
  function convertirFecha(textoFecha) {
    const meses = {
      enero: "01",
      febrero: "02",
      marzo: "03",
      abril: "04",
      mayo: "05",
      junio: "06",
      julio: "07",
      agosto: "08",
      septiembre: "09",
      octubre: "10",
      noviembre: "11",
      diciembre: "12",
    };

    const partes = textoFecha.toLowerCase().split(" ");
    if (partes.length === 3 && meses.hasOwnProperty(partes[1])) {
      const dia = partes[0];
      const mes = meses[partes[1]];
      const año = partes[2];

      return `${año}-${mes}-${dia}`;
    } else {
      console.error("Formato de fecha no válido");
      return null;
    }
  }

  // Ejemplo de uso:
  const fechaConvertida = convertirFecha("1 agosto 2023");
  console.log(fechaConvertida);

  //#####################################################################
  const obtenerIndiceMes = (nombreMes) => {
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

    const mesBuscado = nombreMes.toLowerCase();

    return meses.indexOf(mesBuscado);
  };

  const puedeAgregarPeriodo = !errorPeriodo && newItem.periodo.trim() !== "";

  const agregarPeriodo = () => {
    if (puedeAgregarPeriodo) {
      // Lógica para agregar el período, por ejemplo, enviar a la API, etc.
      console.log("Período agregado:", newItem.periodo);
    } else {
      alert(
        "No se puede agregar el período debido a errores o formato incorrecto."
      );
    }
  };

  function obtenerSemanas(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Diferencia en milisegundos
    const diferencia = Math.abs(fin - inicio);

    // Convertir la diferencia a semanas
    const semanas = Math.round(diferencia / (1000 * 60 * 60 * 24 * 7));

    return semanas - 1;
  }

  // Ejemplo de uso:
  const semanas = obtenerSemanas("2023-06-1", "2023-01-1");
  console.log(semanas);
  //#####################################################
  const [mensajeseguimiento, setmensajeseguimiento] = useState(false);
  console.log("ESTO ES EL MENSAJE", newItem.nombre);

  const handleChange = (e, rowIndex) => {
    e.target.style.width = "inherit";
    e.target.style.width = `${Math.max(e.target.scrollWidth, 400)}px`;
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;

    const nuevasFilas = [...filas];
    nuevasFilas[rowIndex].actividad = e.target.value;
    setFilas(nuevasFilas);
  };

  return (
    <div className="contenido__seguimientoresidencia">
      <h2>SEGUIMIENTO RESIDENCIA</h2>
      <div className="Seguimientoresidencia__preguntas">
        <div className="contenido__preguntas">
          <div className="informacion__pregunta">
            <span>Nombre del residente:</span>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del residente"
              value={newItem.nombre}
              readOnly
            />
            <span>Número de control:</span>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del residente"
              value={newItem.ncontrol}
              readOnly
            />
            <span>Nombre Proyecto:</span>
            <textarea
              placeholder="Nombre Anteproyecto"
              value={newItem.nombre_anteproyecto}
              style={{ width: "400px", overflow: "auto", border: "3px solid" }}
              readOnly
            />

            <span>Empresa:</span>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del residente"
              value={newItem.empresa}
              readOnly
            />
          </div>
          <div className="informacion__pregunta">
            <span>Asesor Externo:</span>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del residente"
              value={newItem.asesorE}
              readOnly
            />
            <span>Asesor Interno:</span>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del residente"
              value={newItem.asesorI}
              readOnly
            />
            <span>Periodo :</span>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del residente"
              value={newItem.periodo}
              readOnly
            />
          </div>
        </div>
        <div>
          <table className="mi-tabla2" border="1">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#1a3968" }}>
                  <font color="White">ACTIVIDAD</font>
                </th>
                <th style={{ backgroundColor: "#1a3968" }}>
                  <font color="White">TIEMPO</font>
                </th>
                {columnas.map((nombreColumna, index) => (
                  <th
                    style={{ backgroundColor: "#1a3968" }}
                    key={index}
                    onClick={() => handleCellClick(0, index)}
                    onDoubleClick={() => handleCellClick(0, index)}
                  >
                    <font color="White">{nombreColumna}</font>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((fila, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr bgcolor="white">
                    <td rowSpan={2}>
                      <font color="black">
                        <textarea
                          type="text"
                          className="actividad"
                          value={fila.actividad}
                          style={{ minWidth: "500px", overflow: "auto" }}
                          onChange={(e) => {
                            e.target.style.width = "inherit";
                            e.target.style.width = `${Math.max(
                              e.target.scrollWidth,
                              500
                            )}px`;
                            e.target.style.height = "inherit";
                            e.target.style.height = `${e.target.scrollHeight}px`;

                            const nuevasFilas = [...filas];
                            nuevasFilas[rowIndex].actividad = e.target.value;
                            setFilas(nuevasFilas);
                          }}
                        />
                      </font>
                    </td>
                    <td>
                      <font color="black">{fila.tiempo}</font>
                    </td>
                    {columnas.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick(rowIndex * 2, colIndex)}
                        onDoubleClick={() =>
                          handleCellClick(rowIndex * 2, colIndex)
                        }
                        style={{
                          backgroundColor:
                            cellColors[getCellPosition(rowIndex * 2, colIndex)],
                        }}
                      >
                        <font color="black"></font>
                      </td>
                    ))}
                  </tr>
                  <tr bgcolor="white">
                    <td>
                      <font color="black">R</font>
                    </td>
                    {columnas.map((_, colIndex) => (
                      <td
                        key={colIndex + 1}
                        onClick={() =>
                          handleCellClick(rowIndex * 2 + 1, colIndex)
                        }
                        onDoubleClick={() =>
                          handleCellClick(rowIndex * 2 + 1, colIndex)
                        }
                        style={{
                          backgroundColor:
                            cellColors[
                              getCellPosition(rowIndex * 2 + 1, colIndex)
                            ],
                        }}
                      >
                        <font color="white"></font>
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
              <tr>
                <th>OBSERVACIONES</th>
                <th>{/* Celda vacía */}</th>
                {console.log("ESTO ES OLUMNAS", columnas)}
                {Array.from({ length: 3 }).map((_, groupIndex) => {
                  const totalDays = columnas.length;
                  const daysPerColumn = Math.ceil(totalDays / 3);
                  const startDay = groupIndex * daysPerColumn + 1;
                  const endDay = Math.min(
                    (groupIndex + 1) * daysPerColumn,
                    totalDays
                  );

                  return (
                    <th key={groupIndex} colSpan={endDay - startDay + 1}></th>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <br />
          <button className="btn-asig" onClick={agregarFila}>
            Agregar actividad
          </button>
          <button className="btn-asig" onClick={agregarColumna}>
            Agregar semana
          </button>
          <button
            className="btn-asig"
            onClick={() => eliminarFila(filas.length - 1)}
          >
            Eliminar última actividad
          </button>
          <button
            className="btn-asig"
            onClick={() => eliminarColumna(columnas.length - 1)}
          >
            Eliminar última semana
          </button>
        </div>
        <button className="btn-asig" onClick={handleCrearClick}>
          Imprimir seguimiento
        </button>
        <button className="btn-asig" onClick={eliminarDatoLocalStorage}>
          Reiniciar seguimiento
        </button>
      </div>

      {mostrarPopup && (
        <div className="popuphorizontal">
          <div className="popup-contenidohorizontal">
            <table className="mi-tabla3">
              <tbody>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "10px",
                      margin: "0",
                      width: "10%",
                    }}
                  >
                    <img
                      src="https://istmo.tecnm.mx/wp-content/uploads/2021/08/logo-tec-png-naranja.png"
                      alt="Descripción de la imagen"
                      style={{ width: "100%", height: "auto", margin: "-10px" }}
                    />
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    Instituto Tecnológico Del Istmo
                    <br />
                    "Por una Tecnología Propia como principio de libertad"
                    <br />
                    SEGUIMIENTO DE PROYECTO DE RESIDENCIA
                    <br />
                    PROFESIONAL
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Código:
                    <br />
                    FR-ITISTMO-7.5.1-07-05
                    <br />
                    Versión:
                    <br />
                    Rev. 1
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="contenido__preguntas">
              <div className="informacion__pregunta">
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "11px",
                    "@media print": {
                      fontSize: "11px",
                      borderBottom: "none",
                    },
                  }}
                >
                  ESTUDIANTE: {newItem.nombre}
                </p>
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "11px",
                    "@media print": {
                      fontSize: "11px",
                      borderBottom: "none",
                    },
                  }}
                >
                  NOMBRE DEL PROYECTO: {newItem.nombre_anteproyecto}
                </p>
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "11px",
                    "@media print": {
                      fontSize: "11px",
                      borderBottom: "none",
                    },
                  }}
                >
                  ASESOR EXTERNO: {newItem.asesorE}
                </p>
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "11px",
                    "@media print": {
                      fontSize: "11px",
                      borderBottom: "none",
                    },
                  }}
                >
                  PERIODO DE REALIZACIÓN: {newItem.periodo}
                </p>
              </div>
              <div className="informacion__pregunta">
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "11px",
                    "@media print": {
                      fontSize: "11px",
                      borderBottom: "none",
                    },
                  }}
                >
                  NÚMERO DE CONTROL: {newItem.ncontrol}
                </p>
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "11px",
                    "@media print": {
                      fontSize: "11px",
                      borderBottom: "none",
                    },
                  }}
                >
                  EMPRESA: {newItem.empresa}
                </p>
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "11px",
                    "@media print": {
                      fontSize: "11px",
                      borderBottom: "none",
                    },
                  }}
                >
                  ASESOR INTERNO: {newItem.asesorI}
                </p>
              </div>
            </div>

            <table className="mi-tabla2">
              <thead>
                <tr bgcolor="#1a3968">
                  <th>ACTIVIDAD</th>
                  <th>TIEMPO</th>
                  {columnas.map((nombreColumna, index) => (
                    <th
                      key={index}
                      onClick={() => handleCellClick(0, index)}
                      onDoubleClick={() => handleCellClick(0, index)}
                    >
                      {nombreColumna}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filas.map((fila, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    <tr bgcolor="white">
                      <td rowSpan={2}>
                        <font color="black">
                          <textarea
                            type="text"
                            className="actividad"
                            value={fila.actividad}
                            style={{ minWidth: "400px", overflow: "auto",resize: 'none',
                            border:'none',}}
                            readOnly
                            onChange={handleChange}
                          />
                        </font>
                      </td>
                      <td>
                        <font color="black">{fila.tiempo}</font>
                      </td>
                      {columnas.map((_, colIndex) => (
                        <td
                          key={colIndex}
                          onClick={() =>
                            handleCellClick(rowIndex * 2, colIndex)
                          }
                          onDoubleClick={() =>
                            handleCellClick(rowIndex * 2, colIndex)
                          }
                          style={{
                            backgroundColor:
                              cellColors[
                                getCellPosition(rowIndex * 2, colIndex)
                              ],
                          }}
                        >
                          <font color="black"></font>
                        </td>
                      ))}
                    </tr>
                    <tr bgcolor="white">
                      <td>
                        <font color="black">R</font>
                      </td>
                      {columnas.map((_, colIndex) => (
                        <td
                          key={colIndex + 1}
                          onClick={() =>
                            handleCellClick(rowIndex * 2 + 1, colIndex)
                          }
                          onDoubleClick={() =>
                            handleCellClick(rowIndex * 2 + 1, colIndex)
                          }
                          style={{
                            backgroundColor:
                              cellColors[
                                getCellPosition(rowIndex * 2 + 1, colIndex)
                              ],
                          }}
                        >
                          <font color="white"></font>
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
                <tr>
                  <th>OBSERVACIONES</th>
                  <th>{/* Celda vacía */}</th>
                  {console.log("ESTO ES OLUMNAS", columnas)}
                  {Array.from({ length: 3 }).map((_, groupIndex) => {
                    const totalDays = columnas.length;
                    const daysPerColumn = Math.ceil(totalDays / 3);
                    const startDay = groupIndex * daysPerColumn + 1;
                    const endDay = Math.min(
                      (groupIndex + 1) * daysPerColumn,
                      totalDays
                    );

                    return (
                      <th key={groupIndex} colSpan={endDay - startDay + 1}></th>
                    );
                  })}
                </tr>

                <tr>
                  <th>ENTREGA DE REPORTE</th>
                  <th>
                    <table style={{ border: "none", width: "100%" }}>
                      <tr>
                        <td style={{ borderBottom: "1px solid black" }}>
                        <textarea
                                    type="text"
                                    className="actividad"
                                    value="Asesor interno"
                                    style={{ 
                                      width: '10vh',
                                      resize: 'none',
                                      border:'none',
                                    }}
                                  />
                        </td>
                      </tr>
                      <tr>
                        <td style={{  borderBottom: "1px solid black" }}>
                          
                          <textarea
                                    type="text"
                                    className="actividad"
                                    value="Estudiante"
                                    style={{ 
                                      width: '10vh',
                                      resize: 'none',
                                      border:'none',
                                    }}
                                    
                                  />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "1px solid black" }}>
                          
                          <textarea
                                    type="text"
                                    className="actividad"
                                    value="Jefe Depto."
                                    style={{ 
                                      width: '10vh',
                                      resize: 'none',
                                      border:'none',
                                    }}
                                    
                                  />
                        </td>
                      </tr>
                    </table>
                  </th>
                  {console.log("ESTO ES OLUMNAS", columnas)}
                  {Array.from({ length: 3 }).map((_, groupIndex) => {
                    const totalDays = columnas.length;
                    const daysPerColumn = Math.ceil(totalDays / 3);
                    const startDay = groupIndex * daysPerColumn + 1;
                    const endDay = Math.min(
                      (groupIndex + 1) * daysPerColumn,
                      totalDays
                    );

                    return (
                      <th key={groupIndex} colSpan={endDay - startDay + 1}>
                        <table style={{ border: "none", width: "100%" }}>
                          <tr>
                            <td
                              style={{
                                borderBottom: "1px solid black",

                                fontSize: "10px",
                                "@media print": {
                                  fontSize: "10px",
                                  borderBottom: "none",
                                },
                              }}
                            >
                              <textarea
                                  style={{ 
                                     
                                    resize: 'none',
                                    border:'none',
                                  }}
                                type="text"
                                className="actividad"
                                value={newItem.asesorI}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderBottom: "1px solid black",

                                fontSize: "10px",
                                "@media print": {
                                  fontSize: "10px",
                                  borderBottom: "none",
                                },
                              }}
                            >
                              <textarea
                                  style={{ 
                                     
                                    resize: 'none',
                                    border:'none',
                                  }}
                                type="text"
                                className="actividad"
                                value={newItem.nombre}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderBottom: "1px solid black",

                                fontSize: "10px",
                                "@media print": {
                                  fontSize: "10px",
                                  borderBottom: "none",
                                },
                              }}
                            >
                              {jefedpt && jefedpt.data.length > 0 && (
                                <>
                                  <textarea
                                      style={{ 
                                     
                                        resize: 'none',
                                        border:'none',
                                      }}
                                    type="text"
                                    className="actividad"
                                    value={jefedpt.data[0].attributes.nombre}
                                    
                                  />
                                </>
                              )}
                            </td>
                          </tr>
                        </table>
                      </th>
                    );
                  })}
                </tr>
              </tbody>
            </table>

            <button className="btn-asig" onClick={imprimir3}>
              Imprimir
            </button>
            <button className="btn-asig" onClick={handleCerrarPopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {mensajeseguimiento && (
        <div className="mensajeseguimiento">
          <div className="mensajeseguimientocontenido">
            <h5>Hola! {newItem.nombre}</h5>
            <p style={{ textAlign: "left" }}>
              Si su anteproyecto ya ha sido aceptado y ya tiene usted un asesor
              interno, porfavor, lea la siguiente recomednación:
            </p>
            <p style={{ textAlign: "left" }}>
              El periodo que usted ingreso es{" "}
            </p>
            <p style={{ textAlign: "left", color: "blue" }}>
              {newItem.periodo}
            </p>
            <p style={{ textAlign: "left" }}>
              Por lo tanto, sus revisiones deberían ser las siguientes fechas
              del presente año:{" "}
            </p>
            <p style={{ textAlign: "left", color: "green" }}>
              {realizarperiodos.revision1}
            </p>
            <p style={{ textAlign: "left", color: "green" }}>
              {realizarperiodos.revision2}
            </p>
            <p style={{ textAlign: "left", color: "green" }}>
              {realizarperiodos.revision3}
            </p>
            <p style={{ textAlign: "left" }}>
              Con una cantidad de semanas (aproximadamente) de:{" "}
            </p>
            <p style={{ textAlign: "left", color: "green" }}>
              {realizarperiodos.cantidadsemanas}
            </p>
            <p style={{ textAlign: "left", color: "red" }}>¡Aviso!</p>
            <p style={{ textAlign: "left", color: "red" }}>
              Una vez que usted defina las actividades y semanas, y configure lo
              deseado, no podrá agregar más actividades o semanas. No obstante,
              si desea reiniciar el seguimiento, simplemente haga clic en
              'Reiniciar Seguimiento
            </p>
            <button onClick={() => setmensajeseguimiento(false)}>
              Enterado
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Seguimientoresidencia;