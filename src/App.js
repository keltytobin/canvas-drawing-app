import React from 'react';
//===== GLOBAL VARS ========== GLOBAL VARS ========== GLOBAL VARS ========== GLOBAL VARS =====
const blockPath = new Path2D();
blockPath.rect(10,10,100,100);
const SCALE = 0.3;
const OFFSET = 80;


//===== HELPER FUNCTIONS ========== HELPER FUNCTIONS ========== HELPER FUNCTIONS ======
function draw(ctx, location){
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.fill(blockPath);
  ctx.restore();
};

//====== MAIN APP =========== MAIN APP =========== MAIN APP =========== MAIN APP =======
function App(){
  const [locations, setLocations] = React.useState([]);
  const canvasRef = React.useRef(null);

  React.useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect (0, 0, window.innerWidth, window.innerHeight);
    locations.forEach(location => draw(ctx, location));
  });

  function handleCanvasClick(e){
    const newLocation = { x: e.clientX, y: e.clientY };
    setLocations([...locations, newLocation]);
  }

  function handleClear () {
    setLocations([]);
  }  

  console.log(locations);

  return(
    <>
      <button onClick={handleClear}>
        Clear
      </button>
      <canvas
        ref = {canvasRef}
        width = {window.innerWidth}
        height = {window.innerHeight}
        onClick = {handleCanvasClick}
      />
    </>
  )
};

export default App
