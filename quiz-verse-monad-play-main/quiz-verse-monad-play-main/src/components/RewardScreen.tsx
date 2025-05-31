
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface RewardScreenProps {
  reward: string;
  transactionHash: string;
  onContinue: () => void;
}

const RewardScreen = ({ reward, transactionHash, onContinue }: RewardScreenProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <Card className="glassmorphism p-8 max-w-md w-full mx-4 text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse-violet">
            <Check className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full mx-auto animate-ping opacity-20"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-green-400">Correct!</h2>
          <p className="text-white text-lg">You earned</p>
          <div className="text-4xl font-bold text-violet-400">{reward} MON</div>
        </div>

        <div className="space-y-2">
          <p className="text-violet-300 text-sm">Transaction Hash:</p>
          <p className="text-xs text-gray-400 break-all bg-black/30 p-2 rounded">
            {transactionHash}
          </p>
        </div>

        <Button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Continue Playing
        </Button>
      </Card>
    </div>
  );
};

export default RewardScreen;
