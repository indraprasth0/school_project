import React from 'react';

const Pagination = () => {
    return (
        <div className='p-4 flex items-center justify-between'>
            <button disabled className='py-2 px-4 rounded-md text-xs font-semibold disabled:cursor-not-allowed bg-primary text-secondary hover:bg-p800'>Prev</button>
            <div className='flex items-center gap-2 text-sm'>
                <button className='px-2 rounded-sm bg-primary text-secondary shadow-sm hover:bg-p800'>1</button>
                <button className='px-2 rounded-sm shadow-sm hover:bg-p500'>2</button>
                <button className='px-2 rounded-sm shadow-sm hover:bg-p500'>3</button>
                ...
                <button className='px-2 rounded-sm shadow-sm hover:bg-p500'>10</button>
            </div>
            <button  className='py-2 px-4 rounded-md text-xs font-semibold disabled:cursor-not-allowed bg-primary text-secondary shadow-sm hover:bg-p800'>Next</button>
            
        </div>
    );
}

export default Pagination;
