import React from 'react';

interface RichTextProps {
  text: string;
  className?: string;
}

export function RichText({ text, className }: RichTextProps) {
  const parseText = (input: string): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    
    // Split by newlines first to handle line breaks
    const lines = input.split('\n');
    
    lines.forEach((line, lineIndex) => {
      // Handle regular line breaks - only add br if previous line had content
      if (lineIndex > 0 && lines[lineIndex - 1] !== '[space]') {
        result.push(<br key={`br-${lineIndex}`} />);
      }
      
      // Handle [space] tag for extra spacing
      if (line === '[space]') {
        result.push(<div key={`space-${lineIndex}`} style={{ height: '1em' }} />);
        return;
      }
      
      if (!line) return;
      
      // Parse tags within each line
      const parts: React.ReactNode[] = [];
      let currentIndex = 0;
      
      // Updated regex to handle [tag]content[/tag] format
      const tagRegex = /\[([^\]]+)\]([^[]*?)\[\/\1\]/g;
      
      let match;
      while ((match = tagRegex.exec(line)) !== null) {
        // Add any text before the match
        if (match.index > currentIndex) {
          parts.push(line.substring(currentIndex, match.index));
        }
        
        const tag = match[1];
        const content = match[2];
        
        switch (tag) {
          case 'bold':
            parts.push(<strong key={`${lineIndex}-${match.index}`} className="manifesto-bold">{content}</strong>);
            break;
          case 'small':
            parts.push(<span key={`${lineIndex}-${match.index}`} className="manifesto-small">{content}</span>);
            break;
          case 'gray':
            parts.push(<span key={`${lineIndex}-${match.index}`} className="manifesto-gray">{content}</span>);
            break;
          case 'section':
            parts.push(<div key={`${lineIndex}-${match.index}`} className="manifesto-value-section">{content}</div>);
            break;
          default:
            parts.push(content);
        }
        
        currentIndex = match.index + match[0].length;
      }
      
      // Add any remaining text after the last match
      if (currentIndex < line.length) {
        parts.push(line.substring(currentIndex));
      }
      
      // If no matches were found, just add the whole line
      if (parts.length === 0) {
        parts.push(line);
      }
      
      result.push(...parts);
    });
    
    return result;
  };
  
  return (
    <div className={className}>
      {parseText(text)}
    </div>
  );
}