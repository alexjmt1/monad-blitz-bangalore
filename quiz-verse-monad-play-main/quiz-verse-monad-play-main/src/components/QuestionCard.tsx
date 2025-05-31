
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Timer } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  type: 'image' | 'audio' | 'text';
  content: string;
  correctAnswer: string;
  hint?: string;
}

interface QuestionCardProps {
  question: Question;
  onAnswerSubmit: (answer: string, isCorrect: boolean) => void;
  onTimeUp: () => void;
  gasFee: string;
}

const QuestionCard = ({ question, onAnswerSubmit, onTimeUp, gasFee }: QuestionCardProps) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  useEffect(() => {
    setTimeLeft(20);
    setUserAnswer('');
    setIsSubmitting(false);
  }, [question.id]);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate answer checking
    setTimeout(() => {
      const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
      onAnswerSubmit(userAnswer, isCorrect);
      setIsSubmitting(false);
    }, 1500);
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-green-400';
    if (timeLeft > 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      <Card className="glassmorphism p-8 space-y-6">
        {/* Category and Timer */}
        <div className="flex justify-between items-center">
          <div className="px-4 py-2 bg-violet-600 rounded-full text-white font-medium">
            {question.category}
          </div>
          <div className={`flex items-center space-x-2 ${getTimerColor()} ${timeLeft <= 5 ? 'animate-timer-pulse' : ''}`}>
            <Timer className="w-5 h-5" />
            <span className="text-2xl font-bold">{timeLeft}s</span>
          </div>
        </div>

        {/* Question Content */}
        <div className="text-center space-y-4">
          {question.type === 'image' && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={question.content}
                alt="Quiz question"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          
          {question.type === 'text' && (
            <h2 className="text-2xl font-bold text-white">{question.content}</h2>
          )}

          {question.hint && (
            <p className="text-violet-300 italic">Hint: {question.hint}</p>
          )}
        </div>

        {/* Answer Input */}
        <div className="space-y-4">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="bg-black/50 border-violet-500 text-white placeholder-violet-300 text-lg p-4 rounded-lg focus:ring-2 focus:ring-violet-400"
            onKeyPress={(e) => e.key === 'Enter' && !isSubmitting && handleSubmit()}
            disabled={timeLeft === 0 || isSubmitting}
          />
          
          {/* Gas Fee Display */}
          <div className="text-center text-sm text-violet-300">
            Estimated gas fee: <span className="text-white font-semibold">{gasFee} MON</span>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!userAnswer.trim() || timeLeft === 0 || isSubmitting}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Answer'
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuestionCard;
