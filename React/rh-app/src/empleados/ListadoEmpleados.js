import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoEmpleados() {

    const urlBase = "http://localhost:8080/rhApp/empleados";

    // se define un hook para que este pendiente de cualquier cambio en el arreglo
    // useState sincroniza cambios en html y js
    const [empleados, setEmpleados] = useState([]);

    // hook que se carga al inicio de pagina para concectar al servicio del back
    // se define arreglo vacio [] para que solo se ejecute una ves caso contrario ejecuta infinito
    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        // esperamos respuesta del back
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar empleados");
        console.log(resultado.data);
        // cargamos la data al arreglo
        setEmpleados(resultado.data);
    }

    const eliminarEmpleado = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarEmpleados();
    }





    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px;" }}>
                <h3>listadoEmpleados hi</h3>
            </div>
            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Empleado</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Sueldo</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Itera arreglo de empleados
                        empleados.map((empleado, indice) => (
                            <tr key={indice}>
                            <th scope="row">{empleado.idEmpleado}</th>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.departamento}</td>
                            <td> <NumericFormat value={empleado.sueldo}
                                displayType={'text'}
                                thousandSeparator=','
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale/>
                            </td>

                            <td className='text-center'>
                                <div>
                                    <Link to={`/editar/${empleado.idEmpleado}`}
                                    className='btn btn-warning btn-sm me-3'>Editar</Link>
                                    <button onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                                        className='btn btn-danger btn-sm'>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        ))

                    }
                   

                </tbody>
            </table>
        </div>

    )
}
