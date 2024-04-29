
import { Link, useNavigate } from 'react-router-dom'; // Importando o Link e o Redirect do React Router DOM
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/logo.jpeg';
import './header.css';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FetchApi } from '../../utils/Fetch';

function Header({ to1, link1, to2, link2, to3, link3, to4, link4 }) {
//   const isAuth = useIsAuthenticated();
//   const signOut = useSignOut();
//   const useHeader = useAuthHeader('auth.token');
//   const authUser = useAuthUser();
//   const navigate = useNavigate()

//   async function handleLogout() {
//     try {
//       const token = useHeader.replace('x-acess-token ', '');
//       await FetchApi(
//         'get',
//         'https://localhost:7777/user/logout-user',
//         '',
//         token
//       );

//       signOut();
      
//      navigate('/login');
//     } catch (error) {
//       console.error(error);
//     }
//   }

  return (
    <Navbar style={{ backgroundColor: '#0E1618' }}>
      <Navbar.Brand className="ml-3">
        <Link to="/">
          <img width={100} height={100} src={logo} alt="Logo" />
        </Link>
      </Navbar.Brand>
      <Nav className="d-flex justify-content-space-between">
        <Link to={to1}>{link1}</Link>
        <Link to={to2}>{link2}</Link>
        <Link to={to3}>{link3}</Link>
        <Link to={to4}>{link4}</Link>
      </Nav>
      {/* {isAuth ? (
        <div className="user">
          <p>Usuário: {authUser.name}</p>
          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link to="/Login">Login</Link>
          <Link to="/Cadastro">Cadastro</Link>
        </>
      )} */}
    </Navbar>
  );
}

export default Header;
