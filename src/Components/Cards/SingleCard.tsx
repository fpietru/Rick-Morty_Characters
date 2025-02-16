import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Image,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Character } from '../../Pages/HomePage';

interface Props {
    character: Character;
}

const SingleCard: React.FC<Props> = ({ character }) => {
    return (
        <Link to={`/character/${character.id}`} className="ui centered card">
            <Image src={character.image} wrapped={true}/>
            <CardContent>
                <CardHeader>{character.name}</CardHeader>
                <CardMeta> {character.status} </CardMeta>
                <CardDescription> {character.species} </CardDescription>
                <CardDescription> {character.gender} </CardDescription>
            </CardContent>
        </Link>
    );
}

export default SingleCard;