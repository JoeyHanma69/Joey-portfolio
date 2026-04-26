import {useEffect } from 'react'; 
import './Splash.css'; 

export default function Splash( {onDone}) { 
    useEffect(() => 
    { 
        const timer = setTimeout(() => onDone(), 3200)
        return () => clearTimeout(timer) 

    }, [onDone]) 

    return ( 
        <div className="splash">  
            <div className="splash-title">Joseph Linao</div> 
            <div className="splash-subtitle">Software Developer</div> 
            <div className="splash-bar">  
            <div className="splash-bar-fill"/>
            </div> 
        </div>
    ) 
}