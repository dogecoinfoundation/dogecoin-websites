import { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode; // Children are now optional
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode; // New prop for the icon
  iconPosition?: 'left' | 'right'; // New prop for icon position
}

export const Button = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
}: ButtonProps) => {
  // Determine the button's content type
  const hasIcon = icon != null;
  const hasChildren = children != null;

  const baseStyles =
    'rounded-full font-semibold transition-colors flex items-center justify-center cursor-pointer';

  // --- Style Definitions ---

  const variantStyles = {
    primary:
      'text-[var(--color-button-primary)] bg-[var(--background-button-primary)] hover:bg-[var(--background-button-primary-hover)]',
    secondary:
      'text-[var(--color-button-secondary)] bg-[var(--background-button-secondary)] hover:bg-[var(--background-button-secondary-hover)] border-2 border-[var(--border-button-secondary)]',
  };

  // Sizing for buttons with text or text+icon
  const defaultSizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };

  // Sizing for icon-only buttons (square dimensions)
  const iconOnlySizeStyles = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-14 w-14 text-xl',
  };

  // Spacing between icon and text
  const gapStyles = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2.5',
    xl: 'gap-3',
  };

  // --- Style Selection Logic ---

  // Select the correct sizing based on content
  const sizeClass =
    hasIcon && !hasChildren ? iconOnlySizeStyles[size] : defaultSizeStyles[size];

  // Select a gap only if both icon and text are present
  const gapClass = hasIcon && hasChildren ? gapStyles[size] : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeClass} ${variantStyles[variant]} ${gapClass} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;