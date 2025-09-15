import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "./card";
import { Wallet } from "lucide-react";

export const WalletConnect = () => {
  return (
    <Card className="p-4 shadow-financial">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
          <Wallet className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <ConnectButton 
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </div>
    </Card>
  );
};