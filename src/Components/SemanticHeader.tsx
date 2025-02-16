import { Header } from "semantic-ui-react";

interface Props {
    children: string;
}

function SemanticHeader({children}: Props) {
    return (
        <Header as='h1'>{children}</Header>
    );
}

export default SemanticHeader;