import { useRef, useEffect, useState } from 'react';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Sparkles, Check, RotateCcw } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showAiButton?: boolean;
  onAiGenerate?: () => void;
  showHelpLink?: boolean;
  onHelpClick?: () => void;
}

export function RichTextEditor({ value, onChange, placeholder, showAiButton = false, onAiGenerate, showHelpLink = false, onHelpClick }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [originalValue, setOriginalValue] = useState('');

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleHelpClick = () => {
    // Store original value for revert
    setOriginalValue(value);
    
    // Start thinking state
    setIsThinking(true);
    
    // Call the parent's onHelpClick if provided
    if (onHelpClick) {
      onHelpClick();
    }
    
    // Simulate AI generation after 3 seconds
    setTimeout(() => {
      const mockGeneratedText = '<p>This beautifully crafted point of interest offers visitors a unique experience combining historical significance with modern amenities. Located in a picturesque setting, it serves as a perfect destination for both casual tourists and dedicated explorers alike.</p><p>Visitors can enjoy various facilities and services designed to enhance their experience, making it an ideal stop along your journey through the region.</p>';
      
      setGeneratedText(mockGeneratedText);
      onChange(mockGeneratedText);
      setIsThinking(false);
      setShowActions(true);
    }, 3000);
  };

  const handleValidate = () => {
    // Keep the generated text
    setShowActions(false);
    setGeneratedText('');
    setOriginalValue('');
  };

  const handleRevert = () => {
    // Revert to original value
    onChange(originalValue);
    setShowActions(false);
    setGeneratedText('');
    setOriginalValue('');
  };

  const isEmpty = !value || value.trim() === '' || value === '<br>';

  return (
    <div className="border border-gray-300 rounded bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4 text-gray-700" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4 text-gray-700" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={insertLink}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Editor with Help Link */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="px-4 py-3 min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          data-placeholder={placeholder}
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}
        />
        {showHelpLink && onHelpClick && isEmpty && !isThinking && !showActions && (
          <button
            type="button"
            onClick={handleHelpClick}
            className="absolute left-4 bottom-3 transition-opacity hover:opacity-80 flex items-center gap-1.5 text-sm underline"
            style={{ 
              pointerEvents: 'auto',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#8b5cf6' }} />
            Help me generate or improve a description
          </button>
        )}
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
        {showActions && (
          <div className="absolute left-4 bottom-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleValidate}
              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded transition-colors flex items-center gap-1.5 text-sm"
              title="Validate"
            >
              <Check className="w-3.5 h-3.5" />
              Validate
            </button>
            <button
              type="button"
              onClick={handleRevert}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center gap-1.5 text-sm"
              title="Revert"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Revert
            </button>
          </div>
        )}
      </div>
    </div>
  );
}