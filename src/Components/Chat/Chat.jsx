import React from 'react';

const Chat = () => {
    return (
        <div style={{display: 'flex', height: '200px'}}>
            <div style={{width: '150px', border: '1px solid red'}}>
                <div>Users</div>
                <div>item</div>
            </div>
            <div style={{border: '1px solid red',}}>
                <div >
                    <div style={{marginBottom: '20px'}}>
                        <div>mess1</div>
                        <div>name</div>
                    </div>
                    <div>
                        <div>mess1</div>
                        <div>name</div>
                    </div>
                </div>
                <div>
                    <form action="">
                        <textarea name="message" placeholder='Enter new message'/> <br/>
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
