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

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */

function App(props) {
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
    asesorI: "",
    genero:"",
    fuera:"",
  });

  ///api/residentesuploads
  //pruebas de importacion
  const nombretabla = "api/residentesuploads";
  const nombredocumentos = "api/upload/files/";
  //#####################################
  const nombreespecialidades = "api/especialidads";
  const nombreasesores = "api/asesores-is";

  const nombreasesoresE = "api/asesores-es";
  const [asesoresE, setAsesoresE] = useState(null);
  //pruebas de importacion
  const contenidodocumento = "api/upload";
  //
  const direccionapi = "http://localhost:1337/";

  //Para los generos
  const tablageneros = "api/generos"
  const [generos, setgeneros] = useState(null);

  //ESTO ES PARA LOS QUE TIENEN 15 DATOS
  //Evaluacion1 Tiene 15 datos y es para los asesores Internos Reporte de Final
  //Evaluacion1E Tiene 15 datos y es para los asesores Eterno Reporte de Final

  const naevalua = "api/evaluacion1s";
  const naevaluaE = "api/evaluacion1-es";

  //ESTO ES PARA LOS QUE TIENEN 10 DATOS

  //Evaluacion2 Tiene 10 datos y es para los asesores Internos Reporte de Seguimiento
  //Evaluacion2E Tiene 10 datos y es para los asesores Eterno  Reporte de Seguimiento

  const nuevalua2 = "api/evaluacion2s";
  const nuevaluaE2 = "api/evaluacion2-es";

  //para  las 2 segudnas

  const [evalu2, setEvalu2] = useState(null);
  const [evaluE2, setEvalue2] = useState(null);

  const [evalu, setEvalu] = useState(null);
  const [evaluE, setEvalue] = useState(null);

  /*
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };*/
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    // Verificar si se seleccionó un archivo
    if (selectedFile) {
      // Verificar si el tamaño del archivo es menor o igual a 2 MB (en bytes)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
      if (selectedFile.size > maxSizeInBytes) {
        alert('El archivo es demasiado grande. Por favor, selecciona un archivo de hasta 2 MB.');
        // Puedes hacer más aquí, como limpiar el campo de entrada o realizar otras acciones necesarias
        return;
      }
  
      // Aquí puedes seguir con el procesamiento del archivo, si es válido
      // Por ejemplo, podrías almacenar el archivo en el estado o realizar otras operaciones necesarias
     setSelectedFile(event.target.files[0]);
    }
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

        const fetchedEvalu = await fetchData(naevalua);
        setEvalu(fetchedEvalu);
        const fetchedEvaluE = await fetchData(naevaluaE);
        setEvalue(fetchedEvaluE);

        const fetchedEvalu2 = await fetchData(nuevalua2);
        setEvalu2(fetchedEvalu2);
        const fetchedEvaluE2 = await fetchData(nuevaluaE2);
        setEvalue2(fetchedEvaluE2);

        const asesoresE = await fetchData(nombreasesoresE);
        setAsesoresE(asesoresE);

        const Generos = await fetchData(tablageneros);
        setgeneros(Generos);

        console.log("¡Cargo todos los datos!",generos);
        //setEditingMode(true)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchDataAsync();
  }, []);

  useEffect(() => {
    // Cargar los datos iniciales al montar el componente
    async function fetchDataAsync() {
      try {
        const data2 = await fetchData(nombretabla);
        console.log("Esto es data2: ", data2);

        if (data2 && data2.data && data2.data.length > 0) {
          // Inicializa arreglos para almacenar IDs y correos
          const ids = [];
          const correos = [];
          const correoBuscado = props.graphData.graphData.graphData.mail; // Correo a buscar

          // Itera sobre cada objeto en data2.data (corrige aquí)
          data2.data.forEach((objeto) => {
            // Verifica si el correo coincide con el correo buscado
            if (objeto.attributes.correo === correoBuscado) {
              // Si coincide, extrae la ID y el correo y agrégalos a los arreglos
              const id = objeto.id;
              const correo = objeto.attributes.correo;
              ids.push(id);
              correos.push(correo);
              console.log("HAY UNA COINCIDENCIA: ");
              setEditingMode(false);
            }
          });

          // Si se encontraron coincidencias, devuelve las IDs y correos
          if (ids.length > 0 && correos.length > 0) {
            console.log("VERIFICACIÓN: ", ids.toString());
            setEditingMode(false);
          } else {
            console.log("No se encontraron coincidencias");
            setEditingMode(true);
          }
        } else {
          setEditingMode(true);
          console.log("data2 no está definido o está vacío");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchDataAsync();
  }, []);
  //#############################
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
    genero:"",
    // Otros campos del ítem
  });

  const handleCreate = async () => {
    const fieldsToValidate = [
      "nombre",
      "ncontrol",
      "nombre_anteproyecto",
      "periodo",
      "empresa",
      "asesorE",
      "carrera",
      "genero",
    ];

    const newErrors = {};

    const datos2 = retornacorreo();
    //console.log("esto es de consola: ", datos2.correos.toString())

    fieldsToValidate.forEach((field) => {
      if (newItem[field].trim() === "Otros") {
        newErrors[field] = `El ${field.replace("_", " ")} No puede ir otros agregue un nombre válido, sera responsabilidad del residente ponerse en contacto con dicho asesor fuera de la Institucion`;
      }else{
        if (newItem[field].trim() === "") {
          newErrors[field] = ` ${field.replace("_", " ")} es obligatorio`;
        }

      }
    });

    // Si hay errores, no enviar el formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (!selectedFile) {
        console.log("Selecciona un archivo PDF antes de cargarlo.");
        const successMessage = "Selecciona un archivo PDF antes de cargarlo.";
        alert(successMessage);
        return;
      }

      if (datos2.correos && datos2.correos.toString() === correo) {
        console.log(
          "LOS DATOS CONICICEN CORREO DE AZURE: ",
          correo,
          "CORREO DE CONSOLA: ",
          datos2.correos.toString(),
          "IDE DE CONSOLA: ",
          datos2.ids.toString()
        );
        const successMessage =
          nombrealm.toString() + " ¡No puedes tener más de un Anteproyecto!";
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
          const estado = "En Revisión";
          const observaciones = "En proceso de observaciones";
          const califasesorI = "0";
          const califasesorE = "0";

          console.log("Archivo PDF cargado con éxito.");
          setUploadedFileName(selectedFile.name);
          const namedocs = selectedFile.name;
          const fileId = response.data[0].id;
          setDocumentId(fileId);

          await createData(
            newItem,
            nombretabla,
            fileId.toString(),
            namedocs,
            estado.toString(),
            observaciones.toString(),
            correo,
            califasesorI.toString(),
            califasesorE.toString()
          );

          const updatedData2 = await fetchData(nombretabla);
          const lastIndex = updatedData2.data.length - 1;
          const lastItem = updatedData2.data[lastIndex];
          const lastItemId = lastItem.id;
          const lastItemNombre = lastItem.attributes.asesorE;

          const evaluacion = {
            dato1: "0",
            dato2: "0",
            dato3: "0",
            dato4: "0",
            dato5: "0",
            dato6: "0",
            dato7: "0",
            dato8: "0",
            dato9: "0",
            dato10: "0",
            dato11: "0",
            dato12: "0",
            dato13: "0",
            dato14: "0",
            dato15: "0",
            idevaluado: lastItemId.toString(),
            observaciones: "En proceso de observaciones",
            asesori: lastItemNombre.toString(),
            fecha:"",
          };

          const evaluacion2 = {
            dato1: "0",
            dato2: "0",
            dato3: "0",
            dato4: "0",
            dato5: "0",
            dato6: "0",
            dato7: "0",
            dato8: "0",
            dato9: "0",
            dato10: "0",
            idevaluado: lastItemId.toString(),
            observaciones: "En proceso de observaciones",
            asesori: lastItemNombre.toString(),
            fecha:"",
          };

          await agregarevaluacion(evaluacion, naevalua);
          await agregarevaluacion(evaluacion, naevaluaE);
          await agregarevaluacion(evaluacion2, nuevalua2);
          await agregarevaluacion(evaluacion2, nuevaluaE2);

          setDocumentoCargado(true);
          //setEditingMode(true);
          setEditingMode(false);
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
        carrera: "",
      });
       const successMessage = 'El Anteproyecto se ha subido con éxito, pofavor espere a que sea revisado por la coordinadora y asesor externo';
        alert(successMessage);
    } catch (error) {
      const successMessage = 'Error al subir el AnteProyecto';
      alert(successMessage);
    }
  };

  const handleEdit = (id) => {
    setEditingMode(true);
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
        carrera: itemToEdit.attributes.carrera,
        genero: itemToEdit.attributes.genero,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      if (editingId) {
        await updateData(editingId, newItem, nombretabla);
        // Actualizar la lista después de actualizar
        const updatedData = await fetchData(nombretabla);
        setData(updatedData);
        // Limpiar los campos y salir del modo de edición
        setNewItem({
          nombre: "",
          ncontrol: "",
          nombre_anteproyecto: "",
          periodo: "",
          empresa: "",
          asesorE: "",
          carrera: "",
        });
        setEditingId(null);
        setEditingMode(false);
        const successMessage = 'El Anteproyecto se ha actualizado con éxito';
        alert(successMessage);
      }
    } catch (error) {
      const successMessage = 'El Anteproyecto no se ha actualizado con éxito';
      alert(successMessage);
    }
  };

  const handleDelete = async (
    elementId,
    documentId,
    parametroeva,
    parametroaevaE,
    para1,
    para2
  ) => {
    try {
      // Primero, elimina el elemento de la tabla
      await deleteData(elementId, nombretabla);
      // Luego, elimina el documento http://localhost:1337/api/upload/files/
      await axios.delete(`${direccionapi}${nombredocumentos}${documentId}`);

      //posteriormente elimna las evaluaciones
      await deleteData(parametroeva, naevalua);
      await deleteData(parametroaevaE, naevaluaE);
      //posteriormente elimna las evaluaciones2
      await deleteData(para1, nuevalua2);
      await deleteData(para2, nuevaluaE2);

      // Actualiza la lista de datos y documentos después de la eliminación
      console.log("EVAE", para1);
      console.log("EVA", para2);

      const updatedData = await fetchData(nombretabla);
      setData(updatedData);
      setDocumentoCargado(false);
      setEditingMode(true);
      const successMessage = 'El Anteproyecto se ha eliminado con éxito';
      alert(successMessage);
    } catch (error) {
      const successMessage = 'EL Anteproyecto no se ha eliminado con éxito';
      alert(successMessage);
    }
  };

  //#################

  const [error, setError] = useState("");

  const handleEditDocument = async (idori, documentId, stado) => {
    //
    //console.log('IDE DOCUMENTO',documentId);
    // Paso 1: Eliminar el documento existente http://localhost:1337/api/upload/files/

    console.log("IDE DOCUMENTO", documentId);
    if (stado === "Aprobado") {
      const successMessage =
        "No es posbile actualizar documento ya ha sido registrado y aprobado!";
      alert(successMessage);
      return;
    }

    try {
      // Paso 2: Cargar un nuevo documento
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf";
      fileInput.click();

      fileInput.addEventListener("change", async (event) => {
        const newDocument = event.target.files[0];
        
        if (newDocument) {
          // Verificar si el tamaño del archivo es menor o igual a 600 KB (en bytes)
          const maxSizeInBytes = 600 * 1024; // 600 KB
          if (newDocument.size > maxSizeInBytes) {
            alert('El archivo es demasiado grande. Por favor, selecciona un archivo de hasta 600 KB.');
            // Puedes hacer más aquí, como limpiar el campo de entrada o realizar otras acciones necesarias
            return;
          }
        }

        await axios.delete(`${direccionapi}${nombredocumentos}${documentId}`);

        if (newDocument) {
          const formData = new FormData();
          formData.append("files", newDocument);

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
              // El nuevo documento se ha cargado con éxito
              const newDocumentId = response.data[0].id;
              // Aquí puedes guardar newDocumentId en una variable si lo necesitas
              // console.log('Nuevo documento ID:', newDocumentId);
              // const namedocs = selectedFile.name;
              const itemToEdit = data.data.find((item) => item.id === idori);
              console.log("Nuevo documento ID2:", itemToEdit);
              console.log("Nuevo documento ID:", newDocument.name);

              try {
                await updateDataDoc(
                  idori,
                  itemToEdit,
                  nombretabla,
                  newDocumentId.toString(),
                  newDocument.name
                );
                // Actualizar la lista después de crear
                const updatedData = await fetchData(nombretabla);
                setData(updatedData);
                setDocumentoCargado(true);
              } catch (error) {
                console.error("Error al actualizar el documento:", error);
              }
              // Actualiza la lista de elementos o realiza cualquier otra acción necesaria
            }
          } catch (error) {
            console.error("Error al cargar el nuevo documento:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error al editar el documento:", error);
    }
    //console.log('IDE DOCUMENTO',documentId);
  };

  //#################

  const pruebas = () => {
    // Asegúrate de que data y data.data están definidos
    if (data && data.data && data.data.length > 0) {
      // Inicializa arreglos para almacenar IDs y correos
      const ids = [];
      const correos = [];
      const correoBuscado = props.graphData.graphData.graphData.mail; // Correo a buscar

      // Itera sobre cada objeto en data.data
      data.data.forEach((objeto) => {
        // Verifica si el correo coincide con el correo buscado
        if (objeto.attributes.correo === correoBuscado) {
          // Si coincide, extrae la ID y el correo y agrégalos a los arreglos
          const id = objeto.id;
          const correo = objeto.attributes.correo;
          ids.push(id);
          correos.push(correo);
        }
      });

      // Muestra los arreglos resultantes
      console.log("IDs obtenidos:", ids);
      console.log("Correos obtenidos:", correos);
    } else {
      console.log("data no está definido o está vacío");
    }
  };

  const retornacorreo = () => {
    // Asegúrate de que data y data.data están definidos
    if (data && data.data && data.data.length > 0) {
      // Inicializa arreglos para almacenar IDs y correos
      const ids = [];
      const correos = [];
      const correoBuscado = props.graphData.graphData.graphData.mail; // Correo a buscar

      // Itera sobre cada objeto en data.data
      data.data.forEach((objeto) => {
        // Verifica si el correo coincide con el correo buscado
        if (objeto.attributes.correo === correoBuscado) {
          // Si coincide, extrae la ID y el correo y agrégalos a los arreglos
          const id = objeto.id;
          const correo = objeto.attributes.correo;
          ids.push(id);
          correos.push(correo);
        }
      });

      // Si se encontraron coincidencias, devuelve las IDs y correos
      if (ids.length > 0 && correos.length > 0) {
        return { ids, correos };
      } else {
        // Si no se encontraron coincidencias, devuelve "libre"
        return "libre";
      }
    } else {
      console.log("data no está definido o está vacío");
      // Si no hay datos, también devuelve "libre"
      return "No definido";
    }
  };

  const consola = async () => {
    const updatedData2 = await fetchData(nombretabla);
    const lastIndex = updatedData2.data.length - 1;
    const lastItem = updatedData2.data[lastIndex];
    const lastItemId = lastItem.id;
    console.log("ESTO ES ID:", lastItemId.toString());
  };

  const verdocumentos = async (datos) => {
    const url = "http://localhost:1337" + datos; // Concatena la URL base con el valor de datos
    window.open(url, "_blank");
  };

  const [editingMode, setEditingMode] = useState(false);
  const [editingMode2, setEditingMode2] = useState(false);

  const [errorPeriodo, setErrorPeriodo] = useState("");
  const handlePeriodoChange = (e) => {
    const periodo = e.target.value;
    setNewItem({ ...newItem, periodo });

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
      console.log("Año ingresado2 (entero):", añoIngresadoEntero);

      if (añoIngresadoEntero >= añoActual) {
        const fechaInicio = new Date(
          añoIngresadoEntero,
          obtenerIndiceMes(mesInicio),
          parseInt(diaInicio, 10)
        );
        const textoFecha2 = `${diaInicio} ${mesInicio} ${añoIngresado}`;

        const fechaConvertida2 = convertirFecha(textoFecha2);

        console.log("FECHAS INICIO",diaInicio,mesInicio,añoIngresado);
        console.log("FECHAS FINAL",diaFin,mesFin,añoIngresado);
        console.log("TEXTO FECHA",textoFecha2);
        console.log("TEXTO FECHA CONVERTIDA",fechaConvertida2);
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
          console.log("Diferencia Meses1:", fechaFin.getFullYear());
          console.log("Diferencia Meses2:", fechaInicio);
        console.log("Diferencia Meses2:", fechaFin);
        console.log("Diferencia Meses2:", diferenciaMeses);
        if (diferenciaMeses === 4 || diferenciaMeses === 5) {
          const fechasDivididas = dividirPeriodo('2023-08-01', '2023-12-01');
        console.log("FECHAS DIVIDIDAS",fechasDivididas);
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
  const duracionTotalDias = Math.ceil((fechaFin - fechaInicio) / (24 * 60 * 60 * 1000));

  // Calcular la duración aproximada de cada subintervalo en días
  const duracionSubintervalo = Math.floor(duracionTotalDias / 3);

  // Calcular las fechas para cada subintervalo y formatear la salida
  const fechasSubintervalo = Array.from({ length: 3 }, (_, index) => {
    const inicioSubintervalo = new Date(fechaInicio.getTime() + index * duracionSubintervalo * 24 * 60 * 60 * 1000);
    const finSubintervalo = new Date(inicioSubintervalo.getTime() + (duracionSubintervalo - 1) * 24 * 60 * 60 * 1000);
    
    return `Subintervalo ${index + 1}: ${formatoFecha(inicioSubintervalo)} al ${formatoFecha(finSubintervalo)}`;
  });

  return fechasSubintervalo;
}

// Función para formatear una fecha en el formato 'd de MMMM'
function formatoFecha(fecha) {
  const opciones = { day: 'numeric', month: 'long' };
  return fecha.toLocaleDateString('es-ES', opciones);
}
function convertirFecha(textoFecha) {
  const meses = {
    'enero': '01',
    'febrero': '02',
    'marzo': '03',
    'abril': '04',
    'mayo': '05',
    'junio': '06',
    'julio': '07',
    'agosto': '08',
    'septiembre': '09',
    'octubre': '10',
    'noviembre': '11',
    'diciembre': '12'
  };

  const partes = textoFecha.toLowerCase().split(' ');
  if (partes.length === 3 && meses.hasOwnProperty(partes[1])) {
    const dia = partes[0];
    const mes = meses[partes[1]];
    const año = partes[2];

    return `${año}-${mes}-${dia}`;
  } else {
    console.error('Formato de fecha no válido');
    return null;
  }
}

// Ejemplo de uso:
const fechaConvertida = convertirFecha('1 agosto 2023');
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
//#####################################################################
useEffect(() => {
  fetchDataAsync2();
}, [correo]);

async function fetchDataAsync2() {
  try {
    const responseData = await fetchData(nombretabla);
    const residenteSeleccionado = responseData.data.find(
      (item) => item.attributes.correo === correo
    );




    if(!residenteSeleccionado){
      //const successMessage = "Por favor, cargue su anteproyecto para una visualización más detallada de esta sección.";
      //alert(successMessage);
      setMostrarPopup(true);
    }
    console.log("Esto es residente seleccionado", residenteSeleccionado);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
const [mostrarPopup, setMostrarPopup] = useState(false);


//#####################################################################
const [mostrarCuadroTexto, setMostrarCuadroTexto] = useState(false);

  return (
    <div className="contenido__anteproyectosubir">
      <div className="Anteproyectosubir__titulo">
        <h1>Anteproyecto De Residencia Profesional</h1>
      </div>

      <div className="Anteproyectosubir__preguntas">
        {editingMode && (
          <div className="contenido__preguntas">
            <div className="informacion__pregunta">
              <span>Nombre Completo:</span>
              <input
                type="text"
                placeholder="Nombre"
                value={newItem.nombre}
                onChange={(e) =>
                  setNewItem({ ...newItem, nombre: e.target.value })
                }
              />
              {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
              <span>Número de control:</span>
              <input
                type="text"
                placeholder="Numero de control"
                value={newItem.ncontrol}
                onChange={(e) =>
                  setNewItem({ ...newItem, ncontrol: e.target.value })
                }
              />
              {errors.ncontrol && (
                <p style={{ color: "red" }}>{errors.ncontrol}</p>
              )}
              <span>Nombre del Anteproyecto:</span>
              <textarea
                placeholder="Nombre Anteproyecto"
                value={newItem.nombre_anteproyecto}
                style={{ width: '400px', overflow: 'auto',border: '3px solid' }}
                onChange={(e) => {
                  e.target.style.height = 'inherit';
                  e.target.style.height = `${e.target.scrollHeight}px`; 
                  setNewItem({
                    ...newItem,
                    nombre_anteproyecto: e.target.value,
                  });
                }}
              />
              {errors.nombre_anteproyecto && (
                <p style={{ color: "red" }}>{errors.nombre_anteproyecto}</p>
              )}

<span>Asesor Externo:</span>
<select
  value={newItem.asesorE ? newItem.asesorE : ""}
  onChange={(e) => {
    const selectedAsesor =
      asesoresE && asesoresE.data
        ? asesoresE.data.find(
            (asesor) =>
              asesor.attributes.nombre === e.target.value
          )
        : null;
        if (selectedAsesor) {
    if (selectedAsesor.attributes.nombre === "Otro") {
      setNewItem({
        ...newItem,
        asesorE: "Otros",
        idasesorE:  selectedAsesor.id.toString(), // Puedes inicializar esto como desees
        correoasesorE: selectedAsesor.attributes.correo, 
        fuera:"Si",// Puedes inicializar esto como desees
      });
      setMostrarCuadroTexto(true);
    } else {
      // Si se selecciona "Otro", muestra un cuadro de entrada de texto

      setNewItem({
        ...newItem,
        asesorE: selectedAsesor.attributes.nombre,
        idasesorE: selectedAsesor.id.toString(),
        correoasesorE: selectedAsesor.attributes.correo,
        fuera:"No",
      });
      setMostrarCuadroTexto(false);
    }
  }}
}
>
  <option value="">Selecciona un Asesor</option>
  {asesoresE &&
    asesoresE.data &&
    asesoresE.data.map((asesor) => (
      <option key={asesor.id} value={asesor.attributes.nombre}>
        {asesor.attributes.nombre}
      </option>
    ))}
 
</select>

<br/>
{/* Si el asesor seleccionado es "Otro", muestra un cuadro de entrada de texto */}
{mostrarCuadroTexto && (
  <input
    type="text"
    placeholder="Ingrese el nombre del asesor"
    value={newItem.asesorE ? newItem.asesorE : ""}
    onChange={(e) =>
      setNewItem({
        ...newItem,
        asesorE: e.target.value,  // Ajuste aquí para asignar el valor del cuadro de texto a asesorE
      })
    }
  />
)}
   {errors.asesorE && (
                <p style={{ color: "red" }}>{errors.asesorE}</p>
              )}








            </div>
            

            <div className="informacion__pregunta">
              <span>Periodo de realización:</span>
              <input
                type="text"
                placeholder="periodo"
                value={newItem.periodo}
                onChange={handlePeriodoChange}
              />
              {errorPeriodo && <p style={{ color: "red" }}>{errorPeriodo}</p>}
              <span>Nombre de la empresa:</span>
              <input
                type="text"
                placeholder="empresa"
                value={newItem.empresa}
                onChange={(e) =>
                  setNewItem({ ...newItem, empresa: e.target.value })
                }
              />
              {errors.empresa && (
                <p style={{ color: "red" }}>{errors.empresa}</p>
              )}

              
                   <span>Genero:</span>
              <select
                value={newItem.genero}
                onChange={(e) =>
                  setNewItem({ ...newItem, genero: e.target.value })
                }
              >
                <option value="">Seleccione Su Genero</option>
                {generos &&
                  generos.data.map((generos) => (
                    <option
                      key={generos.id}
                      value={generos.attributes.nombre}
                    >
                      {generos.attributes.nombre}
                    </option>
                  ))}
              </select>
              {errors.genero && (
                <p style={{ color: "red" }}>{errors.genero}</p>
              )}



{/*
              <span>Asesor Externo:</span>
              <select
                value={newItem.asesorE ? newItem.asesorE : ""}
                onChange={(e) => {
                  const selectedAsesor =
                    asesoresE && asesoresE.data
                      ? asesoresE.data.find(
                          (asesor) =>
                            asesor.attributes.nombre === e.target.value
                        )
                      : null;

                  if (selectedAsesor) {
                    setNewItem({
                      ...newItem,
                      asesorE: selectedAsesor.attributes.nombre,
                      idasesorE: selectedAsesor.id.toString(),
                      correoasesorE: selectedAsesor.attributes.correo,
                    });
                  }
                }}
              >
                <option value="">Selecciona un Asesor</option>
                {asesoresE &&
                  asesoresE.data &&
                  asesoresE.data.map((asesor) => (
                    <option key={asesor.id} value={asesor.attributes.nombre}>
                      {asesor.attributes.nombre}
                    </option>
                  ))}
              </select>
                 {errors.asesorE && (
                <p style={{ color: "red" }}>{errors.asesorE}</p>
              )}
*/}





           

              <span>Carrera:</span>
              <select
                value={newItem.carrera}
                onChange={(e) =>
                  setNewItem({ ...newItem, carrera: e.target.value })
                }
              >
                <option value="">Selecciona una carrera</option>
                {especialidades &&
                  especialidades.data.map((especialidad) => (
                    <option
                      key={especialidad.id}
                      value={especialidad.attributes.nombre}
                    >
                      {especialidad.attributes.nombre}
                    </option>
                  ))}
              </select>
              {errors.carrera && (
                <p style={{ color: "red" }}>{errors.carrera}</p>
              )}
            </div>
          </div>
        )}

        {editingMode && (
          <div className="subiranteproyecto__upload">
            <h5>Cargar Archivo PDF</h5>
            <input type="file" accept=".pdf" onChange={handleFileChange} />

            {uploadedFileName && <p>Archivo cargado: {uploadedFileName}</p>}

            {editingId ? (
              <>
                <p>
                  El archivo PDF no podrá ser actualizado al menos que le des en
                  editar documento
                </p>
                <button onClick={handleUpdate}>Actualizar</button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingMode(false);
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button onClick={handleCreate} disabled={!puedeAgregarPeriodo}>
                Crear
              </button>
            )}
          </div>
        )}
        <div className="informacion__tabla">
          <div className="Anteproyectosubir__titulo">
            <h1>Estado del AnteProyecto</h1>
          </div>
          <table border="1">
            <thead>
              <tr>
                <th>Número de Control</th>
                <th>Nombre</th>
                <th>Nombre de Anteproyecto</th>
                <th>Nombre de documento</th>
                <th>Periodo de Realización</th>
                <th>Estado</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data
                  .filter((item) => item.attributes.correo === correo)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.attributes.ncontrol}</td>
                      <td>{item.attributes.nombre}</td>
                      <td>{item.attributes.nombre_anteproyecto}</td>
                      <td>{item.attributes.namedoc}</td>
                      <td>{item.attributes.periodo}</td>
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
                        <button
                          className="btnsubir"
                          onClick={() => handleEdit(item.id)}
                        >
                          Editar Información
                        </button>
                        <button
                          className="btnsubir"
                          onClick={() =>
                            handleEditDocument(
                              item.id,
                              item.attributes.iddocumento,
                              item.attributes.estado
                            )
                          }
                        >
                          Editar Doc
                        </button>
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
                        <button
                          className="btnsubir"
                          onClick={() => {
                            const evaluId =
                              evalu && evalu.data
                                ? parseInt(
                                    evalu.data.find(
                                      (evaluItem) =>
                                        evaluItem.attributes.idevaluado ===
                                        item.id.toString()
                                    )?.id,
                                    10
                                  )
                                : 0;
                            const evaluEId =
                              evaluE && evaluE.data
                                ? parseInt(
                                    evaluE.data.find(
                                      (evaluEItem) =>
                                        evaluEItem.attributes.idevaluado ===
                                        item.id.toString()
                                    )?.id,
                                    10
                                  )
                                : 0;

                            const evaluId2 =
                              evalu2 && evalu2.data
                                ? parseInt(
                                    evalu2.data.find(
                                      (evaluItem) =>
                                        evaluItem.attributes.idevaluado ===
                                        item.id.toString()
                                    )?.id,
                                    10
                                  )
                                : 0;
                            const evaluEId2 =
                              evaluE2 && evaluE2.data
                                ? parseInt(
                                    evaluE2.data.find(
                                      (evaluEItem) =>
                                        evaluEItem.attributes.idevaluado ===
                                        item.id.toString()
                                    )?.id,
                                    10
                                  )
                                : 0;

                            // ...

                            <button
                              className="btnsubir"
                              onClick={() =>
                                handleDelete(
                                  item.id,
                                  item.attributes.iddocumento,
                                  evaluId,
                                  evaluEId,
                                  evaluId2,
                                  evaluEId2
                                )
                              }
                            >
                              Eliminar
                            </button>;

                            console.log("evaluId:", evaluId);
                            console.log("evaluEId:", evaluEId);

                            handleDelete(
                              item.id,
                              item.attributes.iddocumento,
                              evaluId,
                              evaluEId,
                              evaluId2,
                              evaluEId2
                            );
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="observaciones">
          {data &&
            data.data
              .filter((item) => item.attributes.correo === correo)
              .map((item) => (
                <tr key={item.id}>
                  <span>Observaciones:</span>
                  <textarea
                    name="textarea"
                    placeholder={item.attributes.observaciones}
                    readOnly
                  />
                </tr>
              ))}
        </div>
      </div>

      {mostrarPopup && (

      <div  className="mensajevertical">
        <div className="mensajeverticalcontenido">
          <h4>¡Atencion Residente!</h4>
          <p style={{ textAlign: 'left' }}>Porfavor revise con atencion todos los datos que proporciona.</p>
          <p style={{ textAlign: 'left' }}>Verifique y agrege los datos correspondientes:</p>
          <p style={{ textAlign: 'left' }}>Nombre</p>
          <p style={{ textAlign: 'left' }}>Número de Control</p>
          <p style={{ textAlign: 'left' }}>Nombre de la Dependencia</p>
          <p style={{ textAlign: 'left' }}>El periodo de realización</p>
          <p style={{ textAlign: 'left' }}>Empresa</p>
          <p style={{ textAlign: 'left' }}>y verifique la ortografía </p>
          <p style={{ textAlign: 'left' }}>Una vez que usted suba su Anteproyecto será revisado por la coordinadora y el Jefe De Departamento
          le asignara su Asesor Interno</p>
          <p style={{ textAlign: 'left' }}>Considere que si su AnteProyecto es Aceptado no puede cambiar más o modificar, para así evitar redundancias</p>
          <button onClick={() => setMostrarPopup(false)}>Enterado</button>
        </div>
      </div>

      )}




    </div>
  );
}

export default App;
