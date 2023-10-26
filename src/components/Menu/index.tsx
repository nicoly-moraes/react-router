import { Link, NavLink } from 'react-router-dom';
import style from './Menu.module.css';

export default function Menu() {
    return (
        <>
            <nav className={`navbar navbar-expand-lg ${style.navBarBarra}`}>
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="#">Routers</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${style.navMenuEnd}`} id="navbarNav">
                        <ul className="navbar-nav nav-underline gap-4">
                            <li className="nav-item">
                                <NavLink to="/enderecos/lista" className="nav-link text-light">Lista de Endereços</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/endereco/cadastro" className="nav-link text-light">Cadastrar Endereço</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}