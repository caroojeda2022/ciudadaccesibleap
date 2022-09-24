import { useState } from 'react'; 
import { useToken } from '../../TokenContext';
import { useMessage } from '../../MessageContext'; 
import { format } from 'date-fns';

import './Issue.css';


          const Issue = ({ issue, issues, setIssues }) => {
            const [token] = useToken();
            const [, setMessage] = useMessage();
        
            const [loading, setLoading] = useState(false);
        
            // Función que se encarda de crear o deshacer un like // 
            const handleLike = async (e, idIssue) => {
                setLoading(true);
        
                e.target.classList.toggle('like');
        
                try {
                    const res = await fetch(
                        `http://localhost:4000/issue/${idIssue}/votes`,
                        {
                            method: 'POST',
                            headers: {
                                Authorization: token,
                            },
                        }
                    );
        
                    const body = await res.json();
        
                    if (body.status === 'error') {
                        setMessage({
                            status: 'error',
                            text: body.message,
                        });
                    } else {
                        setIssues(
                       issues.map((issue) => {
                      if (issue.id === idIssue) {
                      // Comprobamos si el issue tiene la clase "IsAnimating".
                         const hasIsAnimatingClass =
                        e.target.classList.contains('like');
        
                        // Si la tiene incrementamos los likes (+1), de lo contrario los decrementamos (-1).
                        if (hasIsAnimatingClass) {
                        issue.likes++;
                     } else {
                   issue.likes--;
                }
             }
            return issue;          
          })
       );
    };
      } catch (err) {
       setMessage({
        status: 'error',
        text: err.message, 

        });
        } finally {
          setLoading(false);
       }
    };

 // Función que se encarga de eliminar un issue.// 
 const handleDelete = async (idIssue) => {
  setLoading(true);

    if (window.confirm('¿Deseas eliminar el lugar?')) {
          try {
              const res = await fetch(
                  `http://localhost:4000/issues/${idIssue}`,
                {
                      method: 'DELETE',
                      headers: {
                        Authorization: token,
                      },
                }
          );

  const body = await res.json();   

   if(body.status === 'error') {
    setMessage({
      status: 'error',
      text: body.message, 
    });
} else {
    setIssues(issues.filter((issue) => issue.id !== idIssue));
  }
} catch (err) {
  setMessage({
    status: 'error',
    text: err.message,
  });
} finally {
       setLoading(false);
     }
   }
};  

  //Función que coloca la fecha a un formato válido para el atributo "dateTime" //
  const dateTime = format(new Date(issue.createdAt), 'yyyy-MM-dd');

      return (
      <li className='issue'>
        <header>
          <p>{issue.username}</p> // mostrar el nombre de quien escribio el problema de ubicación //
          <time dateTime={dateTime}>
               {format(new Date(issue.createdAt), 'hh:mm - dd/MM/yyyy?)')}
          </time>
        </header>
        <div>
           <p>{issue.text}</p>
           {issue.image && (
            <img 
                src={'http://localhost:4000/$issue.image}'} 
                alt='Imagen adjunta' 
                />
            )}
        </div>
        <footer>
          <div> //colocar los like// 
            <div 
               className = {`heart ${
                  token && issue.likedByMe && 'like'
                }`}
                onClick={(e) => {  // para hacer el like, pasa el evento y el id del lugar //
                if (token) handleLike(e, issue.id);
                }}
                disabled={loading}
                ></div>
                <p>{issue.likes} likes</p>
               </div>
               {token && issue.owner === 1 && (
               <button onClick={() => handleDelete(issue.id)}>
               Eliminar
               </button>
               )}
              </footer>
       </li>
    );
};
export default Issue;
