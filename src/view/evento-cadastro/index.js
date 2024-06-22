import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./evento-cadastro.css";

import firebase from "../../config/firebase";

import NavBar from "../../components/navbar/";

function EventoCadastro(props) {
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState("erro");

    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {
        if (props.match.params.id) {
            firebase
                .firestore()
                .collection("eventos")
                .doc(props.match.params.id)
                .get()
                .then(resultado => {
                    setTitulo(resultado.data().titulo);
                    setTipo(resultado.data().tipo);
                    setDetalhes(resultado.data().detalhes);
                    setData(resultado.data().data);
                    setHora(resultado.data().hora);
                    setFotoAtual(resultado.data().foto);
                });
        }
    }, [carregando]);

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        storage
            .ref(`imagens/${fotoNova.name}`)
            .put(fotoNova)
            .then(() => {
                db.collection("eventos")
                    .add({
                        titulo: titulo,
                        tipo: tipo,
                        detalhes: detalhes,
                        data: data,
                        hora: hora,
                        usuario: usuarioEmail,
                        visualizacoes: 0,
                        foto: fotoNova.name,
                        publico: 1,
                        criacao: new Date()
                    })
                    .then(() => {
                        setCarregando(0);
                        setMsgTipo("sucesso");
                    })
                    .catch(erro => {
                        setCarregando(0);
                        setMsgTipo("erro");
                    });
            });
    }

    function atualizar() {
        setMsgTipo(null);
        setCarregando(1);

        if (fotoAtual) {
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);

            db.collection("eventos")
                .doc(props.match.params.id)
                .update({
                    titulo: titulo,
                    tipo: tipo,
                    detalhes: detalhes,
                    data: data,
                    hora: hora,
                    foto: fotoNova ? fotoNova.name : fotoAtual
                })
                .then(() => {
                    setCarregando(0);
                    setMsgTipo("sucesso");
                })
                .catch(erro => {
                    setCarregando(0);
                    setMsgTipo("erro");
                });
        }
    }

    return (
        <>
            <NavBar />
            <div className="col-12 mt-5">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">
                        {props.match.params.id ? "Editar projeto" : "Publicar projeto"}
                    </h3>
                </div>

                <form>
                    <div className="form-group">
                        <label>Titulo:</label>
                        <input
                            onChange={e => setTitulo(e.target.value)}
                            type="text"
                            className="form-control"
                            value={titulo && titulo}
                        />
                    </div>

                    <div className="form-group">
                        <label>Tipo de projeto:</label>
                        <select
                            onChange={e => setTipo(e.target.value)}
                            className="form-control"
                            value={tipo && tipo}
                        >
                            <option disabled selected value>
                                --- Selecionar conteudo ---
                            </option>
                            <option>Ciencias da natureza</option>
                            <option>Linguagens</option>
                            <option>Teste de sistema</option>
                            <option>Banco de dados</option>
                            <option>Implantação de sistema</option>
                            <option>Ciencias humanas</option>
                            <option>Progamação de aplicativo</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descricao do projeto:</label>
                        <textarea
                            onChange={e => setDetalhes(e.target.value)}
                            className="form-control"
                            rows="3"
                            value={detalhes}
                        />
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input
                                onChange={e => setData(e.target.value)}
                                type="date"
                                className="form-control"
                                value={data}
                            />
                        </div>
                        <div className="col-6">
                            <label>Hora:</label>
                            <input
                                onChange={e => setHora(e.target.value)}
                                type="time"
                                className="form-control"
                                value={hora}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            Upload da foto:{" "}
                            {props.match.params.id
                                ? "(Caso queira manter a foto atual, pode pular a alteração deste campo!)"
                                : null}
                        </label>
                        <input
                            onChange={e => setFotoNova(e.target.files[0])}
                            type="file"
                            className="form-control"
                        />
                    </div>

                    <div className="row">
                        {carregando > 0 ? (
                            <div className="spinner-border text-danger mx-auto" role="status">
                                <span className="sr-only">carregando...</span>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={props.match.params.id ? atualizar : cadastrar}
                                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                            >
                                {props.match.params.id ? "Editar projeto" : "Publicar projeto"}
                            </button>
                        )}
                    </div>
                </form>

                <div className="msg-login text-center mt-2">
                    {msgTipo === "sucesso" && (
                        <span>
              <strong>Oba!!!</strong> projeto publicado! &#128526;
            </span>
                    )}
                    {msgTipo === "erro" && (
                        <span>
              <strong>Ops!</strong> Nao foi possivel publicar o projeto!
                            &#128549;
            </span>
                    )}
                </div>
            </div>
        </>
    );
}

export default EventoCadastro;
