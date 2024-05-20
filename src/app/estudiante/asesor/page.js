'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import Image from "next/image";
import React from 'react';

export default function Home() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [cuenta] = useMiProvider();

    const [asesor, setAsesor] = useState(null);

    const handleConsulta = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/profesor/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "profesor_id": id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAsesor(data);
                console.log(data);
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleConsulta();
    }, []);

    function obtenerCursos(lista) {
        if (!lista) return [];
        let elementosUnicos = new Set();
        for (let elemento of lista) {
            elementosUnicos.add(elemento.curso.nombre);
        }
        return Array.from(elementosUnicos);
    }

    function obtenerAsesorias(lista) {
        if (!lista) return [];
        let listaAsesorias = [];

        lista.forEach(seccion => {
            seccion.asesorias.forEach(asesoria => {
                let infoAsesoria = {
                    id: asesoria.id,
                    fecha: new Date(asesoria.fecha_fin).toLocaleDateString(),
                    hora_inicio: new Date(asesoria.fecha_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    hora_fin: new Date(asesoria.fecha_fin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    curso: seccion.curso.nombre,
                    ambiente: asesoria.ambiente,
                    enlace: asesoria.enlace
                };
                listaAsesorias.push(infoAsesoria);
            });
        });

        listaAsesorias.sort((a, b) => new Date(a.fecha_fin).getTime() - new Date(b.fecha_fin).getTime());
        return listaAsesorias;
    }

    

    const handleReservar = async (asesoria_id) => {
        
        const estudiante_id = cuenta.persona.id

        try {
            const response = await fetch('http://127.0.0.1:8000/reservar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "estudiante_id": estudiante_id,
                    "asesoria_id": asesoria_id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Registro exitoso');
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center pt-8 w-5/6">
                {asesor && (
                    <>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center">
                                <div className="relative absolute w-48 h-48 rounded-full flex items-center justify-center">
                                    <Image src={asesor.foto} alt={"foto"} width={1000} height={1000} className="w-full h-full object-cover rounded-full"></Image>
                                </div>
                            </div>
                            <div className="items-center justify-center">
                                <div className="flex items-center justify-center">
                                    <p className="text-gray-500 font-bold text-xl m-5">{asesor.nombres}</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="flex flex-wrap items-center justify-center w-3/4">
                                        {obtenerCursos(asesor.secciones).map((curso, index) => (
                                            <div className="flex items-center justify-center m-2" key={index}>
                                                <div className="px-6 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                                    <p className="text-white font-bold">{curso}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {obtenerAsesorias(asesor.secciones).length != 0 && (
                        <div className="grid grid-rows-auto gap-3 grid-cols-5 mb-9">
                            <div className="col-start-1 row-start-1">
                                <div className="flex items-center justify-center py-10">ID</div>
                            </div>
                            <div className="col-start-2 row-start-1">
                                <div className="flex items-center justify-center py-10">Fecha</div>
                            </div>
                            <div className="col-start-3 row-start-1">
                                <div className="flex items-center justify-center py-10">Hora</div>
                            </div>
                            <div className="col-start-4 row-start-1">
                                <div className="flex items-center justify-center py-10">Curso</div>
                            </div>
                            <div className="col-start-5 row-start-1">
                                <div className="flex items-center justify-center py-10">Acciones</div>
                            </div>
                            {obtenerAsesorias(asesor.secciones).map((asesoria, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-start-1 row-start-auto">
                                        <div className="flex items-center justify-center h-20">{asesoria.id}</div>
                                    </div>
                                    <div className="col-start-2 row-start-auto">
                                        <div className="flex items-center justify-center h-20">{asesoria.fecha}</div>
                                    </div>
                                    <div className="col-start-3 row-start-auto">
                                        <div className="flex items-center justify-center h-20">{asesoria.hora_inicio} - {asesoria.hora_fin}</div>
                                    </div>
                                    <div className="col-start-4 row-start-auto">
                                        <div className="flex items-center justify-center h-20">{asesoria.curso}</div>
                                    </div>
                                    <div className="col-start-5 row-start-auto flex items-center justify-center">
                                        
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-full mx-2"
                                        onClick={() => handleReservar(asesoria.id)}>
                                            Reservar
                                        </button>
                                        
                                        <div className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1.5 px-4 rounded-full mx-2">
                                            <a href={asesoria.enlace} target="_blank" rel="noopener noreferrer">
                                                Ingresar
                                            </a>
                                        </div>  
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        )}
                    </>
                )}
        </div>
    );
}
