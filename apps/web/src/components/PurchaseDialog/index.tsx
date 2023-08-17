import { CheckoutWithCard } from '@paperxyz/react-client-sdk';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/ui/Dialog';

const STYLING_OPTIONS = {
  colorBackground: '#334155',
  colorPrimary: '#5e9777',
  colorText: '#000',
  borderRadius: 10,
  inputBackgroundColor: '#ffffff',
  inputBorderColor: '#7bb293',
};

type PurchaseDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  walletAddress: string;
  email: string;
  onSuccess: () => void;
};

const alienContractId = process.env.NEXT_PUBLIC_ALIEN_CONTRACT_ID!;
const equipmentContractId = process.env.NEXT_PUBLIC_EQUIPMENT_CONTRACT_ID!;

export const PurchaseAlienDialog = ({
  isOpen,
  setIsOpen,
  walletAddress,
  email,
  onSuccess,
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
            email,
            mintMethod: {
              name: 'mint',
              args: {
                recipient: '$WALLET',
              },
              payment: {
                value: '0.01 * $QUANTITY',
                currency: 'MATIC',
              },
            },
          }}
          onPaymentSuccess={(result) => {
            console.log('Payment successful:', result);
            setIsOpen(false);
            onSuccess();
          }}
          options={STYLING_OPTIONS}
        />
      </DialogContent>
    </Dialog>
  );
};

export const PurchaseFuelDialog = ({
  isOpen,
  setIsOpen,
  walletAddress,
  email,
  onSuccess,
}: PurchaseDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'m-auto'}>Buy Fuel</DialogTitle>
        </DialogHeader>
        <CheckoutWithCard
          configs={{
            contractId: equipmentContractId,
            walletAddress,
            email,
            mintMethod: {
              name: 'mint',
              args: {
                recipient: '$WALLET',
                id: 1,
                amount: 1,
              },
              payment: {
                value: '0.01 * $QUANTITY',
                currency: 'MATIC',
              },
            },
          }}
          onPaymentSuccess={(result) => {
            console.log('Payment successful:', result);
            setIsOpen(false);
            onSuccess();
          }}
          options={STYLING_OPTIONS}
        />
      </DialogContent>
    </Dialog>
  );
};
