import React from 'react';
import Lottie from 'lottie-react';
import loader from './loader.json';

export const Loader: React.FC = () => {
    return (
        <>
            <Lottie
                style={{ width: '150px', height: '150px' }}
                data-test-id='loader'
                animationData={loader}
            />
        </>
    );
};
