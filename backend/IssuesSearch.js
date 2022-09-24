import  { useState } from 'react';
import { format } from 'date-fns';

// Agregar dos botones para avanzar a la página siguiente o a la página anterior (si existen).
// Para ello, tenemos que acceder a la URL de la página siguiente (next) y la página anterior (prev)
// que se encuentra en la propiedad "data.info".

// Para ello necesitáis crear dos variables en el estado: una para almacenar la URL de la página siguiente
// y otra para almacenar la URL de la página anterior.

// Necesitaréis dos botones para avanzar o retroceder páginas. Cada uno de ellos hará un fetch haciendo uso
// de la URL pertinente.

const IssuesSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vaciamos el array de issues.
        setData(null);

        // Establecemos el valor "loading" a "true".
        setLoading(true);

        // Vaciamos el error.
        setError(null);

        try {
            // Obtenemos el response.
            const response = await fetch(`http://localhost:4000/issues`);

            // Obtenemos la información del body.
            const { data } = await response.json();

            // Si todo ha ido bien almacenamos el array de personajes en "data".
            if (response.ok) {
                setData(data);
            } else {
                setError(data?.error || 'Error desconocido');
            }
        } catch (err) {
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor='keyword'>Palabra clave:</label>
                <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p className='error'>{error}</p>}

            {data && (
                <>
                    <ul>
                        {data.isssues.map((issue) => {
                            const dateTime = format(
                                new Date(issue.createdAt),
                                'yyyy-MM-dd'
                            );

                            return (
                                <li key={issue.id}>
                                    <header>
                                        <time dateTime={dateTime}>
                                            {format(
                                                new Date(issue.createdAt),
                                                'dd/MM/yyyy - hh:mm'
                                            )}
                                        </time>
                                    </header>
                                    <div>
                                        <p>{issue.text}</p>
                                        {issue.image && (
                                            <img
                                                src={`http://localhost:4000/${issue.image}`}
                                                alt='issue'
                                            />
                                        )}
                                    </div>
                                    <footer>
                                        <p data-id={issue.idUser}>
                                            {issue.email}
                                        </p>
                                    </footer>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </main>
    );
};

export default IssuesSearch;

