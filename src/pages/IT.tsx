import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const PageWrapper = styled.div`
  min-height: 80vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.navy[800]} 100%);
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
  background: ${props => props.theme.colors.primary};
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

const NOCSection = styled.section`
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing['4xl']} 0;
`;

const NOCGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const NOCContent = styled(motion.div)`
  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.gray[900]};
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.7;
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: ${props => props.theme.spacing.xl};

    li {
      display: flex;
      align-items: center;
      margin-bottom: ${props => props.theme.spacing.sm};
      font-size: ${props => props.theme.fontSizes.md};
      color: ${props => props.theme.colors.gray[700]};

      &::before {
        content: '✓';
        color: ${props => props.theme.colors.secondary};
        font-weight: bold;
        margin-right: ${props => props.theme.spacing.sm};
        font-size: ${props => props.theme.fontSizes.lg};
      }
    }
  }
`;

const NOCImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.xl};

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .secondary-image {
    position: absolute;
    bottom: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
    width: 200px;
    height: 120px;
    border-radius: ${props => props.theme.borderRadius.xl};
    border: 3px solid ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.shadows.lg};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
      width: 150px;
      height: 90px;
      bottom: ${props => props.theme.spacing.md};
      right: ${props => props.theme.spacing.md};
    }
  }
`;

const IT: React.FC = () => {
  const features = [
    {
      title: '99.9% Network Uptime',
      description: 'Enterprise-grade reliability with 24/7 monitoring, redundant connections, and proactive support that keeps your business running.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Scale from 50 to 5000+ Locations',
      description: 'Purpose-built infrastructure that grows with your business without added complexity or compromised performance.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      title: 'Vendor Consolidation',
      description: 'Simplify your operations with unified connectivity and digital experience management through a single trusted partner.',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
            Infrastructure That Scales with You
          </PageTitle>
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stop firefighting network issues. Get proactive, scalable infrastructure 
            that enables your business growth and supports Marketing's digital initiatives.
          </PageSubtitle>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="outline">
              Schedule IT Demo
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
        </div>
      </ContentSection>

      <NOCSection>
        <div className="container">
          <NOCGrid>
            <NOCContent
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Enterprise Operations Center</h2>
              <p>
                Our state-of-the-art Network Operations Center in Tulsa provides 24/7/365 monitoring 
                and support for your critical infrastructure. With dedicated engineers and advanced 
                monitoring systems, we ensure your business stays connected.
              </p>
              <ul>
                <li>24/7 proactive network monitoring</li>
                <li>Dedicated engineering support team</li>
                <li>Real-time performance analytics</li>
                <li>Automated failover systems</li>
                <li>Incident response in under 5 minutes</li>
                <li>Direct escalation to senior engineers</li>
              </ul>
              <Button variant="primary" size="lg">
                Schedule NOC Tour
              </Button>
            </NOCContent>

            <NOCImageWrapper
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="/images/NOC/Tulsa-NOC-med-web.jpg" 
                alt="SageNet Network Operations Center showing engineers monitoring network infrastructure with multiple screens displaying real-time data"
              />
              <div className="secondary-image">
                <img 
                  src="/images/NOC/NOC-with-people-talking.jpeg" 
                  alt="SageNet NOC team collaborating on network solutions and infrastructure planning"
                />
              </div>
            </NOCImageWrapper>
          </NOCGrid>
        </div>
      </NOCSection>
    </PageWrapper>
  );
};

export default IT;