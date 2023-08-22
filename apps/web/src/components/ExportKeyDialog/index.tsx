import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';

type ExportKeyDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const paperClientId = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '';

export const ExportKeyDialog = ({
  isOpen,
  setIsOpen,
}: ExportKeyDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'m-auto'}>Export Wallet</DialogTitle>
        </DialogHeader>
        <iframe
          src={`https://withpaper.com/sdk/2022-08-12/embedded-wallet/export?clientId=${paperClientId}`}
          style={{ width: '100%', height: '450px' }}
        />
      </DialogContent>
    </Dialog>
  );
};
