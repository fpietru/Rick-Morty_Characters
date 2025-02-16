import { Character } from "../../Pages/HomePage";
import SingleCard from "./SingleCard";

interface Props {
    characters: Character[];
}

function Cards({ characters} : Props) {
    if (characters.length === 0) {
        return <div>No Characters to Display</div>
    }

    return (
        <div className="ui segment">
            <div className="ui centered link cards">
                {characters.map((character) => {
                    return <SingleCard key={character.id} character={character} />
                })}
            </div>
        </div>
    );
}

export default Cards;