import React, { useRef } from 'react';
import { Howl } from 'howler';

const PlaySound = () => {
    const soundRef = useRef(null);

    const playSound = () => {
        soundRef.current = new Howl({
            src: ['/sounds/notification.mp3']
        });

        soundRef.current.play();
    };

    const stopSound = () => {
        if (soundRef.current) {
            soundRef.current.stop();
        }
    };

    return (
        <div>
            <button onClick={playSound}>Play Sound</button>
            <button onClick={stopSound}>Stop Sound</button>
        </div>
    );
};

export default PlaySound;
