import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

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

                // Exibe um alerta com as informações decodificadas
                alert(JSON.stringify(decoded, null, 2));
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
