import React, { useState } from "react";
import "./usuario-recuperar-senha.css";

import firebase from "../../config/firebase";
import "firebase/auth";

import NavBar from "../../components/navbar/";

function UsuarioRecuperarSenha() {
    const [msg, setMsg] = useState();
    const [email, setEmail] = useState();

    function recuperarSenha() {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(resultado => {
                setMsg("Enviamos um link no seu email para vocë redefinir sua senha!");
            })
            .catch(erro => {
                setMsg("Verifique se o email esta correto!");
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
                <img src="https://i.gifer.com/origin/44/445b96db8218c28ecb60f4ac71513b12_w200.gif" width="200px" img/>
            </center>
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="mb-3">Recuperar senha</h1>
                <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="form-control my-2"
                    placeholder="E-mail"
                />

                <div className="msg my-4 text-center">
                    <span>{msg}</span>
                </div>

                <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">
                    Recuperar Senha
                </button>
            </form>
        </>
    );
}

export default UsuarioRecuperarSenha;
