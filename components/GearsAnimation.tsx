import React from 'react';

interface GearProps {
  teeth: number;
  radius: number;
  spokes: number;
  color: string;
  sideColor: string;
  speed: number;
  reverse?: boolean;
  className?: string;
  rotationOffset?: number;
}

const GearShape: React.FC<GearProps> = ({ 
  teeth, 
  radius, 
  spokes, 
  color, 
  sideColor, 
  speed, 
  reverse, 
  className,
  rotationOffset = 0
}) => {
  // Constants for gear geometry
  const innerRadius = radius * 0.85; // Root of teeth
  const holeRadius = radius * 0.15; // Axle hole
  const windowOuterRadius = radius * 0.65; // Outer rim for spokes
  const windowInnerRadius = radius * 0.25; // Inner hub for spokes

  // Generate Outer Teeth Path (Trapezoidal)
  let d = "";
  const angleStep = (Math.PI * 2) / teeth;
  const toothWidthRatio = 0.45; // Tooth is ~45% of the pitch
  
  for (let i = 0; i < teeth; i++) {
    const angle = i * angleStep;
    
    // 4 points of a trapezoidal tooth
    // Base Left
    const r1 = innerRadius;
    const a1 = angle;
    
    // Tip Left
    const r2 = radius;
    const a2 = angle + angleStep * 0.15; // Slope up
    
    // Tip Right
    const r3 = radius;
    const a3 = angle + angleStep * (toothWidthRatio - 0.15); // Slope down starts
    
    // Base Right
    const r4 = innerRadius;
    const a4 = angle + angleStep * toothWidthRatio;

    const p1 = [Math.cos(a1) * r1, Math.sin(a1) * r1];
    const p2 = [Math.cos(a2) * r2, Math.sin(a2) * r2];
    const p3 = [Math.cos(a3) * r3, Math.sin(a3) * r3];
    const p4 = [Math.cos(a4) * r4, Math.sin(a4) * r4];
    
    if (i === 0) d += `M ${p1[0]},${p1[1]}`;
    else d += ` L ${p1[0]},${p1[1]}`;
    
    d += ` L ${p2[0]},${p2[1]} L ${p3[0]},${p3[1]} L ${p4[0]},${p4[1]}`;
    
    // Line to next tooth base is automatic in fill, but for stroke we need arc or line
    // We'll just line to next loop's start
  }
  d += " Z";

  // Generate Cutouts (Windows between spokes)
  if (spokes > 0) {
    const spokeWidthAngle = (Math.PI * 2) / spokes * 0.2; // Spoke thickness
    const windowAngle = ((Math.PI * 2) / spokes) - spokeWidthAngle;
    
    for (let i = 0; i < spokes; i++) {
      const startAngle = i * ((Math.PI * 2) / spokes) + spokeWidthAngle / 2;
      const endAngle = startAngle + windowAngle;
      
      const p1 = [Math.cos(startAngle) * windowInnerRadius, Math.sin(startAngle) * windowInnerRadius];
      const p2 = [Math.cos(endAngle) * windowInnerRadius, Math.sin(endAngle) * windowInnerRadius];
      const p3 = [Math.cos(endAngle) * windowOuterRadius, Math.sin(endAngle) * windowOuterRadius];
      const p4 = [Math.cos(startAngle) * windowOuterRadius, Math.sin(startAngle) * windowOuterRadius];
      
      d += ` M ${p1[0]},${p1[1]} L ${p4[0]},${p4[1]} L ${p3[0]},${p3[1]} L ${p2[0]},${p2[1]} Z`;
    }
  }

  // Generate Axle Hole
  const holePoints = 16;
  for (let i = 0; i < holePoints; i++) {
    const a = (i / holePoints) * Math.PI * 2;
    const x = Math.cos(a) * holeRadius;
    const y = Math.sin(a) * holeRadius;
    d += (i === 0 ? ` M ${x},${y}` : ` L ${x},${y}`);
  }
  d += " Z";

  return (
    <div 
      className={`absolute flex items-center justify-center ${className}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        transform: `translate(-50%, -50%)`, // Center anchor
      }}
    >
      <svg 
        viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`} 
        className="w-full h-full overflow-visible"
        style={{
          animation: `spin-${reverse ? 'rev' : 'fwd'} ${speed}s linear infinite`,
        }}
      >
        <style>
          {`
            @keyframes spin-fwd { from { transform: rotate(${rotationOffset}deg); } to { transform: rotate(${rotationOffset + 360}deg); } }
            @keyframes spin-rev { from { transform: rotate(${rotationOffset}deg); } to { transform: rotate(${rotationOffset - 360}deg); } }
          `}
        </style>
        
        {/* Extrusion (Side/Depth) - Shifted down-right */}
        <path 
          d={d} 
          fill={sideColor} 
          fillRule="evenodd"
          transform="translate(4, 4)"
        />
        
        {/* Top Face */}
        <path 
          d={d} 
          fill={color} 
          fillRule="evenodd"
          className="drop-shadow-sm"
        />
        
        {/* Inner Axle Decoration */}
        <circle cx="0" cy="0" r={radius * 0.08} fill={sideColor} transform="translate(4,4)" />
        <circle cx="0" cy="0" r={radius * 0.08} fill="#e5e5e5" />
      </svg>
    </div>
  );
};

export const GearsAnimation: React.FC = () => {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/5] flex items-center justify-center overflow-hidden">
       {/* 3D Scene Container */}
       <div 
         className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
         style={{ 
           transform: 'rotateX(40deg) rotateZ(-15deg) scale(0.9)', 
           transformStyle: 'preserve-3d',
         }}
       >
          {/* Base Plate (The brown/dark part in the reference) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            style={{ transform: 'translate(-50%, -50%) translateZ(-20px)' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
               <path 
                 d="M 10,20 L 90,10 L 95,80 L 50,95 L 5,70 Z" 
                 fill="#2a0a0a" 
                 stroke="#450a0a"
                 strokeWidth="2"
                 transform="translate(5, 5)"
               />
               <path 
                 d="M 10,20 L 90,10 L 95,80 L 50,95 L 5,70 Z" 
                 fill="#450a0a" 
               />
            </svg>
          </div>

          {/* 
            Gear Layout:
            1. Large Gear (Top Left)
            2. Medium Gear (Center, connecting)
            3. Large Gear (Bottom Right)
          */}

          {/* Gear 1: Large Top Left */}
          <GearShape 
            teeth={16} 
            radius={85} 
            spokes={5}
            color="#F3F4F6" 
            sideColor="#9CA3AF"
            speed={30} 
            className="top-[30%] left-[30%] z-10"
            rotationOffset={0}
          />

          {/* Gear 2: Small/Medium Connector */}
          <GearShape 
            teeth={10} 
            radius={55} 
            spokes={3}
            color="#D1D5DB" 
            sideColor="#6B7280"
            speed={30 * (16/10)} // Speed ratio based on teeth to sync
            reverse
            className="top-[55%] left-[55%] z-20"
            rotationOffset={15}
          />

          {/* Gear 3: Bottom Right */}
          <GearShape 
            teeth={16} 
            radius={85} 
            spokes={5}
            color="#F3F4F6" 
            sideColor="#9CA3AF"
            speed={30} 
            className="top-[80%] left-[80%] z-30"
            rotationOffset={10}
          />

          {/* Decorative Bolts on Plate */}
          <div className="absolute top-[10%] left-[10%] w-4 h-4 bg-red-900 rounded-full shadow-inner" style={{transform: 'translateZ(-10px)'}}></div>
          <div className="absolute bottom-[15%] left-[20%] w-4 h-4 bg-red-900 rounded-full shadow-inner" style={{transform: 'translateZ(-10px)'}}></div>
          <div className="absolute top-[20%] right-[10%] w-4 h-4 bg-red-900 rounded-full shadow-inner" style={{transform: 'translateZ(-10px)'}}></div>

       </div>
    </div>
  );
};