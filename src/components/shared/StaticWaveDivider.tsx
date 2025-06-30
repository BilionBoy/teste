interface StaticWaveDividerProps {
  className?: string;
  fillColor?: string;
  height?: number;
}

export function StaticWaveDivider({
  className = "",
  fillColor = "#0A3B91",
  height = 70,
}: StaticWaveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        className="absolute bottom-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: `${height}px`, width: "100%" }}
      >
        <path
          fill={fillColor}
          fillOpacity="1"
          d="M0,160L48,149.3C96,152,192,117,288,122.7C384,128,480,160,576,165.3C672,171,768,149,864,149.3C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
