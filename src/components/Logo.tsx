import logo from '@/assets/opengradient-logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
};

export function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <img 
      src={logo} 
      alt="OpenGradient" 
      className={`${sizes[size]} object-contain animate-float ${className}`}
    />
  );
}
