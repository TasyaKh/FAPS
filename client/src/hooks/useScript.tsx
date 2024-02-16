import {useEffect} from 'react';
export const useScript  = (url:string, onLoad:()=>void = ()=>{}) => {
    useEffect(() => {
        loadScript(url, onLoad)
    }, [url]);
}

export const  loadScript = (url:string, onLoad:()=>void = ()=>{})=>{
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    // script.type="module"
    script.onload = () => {
        onLoad()
    }
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    }
}

