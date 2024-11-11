const ArrowRight = ({ width = 30, height = 30, color = '#000000' }) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <path
        d='M4 12H20M20 12L14 6M20 12L14 18'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowRight;
