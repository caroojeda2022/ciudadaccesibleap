import { useEffect, useState } from 'react';
import { useToken } from '../../TokenContext';
import { useMessage } from '../../MessageContext';
import { Toaster } from 'react-hot-toast';
import useToast from '../../hooks/useToast';

import Issue from '../Issue/Issue';

import './IssueSearch.css';

const IssueSearch = () => {
  // Hooks personalizados.
const [token] = useToken(); //comprobar si esta autorizado o no el usuario
const [, setMessage] = useMessage();

  //Variables del State, guardar contenido de los lugares incluidos en la API//
const [keyword, setKeyword] = useState('');
const [loading, setLoading] = useState(false);
const [issues, setIssues] = useState(null);

useToast();

// se utiliza usefect para q se carguen los lugares la 1ra.vez q se monta el componente//
    useEffect(() => {
    const fetchData = async () => {
      try { //pasar el token usado, se crea un objeto con la propiedad header //
          const params = token
          ? { headers: { Authorization: token}}
          : {}; // si no existe el token devuelve un objeto vacio //
      
      const res = await fetch('http://localhost:4000/issues',params);
      const body = await res.json();
      
      if (body.status === 'error') { 
        setMessage({
          status: 'error',
        text: body.message,
        });
      } else {
        setIssues(body.data.issues);
      }
    } catch (err) {;
        setMessage ({
          status:'error',
          text: err.message, 
        });
      }
    }; 

//antes de salir del Useefect se llama a la funcion fetchDta // 
  fetchData();
}, [token, setMessage]);

const handlerSumit = async (e) => {
  e.preventDefault();
  setLoading(true);

const params = token
? {
  headers: {
           Authorization: token,
          },
        }
    :{};
  try {
    const res = await fetch(
      'http://localhost:4000/issues?keyword=${keyword}', 
      params
    );
  const body = await res.json();

  if(body.status === 'error') {
        setMessage({
      status: 'error',
      text: body.message,
    });
    } else { 
      setIssues(body.data.issues);
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
<main className='issue-search'>

   <form onSubmit={handleSubmit}> 
        <inpunt
         type='text'
         name='Keyword'
         onChange={(e) => setKeyword(e.target.value)}
         />
         <button disabled={loading}>Buscar</button> 
        </form>

        <Toaster
         containerStyle={{ 
         position: 'relative',
         widht: '100%',
         left: '50%',
         transform: 'translateX(-50%)',
        }}
         />

    {issues && (
       <ul className= 'issue-list'>
          {issues.map((issue) => {
             return ( 
             <Issue 
                  key={issue.id} 
                  issue={issue} 
                  issues={issues} 
                  setIssues={setIssues} 
                  
                 />
               
             );
          })}
       </ul>
      )}
    </main>
  );
}; 

export default IssueSearch;