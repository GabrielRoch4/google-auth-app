import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Modal } from 'react-modal';

// Configuração do modal para o elemento root
Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', picture: '' });

  const openModal = (user) => {
    setUserInfo(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Google Auth Integration
        </p>
        <span>
          <GoogleLogin
            onSuccess={credentialResponse => {
              try {
                // Decodifica o token e obtém as informações
                const decoded = jwtDecode(credentialResponse?.credential);

                // Obtém as informações desejadas do objeto decodificado
                const user = {
                  name: decoded.name || 'Nome não disponível',
                  email: decoded.email || 'Email não disponível',
                  picture: decoded.picture || ''
                };

                // Abre o modal com as informações do usuário
                openModal(user);
              } catch (error) {
                console.error('Error decoding token:', error);
                alert('Failed to decode token.');
              }
            }}  
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </span>
      </header>

      {/* Modal para exibir informações do usuário */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Information"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Bem-vindo, {userInfo.name}</h2>
        <div>
          <img src={userInfo.picture} alt="Profile" className="Profile-picture" />
        </div>
        <p>Email: {userInfo.email}</p>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
}

export default App;
