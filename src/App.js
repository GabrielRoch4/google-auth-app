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
              const decoded = jwtDecode(credentialResponse?.credential)
              console.log(decoded);
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
