import React, { useState } from "react";
import "./login.css";
import { Link, Redirect } from "react-router-dom";

import firebase from "../../config/firebase";
import "firebase/auth";

import { useSelector, useDispatch } from "react-redux";

function Login() {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();

    const dispatch = useDispatch();

    function logar() {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, senha)
            .then(resultado => {
                setMsgTipo("sucesso");
                setTimeout(() => {
                    dispatch({ type: "LOG_IN", usuarioEmail: email });
                }, 2000);
            })
            .catch(erro => {
                setMsgTipo("erro");
            });
    }

    return (
        <div className="login-content d-flex align-items-center">
            {useSelector(state => state.usuarioLogado) > 0 ? (
                <Redirect to="/" />
            ) : null}

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <img src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif" width="200px" img/>
                </div>

                <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    id="inputEmail"
                    className="form-control my-2"
                    placeholder="E-mail"
                />
                <input
                    onChange={e => setSenha(e.target.value)}
                    type="password"
                    id="inputPassword"
                    className="form-control my-2"
                    placeholder="Senha"
                />

                <button
                    onClick={logar}
                    className="btn btn-lg btn-primary btn-block btn-login"
                    type="button"
                >
                    Logar
                </button>

                <div className="msg-login text-white text-center my-5">
                    {msgTipo === "sucesso" && (
                        <span>
              <strong>Wow</strong> você está conectado! &#128526;
            </span>
                    )}
                    {msgTipo === "erro" && (
                        <span>
              <strong>Ops</strong> verifique se o usuário e/ou a senha estão
              corretos! &#128549;
            </span>
                    )}
                </div>

                <div className="opcoes-login text-center mt-5">
                    <Link to="recuperar-senha" className="mx-2">
                        Recuperar senha
                    </Link>
                    <span className="text-white">&#9733;</span>
                    <Link to="novo-usuario" className="mx-2">
                        Quero cadastrar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
