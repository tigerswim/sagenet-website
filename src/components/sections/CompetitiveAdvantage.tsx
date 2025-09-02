import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const Section = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.navy[900]} 0%, ${props => props.theme.colors.navy[800]} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} 0;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Headline = styled.h2`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
`;

const Subtext = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[200]};
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto ${props => props.theme.spacing.xl};
`;

const AdvantageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const AdvantageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  backdrop-filter: blur(10px);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.lg};

  svg {
    width: 30px;
    height: 30px;
    color: ${props => props.theme.colors.white};
  }
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: 0;
`;

const StatHighlight = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  color: ${props => props.theme.colors.secondary};
  margin: ${props => props.theme.spacing.md} 0;
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[200]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray[300]};

  &::before {
    content: '✓';
    display: inline-block;
    width: 20px;
    height: 20px;
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: ${props => props.theme.fontSizes.sm};
    font-weight: bold;
    margin-right: ${props => props.theme.spacing.md};
    flex-shrink: 0;
  }
`;

const CTASection = styled(motion.div)`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const CompetitiveAdvantage: React.FC = () => {
  return (
    <Section>
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Headline>Gain First-Mover Advantage</Headline>
          <Subtext>
            While competitors rely on outdated static signage, you can capture market share with 
            proven digital solutions that deliver measurable results and contactless customer experiences.
          </Subtext>
        </SectionHeader>

        <AdvantageGrid>
          <AdvantageCard
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CardHeader>
              <IconWrapper>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H11a2 2 0 01-2-2z" />
                </svg>
              </IconWrapper>
              <CardTitle>Market Opportunity</CardTitle>
            </CardHeader>
            <StatHighlight>80.7%</StatHighlight>
            <CardDescription>
              of competitors haven't adopted digital drive-thru boards, creating a massive 
              first-mover advantage for early adopters.
            </CardDescription>
            <FeatureList>
              <FeatureItem>Capture market share before competitors catch up</FeatureItem>
              <FeatureItem>Differentiate with modern customer experience</FeatureItem>
              <FeatureItem>Build customer loyalty through innovation</FeatureItem>
              <FeatureItem>Establish technology leadership in your market</FeatureItem>
            </FeatureList>
          </AdvantageCard>

          <AdvantageCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CardHeader>
              <IconWrapper>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </IconWrapper>
              <CardTitle>COVID-19 Response</CardTitle>
            </CardHeader>
            <StatHighlight>100%</StatHighlight>
            <CardDescription>
              contactless ordering and payment capabilities that modern consumers expect, 
              with remote content management for safety.
            </CardDescription>
            <FeatureList>
              <FeatureItem>Pump-side ordering eliminates store entry</FeatureItem>
              <FeatureItem>Touchless payment integration</FeatureItem>
              <FeatureItem>Remote menu updates without staff exposure</FeatureItem>
              <FeatureItem>Health & safety messaging capabilities</FeatureItem>
            </FeatureList>
          </AdvantageCard>
        </AdvantageGrid>

        <CTASection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => {
              const calculatorElement = document.getElementById('roi-calculator');
              if (calculatorElement) {
                calculatorElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Calculate Your Competitive ROI
          </Button>
        </CTASection>
      </Container>
    </Section>
  );
};

export default CompetitiveAdvantage;