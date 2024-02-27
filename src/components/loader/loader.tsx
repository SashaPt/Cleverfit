import React from 'react';
import Lottie from 'lottie-react';
import loader from './loader.json';
import './loader.scss';

export const Loader: React.FC = () => (
    <div className='loader' data-test-id='loader'>
        <Lottie style={{ width: '150px', height: '150px' }} animationData={loader} />
    </div>
);
