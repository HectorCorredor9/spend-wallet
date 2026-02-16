import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
/**
 * Store for stepper navigation
 * @property {number} activeStep - The current active step index.
 * @property {function} setActiveStep - Function to set a specific step.
 * @property {function} nextStep - Function to move to the next step.
 * @property {function} prevStep - Function to move to the previous step.
 * @property {function} resetStep - Function to reset to the first step.
 *
 * @example
 * ```tsx
 * import { useStepperStore } from '@/store/useStepperStore';
 *
 * const activeStep = useStepperStore((state) => state.activeStep);
 * const setActiveStep = useStepperStore((state) => state.setActiveStep);
 * const nextStep = useStepperStore((state) => state.nextStep);
 * const prevStep = useStepperStore((state) => state.prevStep);
 * const resetStep = useStepperStore((state) => state.resetStep);
 * ```
 */

interface StepperStore {
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

export const useStepperStore = create<StepperStore>()(
  devtools(
    (set) => ({
      activeStep: 0,

      setActiveStep: (step) => set({ activeStep: step }, false, 'setActiveStep'),

      nextStep: () => set((state) => ({ activeStep: state.activeStep + 1 }), false, 'nextStep'),

      prevStep: () => set((state) => ({ activeStep: Math.max(0, state.activeStep - 1) }), false, 'prevStep'),

      resetStep: () => set({ activeStep: 0 }, false, 'resetStep'),
    }),
    { name: 'StepperStore' },
  ),
);
