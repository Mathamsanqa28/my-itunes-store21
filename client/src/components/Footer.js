import React from 'react';

function Footer() {
        const date = new Date();
        const year = date.getFullYear();
    return(
        <div>
            <h6>©Nomathamsanqa Nyathi {year}</h6>
        </div>
    )
}

export default Footer;