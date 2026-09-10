import React, { useRef, useEffect, useState } from 'react';
import './3d-carousel.css';

const ThreeDCarousel = ({ 
  images = [], 
  radius = 250, 
  cardW = 200, 
  cardH = 280,
  autoRotate = true,
  rotationSpeed = 0.05
}) => {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const requestRef = useRef();

  // Animation loop
  useEffect(() => {
    const animate = () => {
      // Auto-rotation when idle (faster on hover)
      if (autoRotate && !isDragging && Date.now() - lastInteraction > 2000) {
        const speed = isHovered ? rotationSpeed * 2 : rotationSpeed;
        setRotation(prev => prev + speed);
      }

      // Apply velocity and friction
      if (Math.abs(velocity) > 0.001) {
        setRotation(prev => prev + velocity);
        setVelocity(prev => prev * 0.95);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging, velocity, lastInteraction, autoRotate, rotationSpeed, isHovered]);

  // Drag handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setLastX(clientX);
    setVelocity(0);
    setLastInteraction(Date.now());
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    
    const delta = clientX - lastX;
    const rotationDelta = delta * 0.5;
    
    setRotation(prev => prev + rotationDelta);
    setVelocity(rotationDelta);
    setLastX(clientX);
    setLastInteraction(Date.now());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setLastInteraction(Date.now());
  };

  // Mouse events
  const onMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientX);
    }
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (isDragging) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  if (!images || images.length === 0) {
    return <div className="carousel-error">No images provided</div>;
  }

  const angleStep = 360 / images.length;

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${isDragging ? 'dragging' : ''}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="carousel-scene"
        style={{
          perspective: '1500px',
          perspectiveOrigin: 'center center',
        }}
      >
        <div
          ref={wheelRef}
          className="carousel-wheel"
          style={{
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {images.map((src, idx) => {
            const angle = idx * angleStep;
            return (
              <div
                key={idx}
                className="carousel-item"
                style={{
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div className="carousel-card">
                  <img
                    src={src}
                    alt={`Slide ${idx + 1}`}
                    draggable="false"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
