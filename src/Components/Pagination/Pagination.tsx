import ReactPaginate from "react-paginate";

interface Props {
    countPages: number
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({countPages, page, setPage}: Props) {
    return (
        <div className="ui basic segment">
            <ReactPaginate 
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={countPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                containerClassName={"ui pagination menu"}
                activeClassName={"item active"}
                activeLinkClassName={"item active"}
                pageClassName={"item"}
                pageLinkClassName={"item"}
                disabledClassName={"disabled item"}
                disabledLinkClassName={"disabled item"}
                previousClassName={"item"}
                previousLinkClassName={"item"}
                nextClassName={"item"}
                nextLinkClassName={"item"}
                breakClassName={"item"}
                breakLinkClassName={"item"}
                onPageChange={(data) => {
                    setPage(data.selected + 1)
                }}
                forcePage={page === 1 ? 0 : page-1}
            />
        </div>)

}

export default Pagination;
