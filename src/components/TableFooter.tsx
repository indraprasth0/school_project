type TableFooterProps = {
    isFetching: boolean;
    hasNextPage: boolean;
    totalRows: number;
};

export const TableFooter = ({
    isFetching,
    hasNextPage,
    totalRows,
}: TableFooterProps) => {
    const isEndReached = !hasNextPage && !isFetching && totalRows > 0;

    return (
        <div className="w-full py-4 flex justify-center items-center text-p900 min-h-[50px]">
            {isEndReached && (
                <span>{`You've reached the end — all records are displayed!`}</span>
            )}
        </div>
    );
};
