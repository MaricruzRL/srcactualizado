import imagen from "./../../estilos/img/itilogo.png";

const Evalucionreporteresidente = () => {
    return (
        <div className="contenido__Evalucionreporteresidente">
            <div className="Evalucionreporteresidente__titulo">
                <h1>Evaluación De Reporte De Residencia Profesional</h1>
            </div>
            <div className="Evalucionreporteresidente__preguntas">
                <div className="contenido__preguntas">
                    <div className="informacion__pregunta">
                        <span>Nombre del residente:</span>
                        <input type="text" name="name" placeholder="Nombre del residente"></input>
                        <span>Nombre del proyecto:</span>
                        <input type="text" name="name" placeholder="Nombre del proyecto"></input>
                        <span>Periodo de realización de la Residencia <br /> Profesional:</span>
                        <input type="text" name="name" placeholder="Periodo de realización de la Residencia Profesional"></input>
                    </div>
                    <div className="informacion__pregunta">
                        <span>Número de control:</span>
                        <input type="number" name="numero" min="0" placeholder="N° de control"></input>
                        <span>Programa educativo:</span>
                        <input type="text" name="name" placeholder="Programa educativo"></input>
                        <span>Calificación Parcial <br /> (promedio de ambas evaluaciones):</span>
                        <input type="text" name="name" placeholder="Calificación parcial"></input>
                    </div>
                </div>

                <div className="informacion__tabla">
                    <table  border="1"><thead>
                        <tr>
                            <th colSpan="4">En qué medida el residente cumple con lo siguiente</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Criterios a evaluar</th>
                            <th>Valor</th>
                            <th>Evaluación</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <th rowSpan="16">Evaluación por el asesor externo</th>
                            </tr>
                            <tr>
                                <td>Portada.</td>
                                <td>2</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Agradecimientos.</td>
                                <td>2</td>
                                <td>
                                  <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Resumen.</td>
                                <td>2</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Índice.</td>
                                <td>2</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Introducción.</td>
                                <td>2</td>
                                <td>
                                   <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Problemas a resolver, priorizándolos.</td>
                                <td>5</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Objetivos.</td>
                                <td>5</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Justificación.</td>
                                <td>   </td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Marco teórico (fundamentos teóricos)</td>
                                <td>10</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Procedimiento y descripción de las actividades realizadas.</td>
                                <td>5</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos
                                    matemáticos, simulaciones, normativaes, regulaciones y restricciones, entre otros. Solo para
                                    proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio
                                    económico.**
                                </td>
                                <td>45</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Conclusiones, recomendaciones y experiencia profesional adquirida.</td>
                                <td>15</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Competencias desarrolladas y/o aplicadas.</td>
                                <td>3</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Fuentes de información</td>
                                <td>2</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Calificación total</td>
                                <td>100</td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="observaciones">
                        <span>Observaciones:</span>
                        <textarea name="textarea" placeholder="Ingrese las observaciones" />
                        <input className="btn" type="submit" name="register" value="Registrar"></input>
                        <input className="btn" type="submit" name="register" value="Imprimir"></input>

                    </div>

                </div>
            </div>

        </div>
    );
};
export default Evalucionreporteresidente;