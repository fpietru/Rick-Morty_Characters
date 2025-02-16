import FilterButton from "./FilterButton";

interface Props {
    currentStatus: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Filters({currentStatus, setStatus, setPage}: Props) {
    const status = ["Alive", "Dead", "Unknown"];
    
    return (
        <div className="two wide column">
            <div className="ui vertical right menu">
                <div className="header item">Filter by Status</div>
                {status.map((item, id) => (
                    <FilterButton key={id} name={item} currentStatus={currentStatus} setStatus={setStatus} setPage={setPage} />
                ))}
            </div>
        </div>
    )
}

export default Filters;
