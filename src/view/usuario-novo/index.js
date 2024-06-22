import React, { useState } from "react";
import "./usuario-novo.css";

import firebase from "../../config/firebase";
import "firebase/auth";
import NavBar from "../../components/navbar/";

function NovoUsuario() {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {
        setCarregando(1);

        setMsgTipo(null);

        if (!email || !senha) {
            setMsgTipo("erro");
            setMsg("Voce precisa informar o e-mail e senha para fazer o cadastro!");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(resultado => {
                setCarregando(0);
                setMsgTipo("sucesso");
            })
            .catch(erro => {
                setCarregando(0);
                setMsgTipo("erro");
                switch (erro.message) {
                    case "Password should be at least 6 characters":
                        setMsg("A senha deve ter pelo menos 6 caracteres!");
                        break;
                    case "The email address is already in use by another account.":
                        setMsg("Este email ja esta sendo usado por outro usuario!");
                        break;
                    case "The email address is badly formatted.":
                        setMsg("O formato do seu email e invalido!");
                        break;
                    default:
                        setMsg("Nao foi possivel cadastrar. Tente novamente mais tarde");
                        break;
                }
            });
    }

    return (
        <>
            <NavBar />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <center>
                <img src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif" width="200px" img/>
            </center>
            <div className="form-cadastro">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                    <input
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        className="form-control my-2"
                        placeholder="Email"
                    />

                    <input
                        onChange={e => setSenha(e.target.value)}
                        type="password"
                        className="form-control my-2"
                        placeholder="Senha"
                    />
                    {carregando ? (
                        <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    ) : (

                        <button

                            onClick={cadastrar}
                            type="button"
                            className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                        >
                            Cadastrar
                        </button>
                    )}

                    <div className="msg-login text-black text-center my-5">
                        {msgTipo === "sucesso" && (
                            <span>
                <strong>Wow</strong> usuario cadastrado com sucesso! &#128526;
              </span>
                        )}
                        {msgTipo === "erro" && (
                            <span>
                <strong>Ops!</strong> {msg} &#128549;
              </span>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default NovoUsuario;
