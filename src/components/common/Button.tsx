import React from 'react';
import styled from 'styled-components';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  as?: React.ElementType;
  to?: string;
  style?: React.CSSProperties;
  className?: string;
}

const StyledButton = styled(motion.button)<Omit<ButtonProps, 'as' | 'to'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
          font-size: ${props.theme.fontSizes.sm};
        `;
      case 'lg':
        return `
          padding: ${props.theme.spacing.md} ${props.theme.spacing.xl};
          font-size: ${props.theme.fontSizes.lg};
        `;
      default: // md
        return `
          padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
          font-size: ${props.theme.fontSizes.md};
        `;
    }
  }}
  
  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'outline':
        return `
          background: transparent;
          color: ${props.theme.colors.primary};
          border: 2px solid ${props.theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${props.theme.colors.primary};
            color: ${props.theme.colors.white};
          }
        `;
      case 'secondary':
        return `
          background: ${props.theme.colors.gray[200]};
          color: ${props.theme.colors.gray[800]};
          
          &:hover:not(:disabled) {
            background: ${props.theme.colors.gray[300]};
          }
        `;
      default: // primary
        return `
          background: ${props.theme.colors.primary};
          color: ${props.theme.colors.white};
          
          &:hover:not(:disabled) {
            background: ${props.theme.colors.navy[700]};
          }
        `;
    }
  }}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Focus state */
  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  as,
  to,
  ...props
}) => {
  return (
    <StyledButton
      as={as}
      onClick={onClick}
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      to={to}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
