'use client';

import { useTranslations } from 'next-intl';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
//Internal app
import { useStepperStore } from '@/store';
import { ContainerStepper } from '@/components';
import FormPersonalData from './UI/FormPersonalData';
import FormAdditionalData from './UI/FormAdditionalData';
import FormCreatePassword from './UI/FormCreatePassword';
import FormContactInformation from './UI/FormContactInformation';

export default function SignupPage() {
  const t = useTranslations();
  const activeStep = useStepperStore((state) => state.activeStep);

  const steps = [
    t('signup.steps.personalData'),
    t('signup.steps.contactInformation'),
    t('signup.steps.additionalData'),
    t('signup.steps.createPassword'),
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', alignSelf: 'flex-start', mt: 10 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
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
        <FormCreatePassword />
      </ContainerStepper>
    </Box>
  );
}
