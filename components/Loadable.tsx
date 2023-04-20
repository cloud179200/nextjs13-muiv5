import React, { Suspense } from 'react';


// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: React.FC<any>) => (props) => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        </>
    );
}
Loadable.displayName = "Loadable";
export default Loadable;