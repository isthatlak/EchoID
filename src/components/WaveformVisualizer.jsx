import { useEffect, useRef } from 'react';

function WaveformVisualizer({ audioUrl }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!audioUrl) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyser;
    let source;
    let animationFrame;
    
    const audio = new Audio();
    audio.src = audioUrl;
    audio.crossOrigin = 'anonymous';
    
    const setupAudio = () => {
      source = audioContext.createMediaElementSource(audio);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const width = canvas.width;
      const height = canvas.height;
      
      context.clearRect(0, 0, width, height);
      
      const draw = () => {
        animationFrame = requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        context.fillStyle = 'rgb(240, 240, 240)';
        context.fillRect(0, 0, width, height);
        
        const barWidth = (width / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2;
          
          context.fillStyle = `rgb(${barHeight + 100}, 134, 244)`;
          context.fillRect(x, height - barHeight, barWidth, barHeight);
          
          x += barWidth + 1;
        }
      };
      
      audio.play();
      draw();
    };
    
    audio.addEventListener('canplaythrough', setupAudio);
    
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('canplaythrough', setupAudio);
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (source) {
        source.disconnect();
      }
      if (analyser) {
        analyser.disconnect();
      }
    };
  }, [audioUrl]);
  
  return (
    <div className="w-full flex justify-center">
      <canvas 
        ref={canvasRef} 
        width={320} 
        height={100} 
        className="w-full max-w-md rounded-lg"
      />
    </div>
  );
}

export default WaveformVisualizer;