import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MarketingROICalculator from '../components/calculators/MarketingROI';
import Button from '../components/common/Button';

const PageWrapper = styled.div`
  min-height: 80vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.secondary} 0%, #ea580c 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['4xl']} 0;
  text-align: center;
`;

const PageTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['5xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }
`;

const PageSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  opacity: 0.9;
`;

const ContentSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['4xl']};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;

  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[900]};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg} auto;

  svg {
    width: 30px;
    height: 30px;
    color: ${props => props.theme.colors.white};
  }
`;

const Marketing: React.FC = () => {
  const features = [
    {
      title: 'Drive Sales with Digital Menu Boards',
      description: 'Increase average order value by 15% with dynamic menu displays that promote high-margin items and limited-time offers.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Create Engaging Store Experiences',
      description: 'Transform your locations with interactive displays that guide customers, showcase products, and strengthen brand connections.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Ensure Brand Consistency',
      description: 'Maintain perfect brand standards across all locations with centralized content management and real-time updates.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <div className="container">
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Drive Sales with Digital Experiences
          </PageTitle>
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your retail locations into revenue-generating experiences that 
            customers love and your bottom line will thank you for.
          </PageSubtitle>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="outline">
              Schedule Marketing Demo
            </Button>
          </motion.div>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <IconWrapper>{feature.icon}</IconWrapper>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeatureGrid>

          <MarketingROICalculator />
        </div>
      </ContentSection>
    </PageWrapper>
  );
};

export default Marketing;