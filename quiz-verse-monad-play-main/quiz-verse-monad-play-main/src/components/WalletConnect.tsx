import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wallet, Send, Link, Layers, ChevronDown } from 'lucide-react';

interface WalletConnectProps {
  onWalletConnected: (address: string, balance: string) => void;
}

const WalletConnect = ({ onWalletConnected }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('Monad Testnet');
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = '0x742d35Cc7Bf58c2D1af3C6B8451A3F4b3E8F1234';
      const mockBalance = '156.78';
      
      setWalletAddress(mockAddress);
      setBalance(mockBalance);
      setIsConnected(true);
      setIsConnecting(false);
      
      onWalletConnected(mockAddress, mockBalance);
      
      toast({
        title: "Wallet Connected!",
        description: "Successfully connected to Monad testnet",
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Main Wallet Interface */}
      <Card className="glassmorphism p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Wallet Info */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-violet-800 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            
            <div className="space-y-1">
              {isConnected ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-violet-300">Address:</span>
                    <span className="text-white font-mono text-sm">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-violet-300">Balance:</span>
                    <span className="text-green-400 font-semibold text-sm">{balance} MON</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-400">Not Connected</div>
                  <div className="text-xs text-gray-500">Connect to view balance</div>
                </>
              )}
            </div>
          </div>

          {/* Right side - Connect Button */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-gray-300">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            
            <Button
              onClick={connectWallet}
              disabled={isConnecting || isConnected}
              className="bg-gradient-to-r from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isConnecting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : isConnected ? (
                'Connected'
              ) : (
                'Connect to Monad Testnet'
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Wallet Features - Only show when connected */}
      {isConnected && (
        <Card className="glassmorphism p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Send className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white">Send</span>
            </button>

            <button className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white">Receive</span>
            </button>

            <button className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Link className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white">Bridge</span>
            </button>

            <button className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white">NFTs</span>
            </button>
          </div>
        </Card>
      )}

      {/* Floating Status Bar - Only show when connected */}
      {isConnected && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Card className="glassmorphism p-3 mx-auto max-w-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white">Connected to Monad Quiz</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-white/10 transition-colors">
                  <span className="text-sm text-violet-300">{selectedNetwork}</span>
                  <ChevronDown className="w-4 h-4 text-violet-300" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
