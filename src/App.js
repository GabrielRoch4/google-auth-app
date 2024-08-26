import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function App() {
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
                const name = decoded.name || 'Nome não disponível';
                const email = decoded.email || 'Email não disponível';
                const picture = decoded.picture || '';

                // Exibe um alerta com as informações formatadas
                alert(`Nome: ${name}\nEmail: ${email}\nFoto de perfil: ${picture}`);
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
    </div>
  );
}

export default App;
