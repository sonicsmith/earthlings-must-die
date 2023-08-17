import Button from '~/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';

type MessageDialogProps = {
  setDialogMessage: (message: string) => void;
  message: string;
};

export const MessageDialog = ({
  setDialogMessage,
  message,
}: MessageDialogProps) => {
  return (
    <Dialog open={!!message} onOpenChange={() => setDialogMessage('')}>
      <DialogContent className={'w-72'}>
        <DialogHeader>
          <DialogTitle className={'m-auto'}>INFO</DialogTitle>
        </DialogHeader>
        <div className={'m-auto'}>{message}</div>
        <div className={'m-auto'}>
          <Button onClick={() => setDialogMessage('')}>OK</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
