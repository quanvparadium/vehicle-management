import { useState } from "react";

function Home() {
    const [currentFrame, setCurrentFrame] = useState(0);

    const nextFrame = () => {
        setCurrentFrame(prevFrame => prevFrame + 1);
    };

    const prevFrame = () => {
        setCurrentFrame(prevFrame => prevFrame - 1);
    };
    
    return ( 
        <div className="container">
            {/* <h1 style={{marginTop: '100px'}}>HOME PAGE</h1> */}
            <div className="frame-slider">
                <div className="frames">
                    <div className={`frame ${currentFrame === 0 ? 'active' : ''}`}>Frame 1 Content</div>
                    <div className={`frame ${currentFrame === 1 ? 'active' : ''}`}>Frame 2 Content</div>
                    <div className={`frame ${currentFrame === 2 ? 'active' : ''}`}>Frame 3 Content</div>
                </div>
                <button onClick={prevFrame} disabled={currentFrame === 0}>Prev</button>
                <button onClick={nextFrame} disabled={currentFrame === 2}>Next</button>
            </div>
        </div>
     );
}

export default Home;
