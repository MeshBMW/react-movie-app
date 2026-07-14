function useRipple() {
  const handleClick = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,0.5); pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      animation: ripple 0.6s ease-out;
    `;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };
  return handleClick;
}
export default useRipple