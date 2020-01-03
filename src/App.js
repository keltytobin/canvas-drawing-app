import React, {useState, useEffect, useRef} from 'react';
import draw from "./Draw"
//===== GLOBAL VARS ========== GLOBAL VARS ========== GLOBAL VARS ========== GLOBAL VARS =====

// const testStroke1 = [{x: 10, y: 10}, {x:400, y:100}]
// const testStroke2 = [{x: 10, y: 400}, {x:400, y:10}]
// const testStroke3 = [{x: 0, y: 0}, {x:100, y:100}]
// const testStrokes = [testStroke1, testStroke2]

//===== HELPER FUNCTIONS ========== HELPER FUNCTIONS ========== HELPER FUNCTIONS ======


//====== MAIN APP =========== MAIN APP =========== MAIN APP =========== MAIN APP =======
function App(){
  const [locations, setLocations] = useState([]);
  const [strokePile, setStrokePile] = useState([]);
  const canvasRef = useRef(null);
  const undoBuffer = [];
  const [isPainting, setIsPainting] = useState(false)

  const ctxRef = useRef(null);

  useEffect(()=>{
    console.log('fuk')
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext('2d');
  }, [])

  useEffect(()=>{
    ctxRef.current.clearRect (0, 0, window.innerWidth, window.innerHeight);
    locations.forEach(location => draw(ctxRef.current, location));

    strokePile.forEach((stroke) => {
      stroke.forEach((point) => draw(ctxRef.current, point))
    });

  },[locations, strokePile]);


  function handleMouseMove(e){
    if(isPainting){
      const newLocation = { x: e.clientX, y: e.clientY };
      //setLocations([...locations, newLocation]);
      const lastStroke = strokePile[strokePile.length - 1]
      const newLastStroke = [...lastStroke, newLocation]
      const newStrokePile = [...strokePile]
      
      newStrokePile[newStrokePile.length-1] = newLastStroke;

      setStrokePile(newStrokePile)

    }
  }

  function handleClear () {
    setLocations([]);
    setStrokePile([]);
  }  

  function handleUndo (){
    //undoBuffer.push(locations.slice);
    setLocations(locations.slice(0, -1));
    setStrokePile(strokePile.slice(0, -1))

  }

  function handleRedo (){
    console.log(undoBuffer);
  }


  function startPainting(){
    setIsPainting(true)
    const newStroke = []
    setStrokePile([...strokePile, newStroke])
  }
  function stopPainting(){
    setIsPainting(false)
  }

  //console.log(locations);

  return(
    <>
      <button onClick={handleClear}>
        Clear
      </button>
      <button onClick={handleUndo}>
        Undo
      </button>
      <button onClick={handleRedo}>
        Redo
      </button>
      <canvas
        ref = {canvasRef}
        width = {window.innerWidth}
        height = {window.innerHeight}
        //onClick = {handleCanvasClick}
        onMouseDown = {startPainting}
        onMouseUp = {stopPainting}
        onMouseMove = {handleMouseMove}
      />
    </>
  )
};

export default App
