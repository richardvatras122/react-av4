import React, { useState, useEffect } from "react";
import "./evento-detalhes.css";
import { Link, Redirect } from "react-router-dom";

import firebase from "../../config/firebase";

import NavBar from "../../components/navbar/";

import { useSelector } from "react-redux";

function EventoDetalhes(props) {
    const [evento, setEvento] = useState({});
    const [urlImage, setUrlImage] = useState({});
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);
    const usuarioLogado = useSelector(state => state.usuarioEmail);

    useEffect(() => {
        if (carregando) {
            firebase
                .firestore()
                .collection("eventos")
                .doc(props.match.params.id)
                .get()
                .then(resultado => {
                    setEvento(resultado.data());
                    firebase
                        .firestore()
                        .collection("eventos")
                        .doc(props.match.params.id)
                        .update("visualizacoes", resultado.data().visualizacoes + 1);
                    firebase
                        .storage()
                        .ref(`imagens/${resultado.data().foto}`)
                        .getDownloadURL()
                        .then(url => {
                            setUrlImage(url);
                            setCarregando(0);
                        });
                });
        } else {
            firebase
                .storage()
                .ref(`imagens/${evento.foto}`)
                .getDownloadURL()
                .then(url => {
                    setUrlImage(url);
                    setCarregando(0);
                });
        }
    }, []);

    function remover() {
        firebase
            .firestore()
            .collection("eventos")
            .doc(props.match.params.id)
            .delete()
            .then(() => {
                setExcluido(1);
            });
    }

    return (
        <>
            <NavBar />

            {excluido ? <Redirect to="/" /> : null}

            <div className="container-fluid">
                {carregando ? (
                    <div className="row mt-5">
                        <div className="spinner-border text-danger mx-auto" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="row">
                            <img src={urlImage} className="img-banner" alt="Banner" />
                            <div className="col-12 text-right mt-1 visualizacoes">
                                <i className="fas fa-eye"></i>
                                <span className="px-2">{evento.visualizacoes + 1}</span>
                            </div>
                            <h3 className="mx-auto mt-5 titulo">
                                <strong>{evento.titulo}</strong>
                            </h3>
                        </div>
                        <div className="row mt-5 d-flex justify-content-around">
                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <i className="fas fa-ticket-alt fa-2x"></i>
                                <h5>
                                    <strong>Conteudo</strong>
                                </h5>
                                <span className="mt-3">{evento.tipo}</span>
                            </div>

                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <i className="fas fa-calendar-alt fa-2x"></i>
                                <h5>
                                    <strong>Data</strong>
                                </h5>
                                <span className="mt-3">{evento.data}</span>
                            </div>

                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <i className="fas fa-clock fa-2x"></i>
                                <h5>
                                    <strong>Hora</strong>
                                </h5>
                                <span className="mt-3">{evento.hora}</span>
                            </div>
                        </div>
                        <div className="row box-detalhes mt-5">
                            <div className="col-12 text-center">
                                <h5>
                                    <strong>Detalhes do projeto</strong>
                                </h5>
                            </div>
                            <div className="col-12 text-center">
                                <p>{evento.detalhes}</p>
                            </div>
                        </div>
                        {usuarioLogado === evento.usuario ? (
                            <Link
                                to={`/editar-evento/${props.match.params.id}`}
                                className="btn-editar"
                            >
                                <i className="fas fa-pen-square fa-3x"></i>
                            </Link>
                        ) : (
                            ""
                        )}
                        {usuarioLogado === evento.usuario ? (
                            <button
                                onClick={remover}
                                type="button"
                                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                            >
                                Remover projeto
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default EventoDetalhes;
