import { useState } from 'react';
import { useToken } from '../../TokenContext';
import { useMessage } from '../../MessageContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useToast from '../../hooks/useToast';

import './Register.css';

const Register = () => {
  //Hoks personalizados //
  const navigate = useNavigate();
  const [token, setToke] = useToken();
  const [, setMessage] = useMessage();

  // variables del State de React desde valor inicial//
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useToast();

  //Si estamos logueados, existe token, redireccionamos a la página principal //
  if (token) return <Navigate to='/' />;

  // Función que maneja el envío del formulario de registro.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, // datos que la API pide el usuario, minusculas porque es case sensitive//
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const body = await res.json();

      setMessage({
        status: body.status,
        text: body.message,
      });

      // Si el registro se ha completado con éxito redirigimos a página de login.//
      if (body.status === 'ok') navigate('/login');
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
    <main className='register'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Usuario:</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='pass'>Contraseña:</label>
        <input
          type='password'
          name='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>Sign Up</button>
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

export default Register;
