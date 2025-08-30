import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const ROISection = styled.section`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['4xl']} 0;
`;

const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ContentSection = styled(motion.div)`
  max-width: 500px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 100%;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
`;

const SectionDescription = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const BenefitsList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0 0 ${props => props.theme.spacing.xl} 0;
`;

const BenefitItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.gray[700]};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  margin-right: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::after {
    content: '✓';
    color: ${props => props.theme.colors.white};
    font-size: 12px;
    font-weight: bold;
  }
`;

const CTASection = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const VisualSection = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.navy[700]} 100%);
  border-radius: ${props => props.theme.borderRadius['2xl']};
  padding: ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.white};
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const ROIHighlight = styled.div`
  font-size: ${props => props.theme.fontSizes['6xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ROILabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  opacity: 0.9;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ROIStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const ROIStat = styled.div`
  text-align: center;
`;

const ROIStatNumber = styled.div`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ROIStatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.8;
`;

const ROIPreview: React.FC = () => {
  const benefits = [
    'Reduce network costs by up to 40%',
    'Improve application performance by 60%',
    'Eliminate downtime with 99.9% uptime guarantee',
    'Scale infrastructure without complexity'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <ROISection>
      <Container>
        <ContentGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContentSection>
            <SectionTitle variants={itemVariants}>
              Maximize Your ROI with Enterprise Solutions
            </SectionTitle>
            <SectionDescription variants={itemVariants}>
              Our enterprise-grade infrastructure delivers measurable business value through cost optimization, performance improvements, and operational efficiency.
            </SectionDescription>
            
            <BenefitsList variants={itemVariants}>
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} variants={itemVariants}>
                  <CheckIcon />
                  {benefit}
                </BenefitItem>
              ))}
            </BenefitsList>

            <CTASection variants={itemVariants}>
              <Button size="lg" variant="primary">
                Calculate Your ROI
              </Button>
              <Button size="lg" variant="outline">
                View Case Studies
              </Button>
            </CTASection>
          </ContentSection>

          <VisualSection variants={visualVariants}>
            <ROIHighlight>40%</ROIHighlight>
            <ROILabel>Average Cost Reduction</ROILabel>
            <ROIStats>
              <ROIStat>
                <ROIStatNumber>60%</ROIStatNumber>
                <ROIStatLabel>Performance Boost</ROIStatLabel>
              </ROIStat>
              <ROIStat>
                <ROIStatNumber>99.9%</ROIStatNumber>
                <ROIStatLabel>Uptime</ROIStatLabel>
              </ROIStat>
            </ROIStats>
          </VisualSection>
        </ContentGrid>
      </Container>
    </ROISection>
  );
};

export default ROIPreview;
