import React from 'react';
import Socket from "../../Socket/Socket";


const Join = () => {
    return (
        <div>
            <input type="text" placeholder='Room ID' value=''/>
            <input type="text" placeholder='Ваше имя' value=''/>
            <button>Войти</button>
        </div>
    );
};

export default Join;