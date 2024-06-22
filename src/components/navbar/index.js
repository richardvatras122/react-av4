import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

function NavBar() {

  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg">
      <img src="https://cdn.pixabay.com/photo/2017/07/31/21/55/collector-2561448_960_720.png" width="50px" img/>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        

      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ml-2">
            <Link className="nav-link" to="/">
              Feed
            </Link>
          </li>
          {
            useSelector(state => state.usuarioLogado) > 0 ?
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastrar-evento">
                  Publicar projeto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/eventos/meus-eventos">
                  Meus projetos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={() => dispatch({ type: "LOG_OUT"})}>
                  Sair
                </Link>
              </li>
            </>
            : <>
              <li className="nav-item">
                <Link className="nav-link" to="/novo-usuario">
                  Cadastrar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
