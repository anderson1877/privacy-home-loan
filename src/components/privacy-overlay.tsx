import { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface PrivacyOverlayProps {
  children: React.ReactNode;
  className?: string;
  revealDuration?: number;
}

export const PrivacyOverlay = ({ 
  children, 
  className,
  revealDuration = 3000 
}: PrivacyOverlayProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => setIsRevealed(false), revealDuration);
  };

  return (
    <div className={cn("relative group", className)}>
      <div className={cn(
        "transition-all duration-300",
        isRevealed ? "blur-none" : "blur-sm"
      )}>
        {children}
      </div>
      
      {!isRevealed && (
        <div className="absolute inset-0 bg-gradient-privacy backdrop-blur-light flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReveal}
            className="bg-card/80 hover:bg-card/90 shadow-privacy backdrop-blur-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Reveal
          </Button>
        </div>
      )}
      
      <div className="absolute top-2 right-2">
        <Shield className="w-4 h-4 text-secondary opacity-60" />
      </div>
    </div>
  );
};