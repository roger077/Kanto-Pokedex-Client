import React from 'react';
import pikachuGif from "./pikachu-gif-loading.png"
import styles from './loading.module.css'

export default function Loading(){
    return(
        <div className={styles.loadingContainer}>
            <p>Loading...</p>
            <img src={pikachuGif} />
        </div>
    )
}