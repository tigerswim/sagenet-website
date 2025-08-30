import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import PersonaNavigation from './PersonaNavigation';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.navy[800]} 100%);
  color: ${props => props.theme.colors.white};
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80') center/cover;
  opacity: 0.3;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    opacity: 0.2;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary} 0%, rgba(30, 58, 138, 0.7) 100%);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 600px;
`;

const Headline = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['6xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  line-height: 1.1;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: ${props => props.theme.fontSizes['5xl']};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[200]};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  line-height: 1.6;
`;

const CTASection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const StatItem = styled.div`
  text-align: center;

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.white};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.gray[300]};
    margin: 0;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <HeroBackground />
      <div className="container">
        <ContentWrapper>
          <HeroContent>
            <Headline
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Infrastructure Meets Customer Experience
            </Headline>
            
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The only infrastructure partner built for multi-site retail. Scale both your 
              connectivity and digital experiences with proven expertise trusted by household names.
            </Subtitle>

            <CTASection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" variant="secondary">
                Calculate Your ROI
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </CTASection>

            <StatsGrid
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <StatItem>
                <h3>25+</h3>
                <p>Years Experience</p>
              </StatItem>
              <StatItem>
                <h3>50K+</h3>
                <p>Endpoints Managed</p>
              </StatItem>
              <StatItem>
                <h3>800+</h3>
                <p>Team Members</p>
              </StatItem>
            </StatsGrid>
          </HeroContent>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <PersonaNavigation />
          </motion.div>
        </ContentWrapper>
      </div>
    </HeroSection>
  );
};

export default Hero;