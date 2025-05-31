
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface FailMessageProps {
  onClose: () => void;
}

const FailMessage = ({ onClose }: FailMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[200px]">
        <X className="w-5 h-5" />
        <span className="font-semibold">sry failed</span>
        <button
          onClick={onClose}
          className="ml-auto hover:bg-red-700 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FailMessage;
