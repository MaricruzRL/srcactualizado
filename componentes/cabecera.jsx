import imagen from "./../estilos/img/itilogo.png";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
const Cabecera = (props) => {
    console.log("PAGINA CABECERA", props.graphData);

    // Accede a jobTitle dentro de props.graphData.graphData.graphData
    const nombre = props.graphData.graphData.graphData.displayName;
    const correo = props.graphData.graphData.graphData.userPrincipalName;
    const jobTitle = props.graphData.graphData.graphData.jobTitle;

    return (
        <div className="perfil">
            <img src={imagen} alt="" />
            {/* Utiliza jobTitle en lugar de props.jobTitle */}
            <h1>{nombre} <br /> {correo} <br />{jobTitle}</h1>
        </div>
    );
};
export default Cabecera;
