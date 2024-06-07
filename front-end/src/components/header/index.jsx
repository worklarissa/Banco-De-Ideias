import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FetchApi } from "../../utils/Fetch";
import { useState } from "react";
import logo from "../../assets/logo.jpeg";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import "../../styles/customNavBar.css";
import "./header.css";
import "../../styles/global.css";


const Header = () => {
  const [requestLoading, setRequestLoading] = useState(false)
  const isAuth = useIsAuthenticated();
  const signOut = useSignOut();
  const useHeader = useAuthHeader("auth.token");
  const authUser = useAuthUser();
  const navigate = useNavigate()
  const ApiUrl = import.meta.env.VITE_API_URL

  async function handleLogout() {
    try {
      setRequestLoading(true)
      const token = useHeader.replace("x-acess-token ", "");
      await FetchApi(
        "POST",
        `${ApiUrl}/user/logout`,
        "",
        token
      );
    
      signOut();
      navigate('/login')
    } catch (error) {
      console.error(error);
    } finally {
      setRequestLoading(false)
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bsPrefix="navbar">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img width={100} height={100} src={logo} alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="custom-toggler"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="link" to="/ideias">
              Ideias
            </Link>
            <Link className="link" to="/perfil">
              Perfil
            </Link>
          </Nav>
          <Nav>
            {!isAuth ? (
              <Nav className="me-auto">
                <Link className="link" to="/login">
                  Login
                </Link>
                <Link className="link" to="/Cadastro">
                  Cadastro
                </Link>
              </Nav>
            ) : (
              <>
                <Link className="link" to="/perfil">
                  {authUser.name}
                </Link>
                <Link className="link" to="">
                  <button onClick={() => handleLogout()} className="logout-button" disabled={requestLoading}>Logout</button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
