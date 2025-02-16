import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Character } from "./HomePage";

interface Object {
    name: string;
    url: string;
}

interface Episode {
    id: number;
    name: string;
    episode: string;
}

interface ExtendedCharacter extends Character {
    species: string;
    type: string;
    origin: Object;
    location: Object;
    episode: string[];
}

function CharacterPage() {
    const { characterId } = useParams();
    const [character, setCharacter] = useState<ExtendedCharacter | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const url = `https://rickandmortyapi.com/api/character/${characterId}`;

    useEffect(() => {
        const fetchCharacter = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            try {		
                const response = await fetch(url, { signal: abortControllerRef.current.signal });
                const data = await response.json();
                setCharacter(data);

                if (data.episode.length > 0) {
                    const episodeResponses = await Promise.all(
                        data.episode.map((ep: string) => fetch(ep).then(res => res.json()))
                    );
                    setEpisodes(episodeResponses);
                }
            } catch (e: any) {
                setError("Failed to fetch character data.");
            }
        };

        fetchCharacter();
        return () => abortControllerRef.current?.abort();
    }, [url]);

    if (error) return <div>Something went wrong! {error}</div>;
    if (!character) return <div>Loading...</div>;

    return (
        <div className="ui basic segment">
            <div className="ui center aligned huge header">{character.name}</div>
            <div className="ui container">
                <div className="ui two column stackable center aligned grid container">
                    <div className="column">
                        <h3 className="ui block header">Statistics</h3>
                        <table className="ui celled striped table">
                            <tbody>
                                <tr><td>Status</td><td>{character.status}</td></tr>
                                <tr><td>Species</td><td>{character.species}</td></tr>
                                <tr><td>Type</td><td>{character.type || "unknown"}</td></tr>
                                <tr><td>Gender</td><td>{character.gender}</td></tr>
                                <tr><td>Origin location</td><td>{character.origin.name}</td></tr>
                                <tr><td>Last known location</td><td>{character.location.name}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <div className="ui basic segment">
                            <img className="ui centered bordered medium rounded image" src={character.image} alt={character.name} />
                        </div>
                    </div>
                </div>

                <div className="ui segment">
                    <h3 className="ui block header">List of Episodes</h3>
                    {episodes.length === 0 ? (
                        <div>No episodes found.</div>
                    ) : (
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Episode Code</th>
                                    <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {episodes.map((ep, index) => (
                                    <tr key={ep.id}>
                                        <td>{index + 1}</td>
                                        <td>{ep.episode}</td>
                                        <td>{ep.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CharacterPage;
