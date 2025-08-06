import DogePaw from './icons/DogePaw';
import Globe01 from './icons/Globe01';
import LightningFilled from './icons/LightningFilled';

export function IconExample() {
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Basic usage */}
      <DogePaw />
      
      {/* With custom size */}
      <Globe01 width={32} height={32} />
      
      {/* With custom color and size */}
      <LightningFilled 
        width={24} 
        height={24} 
        className="text-yellow-500" 
      />
    </div>
  );
} 