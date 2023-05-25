import { type NextPage } from 'next';
import Head from 'next/head';
import HomeIcon from '~/components/HomeButton';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="h-screen bg-black">
        <div className="flex w-full flex-row bg-slate-700 p-2 text-white">
          <HomeIcon />
        </div>

        <div className="p-4 text-lg text-white">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="p-2">
              <h1>Spawn New Alien Race</h1>
            </div>
            <div>
              <CrossmintPayButton
                clientId="0b05de58-033d-4e62-9368-11b74cb5d8e7"
                mintConfig={{
                  type: 'erc-721',
                  totalPrice: '0.005',
                  quantity: '1',
                }}
                environment="staging"
                className="buy-alien-btn"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="p-2">
              <h1>Buy Fuel</h1>
            </div>
            <div>
              <CrossmintPayButton
                clientId="0b05de58-033d-4e62-9368-11b74cb5d8e7"
                mintConfig={{
                  type: 'erc-1155',
                  totalPrice: '0.005',
                  quantity: '1',
                }}
                environment="staging"
                className="buy-equipment-btn"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
