'use client';

import { useTranslations } from 'next-intl';
import { Stepper, Step, StepLabel } from '@mui/material';
//Internal app
import { useStepperStore } from '@/store';
import { ContainerStepper } from '@/components';
import FormPersonalData from './FormPersonalData';
import FormAdditionalData from './FormAdditionalData';
import FormContactInformation from './FormContactInformation';

export default function StepperContainer() {
  const t = useTranslations();

  const activeStep = useStepperStore((state) => state.activeStep);

  const steps = [
    t('signup.steps.personalData'),
    t('signup.steps.contactInformation'),
    t('signup.steps.additionalData'),
  ];

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <ContainerStepper currentStep={activeStep}>
        <FormPersonalData />
        <FormContactInformation />
        <FormAdditionalData />
      </ContainerStepper>
    </>
  );
}
