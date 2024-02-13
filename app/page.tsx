import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Select Dad',
    },
    {
      action: 'link',
      label: 'Buy 2Clickz Trait for 5000 $steak',
      target: 'https://steak.cryptodadsnft.com/shop?filter=CUSTOMIZE-DAD',
    },
  ],
  image: {
    src: `https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/steak-shop-images/2Clickz.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Enter your CryptoDad #',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'CryptoDad Trait Viewer Frame',
  description: 'LFG',
  openGraph: {
    title: 'this is my title',
    description: 'LFG',
    images: [`https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/steak-shop-images/2Clickz.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Test 1</h1>
    </>
  );
}
