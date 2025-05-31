
import { Card } from '@/components/ui/card';

interface GasEstimateProps {
  gasFee: string;
  gasPrice: string;
  gasLimit: number;
}

const GasEstimate = ({ gasFee, gasPrice, gasLimit }: GasEstimateProps) => {
  return (
    <Card className="glassmorphism p-4 w-full max-w-sm">
      <h3 className="text-sm font-semibold text-violet-300 mb-3">Gas Estimate</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Gas Price:</span>
          <span className="text-white">{gasPrice} gwei</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Gas Limit:</span>
          <span className="text-white">{gasLimit.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-violet-800 pt-2">
          <span className="text-violet-300 font-semibold">Total Fee:</span>
          <span className="text-green-400 font-bold">{gasFee} MON</span>
        </div>
      </div>
    </Card>
  );
};

export default GasEstimate;
