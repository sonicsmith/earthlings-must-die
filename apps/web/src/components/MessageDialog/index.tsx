import Button from '~/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';

type MessageDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  message: string;
};

export const MessageDialog = ({
  isOpen,
  setIsOpen,
  message,
}: MessageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={'w-72'}>
        <DialogHeader>
          <DialogTitle className={'m-auto'}>SUCCESS</DialogTitle>
        </DialogHeader>
        <div className={'m-auto'}>{message}</div>
        <div className={'m-auto'}>
          <Button onClick={() => setIsOpen(false)}>OK</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
