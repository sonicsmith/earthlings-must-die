import Button from '~/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';
import Image from 'next/image';
import { useState } from 'react';

type TutorialDialogProps = {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  dialogContainer?: HTMLDivElement | null;
};

const TOTAL_STEPS = 5;

const STEP_TEXT = [
  'Navigate to your inventory.',
  'Buy alien eggs and fuel cells.',
  'Select Invade from the menu.',
  'Select the alien to invade with.',
  'Indicator shows which aliens are yours. Text shows how much yield has been claimed.',
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
          <DialogTitle className={'m-auto'}>How to Play</DialogTitle>
        </DialogHeader>
        <div className={'mx-auto w-60'}>
          <Image
            src={`/images/tutorial/step${step}.png`}
            width={240}
            height={240}
            alt={'instructions'}
            className="mx-auto border border-solid"
          />
          <div className="mx-auto mt-2 text-center">{STEP_TEXT[step - 1]}</div>
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
