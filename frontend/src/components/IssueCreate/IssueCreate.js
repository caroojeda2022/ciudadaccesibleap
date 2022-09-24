import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { useMessage } from '../../MessageContext';
import { Toaster } from 'react-hot-toast';
import useToast from '../../hooks/useToast';

import './IssueCreate.css';

const IssueCreate = () => {
    const navigate = useNavigate();
    const [token] = useToken();
    const [, setMessage] = useMessage();

    const [text, setText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    //Si hay algún mensaje imprimrlo con toast y hook personalizado. // 
    useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            //  enviar un body con formato "form/data" es necesario
            // crear un objeto de tipo FormData y "pushear" los elementos a enviar
    
            const formData = new FormData();

            // Pusheamos las propiedades con append.
            formData.append('text', text);
            formData.append('image', selectedFile);

            const res = await fetch('http://localhost:4000/issues', {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });

            const body = await res.json();
            if (body.status === 'error') {
                setMessage({
                    status: 'error',
                    text: body.message,
                });
            } else {
                navigate('/');
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

    // Si no tenemos token o la petición ha ido bien redireccionamos a la página principal.
    if (!token) return <Navigate to='/' />;

    return (
        <main className='issue-create'>
            <form onSubmit={handleSubmit}>
                <h1>ciudadaccesibleapi</h1>
                <h2>Api que permite publicar lugares de la ciudad con problemas de accesibilidad para denunciarlos</h2>
                <input 
                    type='file' 
                onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                        }}
                    />
                <textarea 
                      value={text} 
                onChange={(e) => setText(e.target.value)} 
                />
                <button disabled={loading}>Enviar</button>
            </form>

<Toaster 
     containerStyle={{
    position: 'relative',
    width: '100%',
    left:'50%',
    transform: 'translateX(-50)',
     }}
    />
    </main> 
  );
};

export default IssueCreate;