
interface Props {
    name: string;
    currentStatus: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};


function FilterButton({name, currentStatus, setStatus, setPage} : Props) {
    return (
        <a
        className={`item ${currentStatus === name ? "active" : ""}`}
        onClick={() => {
            if (currentStatus === name) {
                setStatus(""); 
            } else setStatus(name);
            setPage(1);
        }}
        >
            {name}
        </a>
    )
}

export default FilterButton;

