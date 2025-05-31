import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import QuestionCard from '@/components/QuestionCard';
import RewardScreen from '@/components/RewardScreen';
import FailMessage from '@/components/FailMessage';
import GasEstimate from '@/components/GasEstimate';
import { sampleQuestions } from '@/data/questions';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [showFailMessage, setShowFailMessage] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const gasFee = '0.0025';
  const gasPrice = '20';
  const gasLimit = 125000;

  const handleWalletConnected = (address: string, walletBalance: string) => {
    setWalletAddress(address);
    setBalance(walletBalance);
    setIsWalletConnected(true);
  };

  const handleAnswerSubmit = (answer: string, isCorrect: boolean) => {
    if (isCorrect) {
      const reward = '5.0';
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      setScore(score + 1);
      setShowReward(true);
      
      // Update balance
      const newBalance = (parseFloat(balance) + parseFloat(reward)).toFixed(2);
      setBalance(newBalance);
      
      toast({
        title: "Correct Answer!",
        description: `You earned ${reward} MON`,
      });
    } else {
      setShowFailMessage(true);
    }
  };

  const handleTimeUp = () => {
    setShowFailMessage(true);
  };

  const handleContinue = () => {
    setShowReward(false);
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game finished
      toast({
        title: "Game Complete!",
        description: `Final score: ${score}/${sampleQuestions.length}`,
      });
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  const handleFailClose = () => {
    setShowFailMessage(false);
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game finished
      toast({
        title: "Game Complete!",
        description: `Final score: ${score}/${sampleQuestions.length}`,
      });
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen p-4 space-y-8 pb-24">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          Monad Quiz Game
        </h1>
        <p className="text-violet-300 text-lg">
          Test your knowledge and earn MON tokens on the testnet!
        </p>
      </div>

      {/* Wallet Connection - Now horizontal layout */}
      <div className="max-w-4xl mx-auto">
        <WalletConnect onWalletConnected={handleWalletConnected} />
      </div>

      {/* Game Interface */}
      {isWalletConnected && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Wallet Info and Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="glassmorphism p-4 rounded-lg">
              <div className="text-violet-300 text-sm">Wallet Balance</div>
              <div className="text-white font-bold text-lg">{balance} MON</div>
            </div>
            <div className="glassmorphism p-4 rounded-lg">
              <div className="text-violet-300 text-sm">Score</div>
              <div className="text-white font-bold text-lg">{score}/{sampleQuestions.length}</div>
            </div>
            <GasEstimate gasFee={gasFee} gasPrice={gasPrice} gasLimit={gasLimit} />
          </div>

          {/* Game Start or Question */}
          {!gameStarted ? (
            <div className="text-center">
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-xl"
              >
                Start Quiz Game
              </button>
            </div>
          ) : (
            <QuestionCard
              question={sampleQuestions[currentQuestionIndex]}
              onAnswerSubmit={handleAnswerSubmit}
              onTimeUp={handleTimeUp}
              gasFee={gasFee}
            />
          )}
        </div>
      )}

      {/* Reward Screen */}
      {showReward && (
        <RewardScreen
          reward="5.0"
          transactionHash={'0x' + Math.random().toString(16).substr(2, 64)}
          onContinue={handleContinue}
        />
      )}

      {/* Fail Message */}
      {showFailMessage && <FailMessage onClose={handleFailClose} />}
    </div>
  );
};

export default Index;
