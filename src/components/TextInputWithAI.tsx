import { useState } from 'react';
import { Sparkles, Check, RotateCcw } from 'lucide-react';

interface TextInputWithAIProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  showAiButton?: boolean;
  onAiGenerate?: () => void;
  showHelpLink?: boolean;
  onHelpClick?: () => void;
}

export function TextInputWithAI({
  value,
  onChange,
  placeholder = '',
  rows = 3,
  showAiButton = false,
  onAiGenerate,
  showHelpLink = false,
  onHelpClick
}: TextInputWithAIProps) {
  const [isThinking, setIsThinking] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [originalValue, setOriginalValue] = useState('');
  const [generatedValue, setGeneratedValue] = useState('');

  const handleHelpClick = () => {
    // Store original value for revert
    setOriginalValue(value);
    
    // Start thinking state
    setIsThinking(true);
    
    // Call the parent's onHelpClick if provided
    if (onHelpClick) {
      onHelpClick();
    }
    
    // Simulate AI generation after 1 second
    setTimeout(() => {
      const mockGeneratedText = value 
        ? `${value}\n\nEnhanced by AI: This is an improved version with more details and clarity.`
        : 'AI generated abstract: A concise summary that captures the essence of the content.';
      
      setGeneratedValue(mockGeneratedText);
      onChange(mockGeneratedText);
      
      setIsThinking(false);
      setShowActions(true);
    }, 1000);
  };

  const handleValidate = () => {
    // Keep the generated value
    setShowActions(false);
    setOriginalValue('');
    setGeneratedValue('');
  };

  const handleRevert = () => {
    // Revert to original value
    onChange(originalValue);
    setShowActions(false);
    setOriginalValue('');
    setGeneratedValue('');
  };

  const isGenerated = showActions && value === generatedValue;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
          isGenerated ? 'bg-purple-50 border-purple-200' : ''
        }`}
        placeholder={placeholder}
        rows={rows}
        style={
          isGenerated
            ? {
                textDecoration: 'underline',
                textDecorationColor: 'rgba(139, 92, 246, 0.5)',
                textUnderlineOffset: '2px',
              }
            : {}
        }
      />
      
      {/* AI Help Button */}
      {showHelpLink && !isThinking && !showActions && (
        <button
          onClick={handleHelpClick}
          className="absolute left-4 bottom-3 text-sm flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#8b5cf6' }} />
          Help me generate or improve an abstract
        </button>
      )}

      {/* Thinking State */}
      {isThinking && (
        <div className="absolute left-4 bottom-3 flex items-center gap-1.5 text-sm">
          <Sparkles 
            className="w-3.5 h-3.5 animate-spin" 
            style={{ color: '#8b5cf6' }} 
          />
          <span
            style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Thinking...
          </span>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="absolute left-4 bottom-3 flex items-center gap-2">
          <button
            onClick={handleValidate}
            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded transition-colors flex items-center gap-1.5 text-sm"
          >
            <Check className="w-3.5 h-3.5" />
            Validate
          </button>
          <button
            onClick={handleRevert}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center gap-1.5 text-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Revert
          </button>
        </div>
      )}
    </div>
  );
}
