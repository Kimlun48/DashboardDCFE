import React from 'react';

const FooterText = ({speed}) => {
    const marqueeStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        backgroundColor: '#333',
        color: '#FE8D25',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    };

    const textStyle = {
        display: 'inline-block',
        paddingLeft: '100%',
        animation: 'marquee 10s linear infinite',
    };

    return (
        <div style={marqueeStyle}>
            <div style={textStyle}>
                This is running text in the footer. It moves continuously from right to left.
            </div>
            <style>
                {`
                    @keyframes marquee {
                        0% { transform: translate(100%, 0); }
                        100% { transform: translate(-100%, 0); }
                    }
                `}
            </style>
        </div>
    );
};
FooterText.defaultProps = {
    speed: 10,
};

export default FooterText;
