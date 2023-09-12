import React, { Children } from 'react';
import './style.scss';

const ContentWrapper = ({ children }) => {
    return (
        <React.Fragment>
            <div className='contentWrapper'>{children}</div>
        </React.Fragment>
    )
}

export default ContentWrapper;
