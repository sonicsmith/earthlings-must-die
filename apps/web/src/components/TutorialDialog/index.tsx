import Button from '~/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';
import Image from 'next/image';
import { useState } from 'react';

type TutorialDialogProps = {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  dialogContainer?: HTMLDivElement | null;
};

const TOTAL_STEPS = 6;

const STEP_TEXT = [
  'Navigate to your inventory.',
  'Buy alien eggs and fuel cells.',
  'Select Invade from the menu.',
  'Select the alien to invade with and click "launch".',
  'Your alien will begin its voyage to earth.',
  'Once on the planet you can track your aliens progress.',
];

export const TutorialDialog = ({
  setIsOpen,
  isOpen,
  dialogContainer,
}: TutorialDialogProps) => {
  const [step, setStep] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={'w-72'} container={dialogContainer}>
        <DialogHeader>
          <DialogTitle className={'mx-auto'}>How to Play</DialogTitle>
        </DialogHeader>
        <div
          className={
            'mx-auto w-60 rounded-lg border-4 border-solid border-brand'
          }
        >
          <Image
            src={`/images/tutorial/step${step}.png`}
            width={240}
            height={240}
            alt={'instructions'}
            className="mx-auto border border-solid border-brand"
          />
          <div className="mx-auto mt-2 pb-2 text-center">
            {STEP_TEXT[step - 1]}
          </div>
        </div>
        <div className={'mt-4 flex justify-between'}>
          <Button
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
            disabled={step === 1}
          >
            BACK
          </Button>
          <Button
            onClick={() => {
              if (step < TOTAL_STEPS) {
                setStep(step + 1);
              } else {
                setIsOpen(false);
              }
            }}
          >
            {step >= TOTAL_STEPS ? 'FINISH' : 'NEXT'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
