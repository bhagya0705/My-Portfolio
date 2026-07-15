import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create a slight parallax effect by calculating distance from center
      const x = (e.clientX / window.innerWidth - 0.5) * 80;
      const y = (e.clientY / window.innerHeight - 0.5) * 80;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(139,92,246,0.15) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      
      {/* Interactive Glowing Orb 1 (Violet) */}
      <motion.div
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 40 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Interactive Glowing Orb 2 (Cyan) */}
      <motion.div
         animate={{
          x: mousePos.x * -1.5,
          y: mousePos.y * -1.5,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 35 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)",
          }}
        />
      </motion.div>
    </div>
  );
}
