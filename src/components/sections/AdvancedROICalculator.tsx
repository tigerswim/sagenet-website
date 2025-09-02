import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { generateROIReport } from '../../utils/pdfGenerator';

const CalculatorSection = styled.section`
  background: ${props => props.theme.colors.navy[50]};
  padding: ${props => props.theme.spacing.xl} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.gray[900]};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const CalculatorCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  box-shadow: ${props => props.theme.shadows.xl};
  overflow: hidden;
`;

const ServiceToggle = styled.div`
  display: flex;
  background: ${props => props.theme.colors.gray[100]};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.active ? `
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.white};
    box-shadow: ${props.theme.shadows.md};
  ` : `
    background: transparent;
    color: ${props.theme.colors.gray[600]};
    
    &:hover {
      color: ${props.theme.colors.gray[900]};
      background: ${props.theme.colors.white};
    }
  `}
`;

const CalculatorContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const InputSection = styled(motion.div)`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.colors.secondary};
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[700]};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  .tooltip {
    color: ${props => props.theme.colors.primary};
    cursor: help;
    margin-left: ${props => props.theme.spacing.xs};
  }
`;

const SliderContainer = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  input[type="range"] {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: ${props => props.theme.colors.gray[200]};
    outline: none;
    appearance: none;
    
    &::-webkit-slider-thumb {
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
      box-shadow: ${props => props.theme.shadows.md};
      transition: all 0.2s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
    
    &::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
      border: none;
      box-shadow: ${props => props.theme.shadows.md};
    }
  }
`;

const SliderValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.sm};
  
  .value {
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}10;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.md};
  }
  
  .range {
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.gray[500]};
  }
`;

const SelectContainer = styled.div`
  position: relative;
  
  select {
    width: 100%;
    padding: ${props => props.theme.spacing.md};
    border: 2px solid ${props => props.theme.colors.gray[300]};
    border-radius: ${props => props.theme.borderRadius.lg};
    background: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.gray[900]};
    cursor: pointer;
    appearance: none;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
    }
  }
  
  &::after {
    content: '▼';
    position: absolute;
    right: ${props => props.theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.gray[500]};
    pointer-events: none;
  }
`;

const ResultsSection = styled(motion.div)`
  background: ${props => props.theme.colors.gray[50]};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  padding: ${props => props.theme.spacing['3xl']};
`;

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  h3 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.gray[900]};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled(motion.div)<{ variant: 'primary' | 'secondary' | 'accent' }>`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  border-left: 4px solid ${props => {
    const colorMap = {
      primary: props.theme.colors.primary,
      secondary: props.theme.colors.secondary,
      accent: props.theme.colors.accent
    };
    return colorMap[props.variant];
  }};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const MetricValue = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.xs};
  line-height: 1;
`;

const MetricLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.gray[600]};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const CTASection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;
  margin-top: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

type ServiceType = 'digital' | 'networking' | 'combined';
type IndustryType = 'qsr' | 'fastcasual' | 'retail' | 'healthcare' | 'hospitality' | 'other';

interface BusinessInputs {
  // Business Fundamentals
  locations: number;
  industryType: IndustryType;
  avgDailyTransactions: number;
  avgOrderValue: number;
  operatingHoursDaily: number;
  
  // Current State
  monthlyDowntime: number;
  annualPrintingCosts: number;
  menuUpdateHours: number;
  currentDigitalSolution: 'none' | 'basic' | 'advanced';
  
  // Digital Signage Specific
  menuComplexity: number;
  promotionalFrequency: 'weekly' | 'monthly' | 'quarterly' | 'seasonal';
  seasonalChanges: boolean;
  posIntegration: boolean;
  
  // Enhanced Digital Signage Variables
  driveThruPercentage: number; // Percentage of revenue from drive-thru (up to 70%)
  currentStaticSignCount: number; // Number of static signs to be replaced
  competitorDigitalAdoption: number; // Estimated % of competitors using digital signage
  dwellTimeMinutes: number; // Average customer dwell time (especially for c-stores)
}

interface ROIResults {
  // Revenue Impact
  additionalAnnualRevenue: number;
  orderValueIncrease: number;
  trafficIncrease: number;
  competitiveAdvantage: number;
  engagementLift: number;
  
  // Cost Savings
  printingSavings: number;
  operationalSavings: number;
  downtimeSavings: number;
  
  // Investment
  initialInvestment: number;
  annualServiceCosts: number;
  
  // Key Metrics
  totalAnnualBenefit: number;
  netAnnualBenefit: number;
  roiPercentage: number;
  paybackMonths: number;
}

const AdvancedROICalculator: React.FC = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('combined');
  const [inputs, setInputs] = useState<BusinessInputs>({
    locations: 25,
    industryType: 'qsr',
    avgDailyTransactions: 200,
    avgOrderValue: 12,
    operatingHoursDaily: 14,
    monthlyDowntime: 2,
    annualPrintingCosts: 2400,
    menuUpdateHours: 8,
    currentDigitalSolution: 'none',
    menuComplexity: 45,
    promotionalFrequency: 'monthly',
    seasonalChanges: true,
    posIntegration: false,
    driveThruPercentage: 70,
    currentStaticSignCount: 5,
    competitorDigitalAdoption: 19.3,
    dwellTimeMinutes: 3.5
  });

  const [results, setResults] = useState<ROIResults | null>(null);

  // Industry-specific multipliers with sources
  const industryData = useMemo(() => ({
    qsr: {
      orderValueMultiplier: 1.025, // 2.5% industry average (SageNet white paper)
      trafficMultiplier: 1.091, // 9.1% from digital menu studies (SageNet white paper)
      operationalEfficiency: 1.15,
      downtimeCostPerHour: 450, // Average QSR location revenue per hour
      engagementMultiplier: 4.0, // 400% more views than static signage (Intel Corp)
      salesLiftPotential: 1.33, // Up to 33% sales increase (Nielsen study)
      operationalSavings: 30000 // $30K annual savings per location (SageNet study)
    },
    fastcasual: {
      orderValueMultiplier: 1.035, // 3.5% higher due to premium positioning
      trafficMultiplier: 1.08,
      operationalEfficiency: 1.12,
      downtimeCostPerHour: 380,
      engagementMultiplier: 4.0,
      salesLiftPotential: 1.28,
      operationalSavings: 25000
    },
    retail: {
      orderValueMultiplier: 1.030,
      trafficMultiplier: 1.085,
      operationalEfficiency: 1.10,
      downtimeCostPerHour: 320,
      engagementMultiplier: 4.0,
      salesLiftPotential: 1.25,
      operationalSavings: 20000
    },
    healthcare: {
      orderValueMultiplier: 1.020,
      trafficMultiplier: 1.06,
      operationalEfficiency: 1.08,
      downtimeCostPerHour: 280,
      engagementMultiplier: 3.5,
      salesLiftPotential: 1.15,
      operationalSavings: 15000
    },
    hospitality: {
      orderValueMultiplier: 1.028,
      trafficMultiplier: 1.075,
      operationalEfficiency: 1.11,
      downtimeCostPerHour: 420,
      engagementMultiplier: 4.0,
      salesLiftPotential: 1.22,
      operationalSavings: 18000
    },
    other: {
      orderValueMultiplier: 1.025,
      trafficMultiplier: 1.075,
      operationalEfficiency: 1.10,
      downtimeCostPerHour: 350,
      engagementMultiplier: 3.8,
      salesLiftPotential: 1.20,
      operationalSavings: 18000
    }
  }), []);

  const calculateROI = useCallback((): ROIResults => {
    const industry = industryData[inputs.industryType];
    
    // Base calculations
    const baselineRevenue = inputs.locations * inputs.avgDailyTransactions * inputs.avgOrderValue * 365;
    
    // Digital signage benefits (if applicable) - Enhanced with white paper data
    const digitalBenefits = serviceType !== 'networking' ? {
      // Drive-thru focused benefits (70% of QSR revenue from drive-thru)
      orderValueIncrease: baselineRevenue * (industry.orderValueMultiplier - 1) * (inputs.driveThruPercentage / 100),
      trafficIncrease: baselineRevenue * (industry.trafficMultiplier - 1),
      
      // Operational cost savings from white paper
      printingSavings: inputs.locations * inputs.annualPrintingCosts,
      operationalSavings: inputs.locations * industry.operationalSavings, // $30K per location from study
      
      // Competitive advantage factor (80.7% haven't adopted)
      competitiveAdvantage: baselineRevenue * 0.05 * (1 - inputs.competitorDigitalAdoption / 100),
      
      // Engagement multiplier benefits (400% vs static)
      engagementLift: baselineRevenue * 0.02 * Math.log(industry.engagementMultiplier)
    } : { 
      orderValueIncrease: 0, 
      trafficIncrease: 0, 
      printingSavings: 0, 
      operationalSavings: 0, 
      competitiveAdvantage: 0,
      engagementLift: 0 
    };
    
    // Networking benefits (if applicable)
    const networkingBenefits = serviceType !== 'digital' ? {
      downtimeSavings: inputs.locations * inputs.monthlyDowntime * industry.downtimeCostPerHour * 12,
      operationalEfficiency: baselineRevenue * (industry.operationalEfficiency - 1) * 0.1 // Conservative 10% of efficiency gains
    } : { downtimeSavings: 0, operationalEfficiency: 0 };
    
    // Investment calculations
    const digitalInvestment = serviceType !== 'networking' ? inputs.locations * 8500 : 0; // Digital menu hardware
    const networkingInvestment = serviceType !== 'digital' ? inputs.locations * 12000 : 0; // Network infrastructure
    const initialInvestment = digitalInvestment + networkingInvestment;
    
    const digitalService = serviceType !== 'networking' ? inputs.locations * 295 * 12 : 0; // Monthly digital service
    const networkingService = serviceType !== 'digital' ? inputs.locations * 185 * 12 : 0; // Monthly network service
    const annualServiceCosts = digitalService + networkingService;
    
    // Combined benefits with synergy multiplier for combined service
    const synergyMultiplier = serviceType === 'combined' ? 1.15 : 1.0;
    
    const additionalAnnualRevenue = (digitalBenefits.orderValueIncrease + digitalBenefits.trafficIncrease + digitalBenefits.competitiveAdvantage + digitalBenefits.engagementLift + networkingBenefits.operationalEfficiency) * synergyMultiplier;
    const totalCostSavings = (digitalBenefits.printingSavings + digitalBenefits.operationalSavings + networkingBenefits.downtimeSavings) * synergyMultiplier;
    const totalAnnualBenefit = additionalAnnualRevenue + totalCostSavings;
    const netAnnualBenefit = totalAnnualBenefit - annualServiceCosts;
    
    return {
      additionalAnnualRevenue,
      orderValueIncrease: digitalBenefits.orderValueIncrease * synergyMultiplier,
      trafficIncrease: digitalBenefits.trafficIncrease * synergyMultiplier,
      competitiveAdvantage: digitalBenefits.competitiveAdvantage * synergyMultiplier,
      engagementLift: digitalBenefits.engagementLift * synergyMultiplier,
      printingSavings: digitalBenefits.printingSavings,
      operationalSavings: (digitalBenefits.operationalSavings + networkingBenefits.operationalEfficiency) * synergyMultiplier,
      downtimeSavings: networkingBenefits.downtimeSavings,
      initialInvestment,
      annualServiceCosts,
      totalAnnualBenefit,
      netAnnualBenefit,
      roiPercentage: Math.round(((netAnnualBenefit * 3 - initialInvestment) / initialInvestment) * 100),
      paybackMonths: Math.ceil(initialInvestment / (netAnnualBenefit / 12))
    };
  }, [inputs, serviceType, industryData]);

  useEffect(() => {
    setResults(calculateROI());
  }, [inputs, serviceType, calculateROI]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const handleInputChange = (field: keyof BusinessInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const generatePDFReport = () => {
    if (!results) return;
    
    const reportData = {
      serviceType,
      inputs,
      results,
      companyName: 'Your Company', // Could be captured from a form
      contactName: 'Contact Name'   // Could be captured from a form
    };
    
    generateROIReport(reportData);
  };

  return (
    <CalculatorSection id="roi-calculator">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Calculate Your ROI</h2>
          <p>Get precise ROI projections based on industry data and your specific business parameters</p>
        </SectionHeader>

        <CalculatorCard>
          <CalculatorContent>
            <ServiceToggle>
              <ToggleButton 
                active={serviceType === 'digital'}
                onClick={() => setServiceType('digital')}
              >
                Digital Signage Only
              </ToggleButton>
              <ToggleButton 
                active={serviceType === 'networking'}
                onClick={() => setServiceType('networking')}
              >
                Managed Networking Only
              </ToggleButton>
              <ToggleButton 
                active={serviceType === 'combined'}
                onClick={() => setServiceType('combined')}
              >
                Combined Solution
              </ToggleButton>
            </ServiceToggle>

            <InputSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SectionTitle>Business Fundamentals</SectionTitle>
              <InputGrid>
                <InputGroup>
                  <Label>Number of Locations <span className="tooltip" title="Total number of business locations">ⓘ</span></Label>
                  <SliderContainer>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      value={inputs.locations}
                      onChange={(e) => handleInputChange('locations', parseInt(e.target.value))}
                    />
                  </SliderContainer>
                  <SliderValue>
                    <div className="value">{inputs.locations}</div>
                    <div className="range">1 - 500</div>
                  </SliderValue>
                </InputGroup>

                <InputGroup>
                  <Label>Industry Type</Label>
                  <SelectContainer>
                    <select
                      value={inputs.industryType}
                      onChange={(e) => handleInputChange('industryType', e.target.value)}
                    >
                      <option value="qsr">Quick Service Restaurant</option>
                      <option value="fastcasual">Fast-Casual</option>
                      <option value="retail">Retail</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="other">Other</option>
                    </select>
                  </SelectContainer>
                </InputGroup>

                <InputGroup>
                  <Label>Daily Transactions per Location <span className="tooltip" title="Average number of customer transactions per day per location">ⓘ</span></Label>
                  <SliderContainer>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      value={inputs.avgDailyTransactions}
                      onChange={(e) => handleInputChange('avgDailyTransactions', parseInt(e.target.value))}
                    />
                  </SliderContainer>
                  <SliderValue>
                    <div className="value">{inputs.avgDailyTransactions}</div>
                    <div className="range">50 - 1,000</div>
                  </SliderValue>
                </InputGroup>

                <InputGroup>
                  <Label>Average Order Value <span className="tooltip" title="Average dollar amount per customer transaction">ⓘ</span></Label>
                  <SliderContainer>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={inputs.avgOrderValue}
                      onChange={(e) => handleInputChange('avgOrderValue', parseInt(e.target.value))}
                    />
                  </SliderContainer>
                  <SliderValue>
                    <div className="value">{formatCurrency(inputs.avgOrderValue)}</div>
                    <div className="range">$5 - $100</div>
                  </SliderValue>
                </InputGroup>
              </InputGrid>
            </InputSection>

            <AnimatePresence>
              {serviceType !== 'networking' && (
                <InputSection
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <SectionTitle>Current Menu Operations</SectionTitle>
                  <InputGrid>
                    <InputGroup>
                      <Label>Annual Menu Printing Costs per Location</Label>
                      <SliderContainer>
                        <input
                          type="range"
                          min="500"
                          max="8000"
                          step="100"
                          value={inputs.annualPrintingCosts}
                          onChange={(e) => handleInputChange('annualPrintingCosts', parseInt(e.target.value))}
                        />
                      </SliderContainer>
                      <SliderValue>
                        <div className="value">{formatCurrency(inputs.annualPrintingCosts)}</div>
                        <div className="range">$500 - $8,000</div>
                      </SliderValue>
                    </InputGroup>

                    <InputGroup>
                      <Label>Menu Complexity (Number of Items)</Label>
                      <SliderContainer>
                        <input
                          type="range"
                          min="10"
                          max="200"
                          value={inputs.menuComplexity}
                          onChange={(e) => handleInputChange('menuComplexity', parseInt(e.target.value))}
                        />
                      </SliderContainer>
                      <SliderValue>
                        <div className="value">{inputs.menuComplexity}</div>
                        <div className="range">10 - 200 items</div>
                      </SliderValue>
                    </InputGroup>

                    <InputGroup>
                      <Label>Drive-Thru Revenue Percentage</Label>
                      <SliderContainer>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          value={inputs.driveThruPercentage}
                          onChange={(e) => handleInputChange('driveThruPercentage', parseInt(e.target.value))}
                        />
                      </SliderContainer>
                      <SliderValue>
                        <div className="value">{inputs.driveThruPercentage}%</div>
                        <div className="range">0% - 90%</div>
                      </SliderValue>
                    </InputGroup>
                  </InputGrid>

                  <InputGrid>
                    <InputGroup>
                      <Label>Static Signs per Location</Label>
                      <SliderContainer>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          value={inputs.currentStaticSignCount}
                          onChange={(e) => handleInputChange('currentStaticSignCount', parseInt(e.target.value))}
                        />
                      </SliderContainer>
                      <SliderValue>
                        <div className="value">{inputs.currentStaticSignCount}</div>
                        <div className="range">1 - 15 signs</div>
                      </SliderValue>
                    </InputGroup>

                    <InputGroup>
                      <Label>Competitor Digital Adoption</Label>
                      <SliderContainer>
                        <input
                          type="range"
                          min="0"
                          max="80"
                          step="0.1"
                          value={inputs.competitorDigitalAdoption}
                          onChange={(e) => handleInputChange('competitorDigitalAdoption', parseFloat(e.target.value))}
                        />
                      </SliderContainer>
                      <SliderValue>
                        <div className="value">{inputs.competitorDigitalAdoption.toFixed(1)}%</div>
                        <div className="range">0% - 80%</div>
                      </SliderValue>
                    </InputGroup>
                  </InputGrid>
                </InputSection>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {serviceType !== 'digital' && (
                <InputSection
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <SectionTitle>Current Network Operations</SectionTitle>
                  <InputGrid>
                    <InputGroup>
                      <Label>Monthly Network Downtime (Hours) <span className="tooltip" title="Average hours of network downtime per month across all locations">ⓘ</span></Label>
                      <SliderContainer>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={inputs.monthlyDowntime}
                          onChange={(e) => handleInputChange('monthlyDowntime', parseInt(e.target.value))}
                        />
                      </SliderContainer>
                      <SliderValue>
                        <div className="value">{inputs.monthlyDowntime} hrs</div>
                        <div className="range">0 - 50 hours</div>
                      </SliderValue>
                    </InputGroup>

                    <InputGroup>
                      <Label>Monthly Menu Update Staff Time (Hours)</Label>
                      <SliderContainer>
                        <input
                          type="range"
                          min="1"
                          max="40"
                          value={inputs.menuUpdateHours}
                          onChange={(e) => handleInputChange('menuUpdateHours', parseInt(e.target.value))}
                        />
                      </SliderContainer>
                      <SliderValue>
                        <div className="value">{inputs.menuUpdateHours} hrs</div>
                        <div className="range">1 - 40 hours</div>
                      </SliderValue>
                    </InputGroup>
                  </InputGrid>
                </InputSection>
              )}
            </AnimatePresence>
          </CalculatorContent>

          {results && (
            <ResultsSection
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsHeader>
                <h3>Your ROI Projection</h3>
                <p>Based on industry benchmarks and your business parameters</p>
              </ResultsHeader>

              <MetricsGrid>
                <MetricCard variant="primary">
                  <MetricValue>{formatCurrency(results.additionalAnnualRevenue)}</MetricValue>
                  <MetricLabel>Additional Annual Revenue</MetricLabel>
                </MetricCard>
                
                <MetricCard variant="secondary">
                  <MetricValue>{formatCurrency(results.totalAnnualBenefit - results.annualServiceCosts)}</MetricValue>
                  <MetricLabel>Net Annual Benefit</MetricLabel>
                </MetricCard>
                
                <MetricCard variant="accent">
                  <MetricValue>{results.roiPercentage}%</MetricValue>
                  <MetricLabel>3-Year ROI</MetricLabel>
                </MetricCard>
                
                <MetricCard variant="primary">
                  <MetricValue>{formatCurrency(results.totalAnnualBenefit - results.additionalAnnualRevenue)}</MetricValue>
                  <MetricLabel>Total Annual Savings</MetricLabel>
                </MetricCard>
                
                <MetricCard variant="secondary">
                  <MetricValue>{results.paybackMonths}</MetricValue>
                  <MetricLabel>Payback Period (Months)</MetricLabel>
                </MetricCard>
                
                <MetricCard variant="accent">
                  <MetricValue>{formatCurrency(results.initialInvestment)}</MetricValue>
                  <MetricLabel>Initial Investment</MetricLabel>
                </MetricCard>
              </MetricsGrid>

              <CTASection>
                <Button size="lg" variant="primary" onClick={generatePDFReport}>
                  Get Detailed ROI Report
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </CTASection>
            </ResultsSection>
          )}
        </CalculatorCard>
      </Container>
    </CalculatorSection>
  );
};

export default AdvancedROICalculator;