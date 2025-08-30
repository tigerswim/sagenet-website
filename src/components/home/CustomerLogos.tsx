import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const LogosSection = styled.section`
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing['3xl']} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const LogosContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  
  &:hover .logos-track {
    animation-play-state: paused;
  }
`;

const LogosTrack = styled.div`
  display: inline-flex;
  animation: ${scroll} 30s linear infinite;
  gap: ${props => props.theme.spacing['3xl']};
  padding: ${props => props.theme.spacing.lg} 0;
`;

const LogoItem = styled(motion.div)`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  min-width: 120px;
  padding: 0 ${props => props.theme.spacing.lg};
  
  img {
    max-height: 40px;
    max-width: 100px;
    object-fit: contain;
    filter: grayscale(100%) opacity(0.7);
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%) opacity(1);
  }
`;

// Mock logo data - in production, these would be actual logo URLs
const customerLogos = [
  { name: 'T-Mobile', logoUrl: 'https://via.placeholder.com/120x40/E20074/ffffff?text=T-Mobile' },
  { name: 'Arby\'s', logoUrl: 'https://via.placeholder.com/120x40/B91C1C/ffffff?text=Arby%27s' },
  { name: 'Dollar General', logoUrl: 'https://via.placeholder.com/120x40/FCD34D/000000?text=Dollar+General' },
  { name: 'Patagonia', logoUrl: 'https://via.placeholder.com/120x40/1F2937/ffffff?text=Patagonia' },
  { name: 'Cumberland Farms', logoUrl: 'https://via.placeholder.com/120x40/059669/ffffff?text=Cumberland+Farms' },
  { name: 'Noodles & Co', logoUrl: 'https://via.placeholder.com/120x40/DC2626/ffffff?text=Noodles+%26+Co' },
  { name: 'Sunoco', logoUrl: 'https://via.placeholder.com/120x40/1D4ED8/ffffff?text=Sunoco' },
  { name: 'Phillips 66', logoUrl: 'https://via.placeholder.com/120x40/DC2626/ffffff?text=Phillips+66' },
];

const CustomerLogos: React.FC = () => {
  // Double the logos for seamless scrolling
  const duplicatedLogos = [...customerLogos, ...customerLogos];

  return (
    <LogosSection>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>
            Trusted by Household Names Across Retail
          </SectionTitle>
        </motion.div>
        
        <LogosContainer>
          <LogosTrack className="logos-track">
            {duplicatedLogos.map((logo, index) => (
              <LogoItem
                key={`${logo.name}-${index}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={logo.logoUrl} alt={`${logo.name} logo`} />
              </LogoItem>
            ))}
          </LogosTrack>
        </LogosContainer>
      </div>
    </LogosSection>
  );
};

export default CustomerLogos;