import { useEffect, useState } from 'react';

interface InteractiveImageProps {
  imageUrl: string;
  initialPercentage: number;
}

const InteractiveImage: React.FC<InteractiveImageProps> = ({ imageUrl, initialPercentage }) => {
  const [percentage, setPercentage] = useState(initialPercentage);

  useEffect(() => {
    updateImageStyles();
  }, [percentage]);

  const updateImageStyles = () => {
    const imageElement = document.querySelector('.image') as HTMLElement;
    if (imageElement) {
      const containerWidth = imageElement.offsetWidth;
      const clipPosition = containerWidth * percentage / 100;
      imageElement.style.clipPath = `inset(0 ${containerWidth - clipPosition}px 0 0)`;
      imageElement.style.filter = `grayscale(${100 - percentage}%)`;
    }
  };

  return (
    <div className="relative overflow-hidden w-128 h-72"> {/* Tailwind classes for width and height */}
      <div className="image w-full h-full absolute bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <input type="range" min="0" max="100" value={percentage} onChange={(e) => setPercentage(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer" />
    </div>
  );
};

export default InteractiveImage;
