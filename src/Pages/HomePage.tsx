import { useState, useEffect, useRef } from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../HomePage.css'
import Filters from '../Components/Filters/Filters'
import Cards from '../Components/Cards/Cards'
import Pagination from '../Components/Pagination/Pagination'

interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
}

function App() {
    const [status, setStatus] = useState("")
    const [page, setPage] = useState(1);
    const [error, setError] = useState();
    const [info, setInfo] = useState<Info>();
	const [characters, setCharacters] = useState<Character[]>([]);
	const abortControllerRef = useRef<AbortController | null>(null);

    const url = `https://rickandmortyapi.com/api/character?page=${page}${status === "" ? "" : `&status=${status}`}`

	useEffect(() => {
		const fetchCharacters = async () => {
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();
			try {		
				const response = await fetch(url, {
					signal: abortControllerRef.current?.signal,
				});
				const data = await response.json();
                setInfo(data.info);
				setCharacters(data.results);
			} catch (e: any) {
				setError(e);
			}
		};

		fetchCharacters();
        return () => {
            abortControllerRef.current?.abort();
        };
	}, [url]);
	if (error) { return <div>Something went wrong! </div>; }
    if (!info || !characters) { return <div>Loading...</div>; }

	return (
        <div className="ui container basic segment">     
            <div className="ui center aligned huge header">Rick and Morty Characters</div>
            <div className="ui two column grid">
                <div className="fourteen wide center aligned column">
                    <Pagination countPages={info.pages} page={page} setPage={setPage} />
                    <Cards characters={characters} />
                    <Pagination countPages={info.pages} page={page} setPage={setPage} />
                </div>
                <Filters currentStatus={status} setStatus={setStatus} setPage={setPage} />
            </div>
		</div>
	);
}

export default App;
