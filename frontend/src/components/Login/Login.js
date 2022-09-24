import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMessage } from '../../MessageContext';
import { useToken } from '../../TokenContext';
import { Toaster } from 'react-hot-toast';
import useToast from '../../hooks/useToast';

import './Login.css';

const Login = () => {
  // Hooks personalizados.
  const [token, setToke] = useToken();
  const [, setMessage] = useMessage();

  // Variable del State //
  //const [username,setUsername] =useState('');//
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Si hay algún mensaje lo imprimimos con toasty hook personalizado. //
  useToast();

  //Si estamos logueados, existe token, redireccionamos a la página principal //
  if (token) return <Navigate to='/' />;

  //Funcion que maneja el envio del formulario de login //
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        setMessage({
          status: 'error',
          text: body.message,
        });
      } else {
        setToken(body.data.token);
      }
    } catch (err) {
      setMessage({
        status: 'error',
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='login'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='pass'>Password:</label>
        <input
          type='password'
          name='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>Log In</button>
      </form>

      <Toaster
        containerStyle={{
          position: 'relative',
          width: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </main>
  );
};

export default Login;
