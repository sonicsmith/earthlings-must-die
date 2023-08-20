import Button from '~/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';

type MessageDialogProps = {
  setDialogMessage: (message: string[]) => void;
  message: string[];
  dialogContainer?: HTMLDivElement | null;
};

export const MessageDialog = ({
  setDialogMessage,
  message,
  dialogContainer,
}: MessageDialogProps) => {
  return (
    <Dialog open={!!message.length} onOpenChange={() => setDialogMessage([])}>
      <DialogContent className={'w-72'} container={dialogContainer}>
        <DialogHeader>
          <DialogTitle className={'m-auto'}>INFO</DialogTitle>
        </DialogHeader>
        <div className={'m-auto text-center'}>
          {message.map((text, index) => (
            <span key={index}>
              {text}
              <br />
            </span>
          ))}
        </div>
        <div className={'m-auto mt-4'}>
          <Button onClick={() => setDialogMessage([])}>OK</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
