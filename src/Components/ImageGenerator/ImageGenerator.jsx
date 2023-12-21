import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assests/default_image.svg';

 const ImageGenerator = () => {
    const [image_url, setImage_url]  = useState("/");
    let inputRef = useRef(null);
    let api=process.env.REACT_APP_OPENAI_KEY;
    const [loading,setLoading] = useState(false);
    const imageGenerator = async () =>{
        if(inputRef.current.value === ""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:  `Bearer ${api}`,
                    "User-Agent":"Chrome", 
                },
                body:JSON.stringify({
                    "model": "dall-e-3",
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    "size": "1024x1024"
                }),
            }
            );
            let data = await response.json();
            console.log(data);
            let data_array= data.data;
            setImage_url(data_array[0].url);
            setLoading(false);
    }
  return (
    <div className = "ai-image-generator">

    <div className="header">Ai Image <span>generator</span></div>
    <div className="img-loading">
        <div className="image">
            <img src={image_url==="/"?default_image:image_url} alt="image" />
        </div>
        <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}>
                <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
        </div>
    </div>

    <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder="Describe what you want To see.." />
        <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
    </div>
    
    </div>
  )
}

export default ImageGenerator;
