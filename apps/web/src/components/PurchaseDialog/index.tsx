import { CheckoutWithCard } from '@paperxyz/react-client-sdk';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';

const STYLING_OPTIONS = {
  colorBackground: '#334155',
  colorPrimary: '#5e9777',
  colorText: '#ffffff',
  borderRadius: 10,
  inputBackgroundColor: '#ffffff',
  inputBorderColor: '#7bb293',
};

type PurchaseDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  walletAddress: string;
};

const alienContractId = process.env.NEXT_PUBLIC_ALIEN_CONTRACT_ID!;
const equipmentContractId = process.env.NEXT_PUBLIC_EQUIPMENT_CONTRACT_ID;

export const PurchaseAlienDialog = ({
  isOpen,
  setIsOpen,
  walletAddress,
}: PurchaseDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'m-auto'}>Buy Alien Egg</DialogTitle>
        </DialogHeader>
        <CheckoutWithCard
          configs={{
            contractId: alienContractId,
            walletAddress,
            mintMethod: {
              name: 'mint',
              args: {
                recipient: '$WALLET',
              },
              payment: {
                value: '0.1 * $QUANTITY',
                currency: 'ETH',
              },
            },
          }}
          onPaymentSuccess={(result) => {
            console.log('Payment successful:', result);
            setIsOpen(false);
          }}
          options={STYLING_OPTIONS}
        />
      </DialogContent>
    </Dialog>
  );
};
