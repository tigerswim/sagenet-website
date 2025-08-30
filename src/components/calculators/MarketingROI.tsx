import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ROIInputs, ROIResults } from '../../types';
import Button from '../common/Button';

const CalculatorWrapper = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const CalculatorTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[700]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.md};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.navy[200]};
  }
`;

const ResultsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResultCard = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;

  h4 {
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.gray[600]};
    margin: 0;
  }
`;

const MarketingROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    locations: 25,
    avgTransactionSize: 12,
    currentConversionRate: 2.5,
  });

  const [results, setResults] = useState<ROIResults | null>(null);

  const calculateROI = () => {
    // Based on industry research: 15% average sales lift with digital signage
    const salesLift = 0.15;
    const monthlyTransactions = inputs.locations * 1000; // Estimate 1000 transactions per location per month
    const currentMonthlySales = monthlyTransactions * inputs.avgTransactionSize;
    const monthlySalesIncrease = currentMonthlySales * salesLift;
    const annualSalesIncrease = monthlySalesIncrease * 12;
    
    // Estimate implementation cost
    const estimatedCost = inputs.locations * 2000; // $2000 per location average
    const paybackPeriod = estimatedCost / monthlySalesIncrease;
    const roi = ((annualSalesIncrease - estimatedCost) / estimatedCost) * 100;

    setResults({
      salesLift: salesLift * 100,
      monthlySalesIncrease,
      annualSalesIncrease,
      paybackPeriod,
      roi
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleInputChange = (field: keyof ROIInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <CalculatorWrapper
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <CalculatorTitle>Sales Impact Estimator</CalculatorTitle>
      
      <FormGrid>
        <InputGroup>
          <Label htmlFor="locations">Number of Locations</Label>
          <Input
            id="locations"
            type="number"
            value={inputs.locations}
            onChange={(e) => handleInputChange('locations', e.target.value)}
            min="1"
            max="10000"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="avgTransaction">Average Transaction Size ($)</Label>
          <Input
            id="avgTransaction"
            type="number"
            value={inputs.avgTransactionSize}
            onChange={(e) => handleInputChange('avgTransactionSize', e.target.value)}
            min="1"
            step="0.01"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="conversionRate">Current Upsell Rate (%)</Label>
          <Input
            id="conversionRate"
            type="number"
            value={inputs.currentConversionRate}
            onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
            min="0"
            max="100"
            step="0.1"
          />
        </InputGroup>
      </FormGrid>

      {results && (
        <ResultsGrid
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ResultCard>
            <h4>{formatCurrency(results.monthlySalesIncrease)}</h4>
            <p>Monthly Sales Increase</p>
          </ResultCard>

          <ResultCard>
            <h4>{formatCurrency(results.annualSalesIncrease)}</h4>
            <p>Annual Sales Increase</p>
          </ResultCard>

          <ResultCard>
            <h4>{results.paybackPeriod.toFixed(1)} months</h4>
            <p>Payback Period</p>
          </ResultCard>

          <ResultCard>
            <h4>{results.roi.toFixed(0)}%</h4>
            <p>Annual ROI</p>
          </ResultCard>
        </ResultsGrid>
      )}

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Button size="lg" variant="primary">
          Get Detailed ROI Report
        </Button>
      </div>
    </CalculatorWrapper>
  );
};

export default MarketingROICalculator;