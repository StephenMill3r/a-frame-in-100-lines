
import { Metadata, ResolvingMetadata } from 'next';


import { getFrameMetadata } from '@coinbase/onchainkit';


import { NEXT_PUBLIC_URL } from '../config';

 
type Props = {
  params: { trait: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const trait = params.trait
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Select Dad',
      },
      {
        action: 'link',
        label: `Buy ${trait} Trait`,
        target: 'https://steak.cryptodadsnft.com/shop?filter=CUSTOMIZE-DAD',
      },
    ],
    image: {
      src: `https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/steak-shop-images/${trait}.png`,
      aspectRatio: '1:1',
    },
    input: {
      text: 'Enter your CryptoDad #',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?trait=${trait}`,
  });
  
  
 
  return {
    title: 'CryptoDad Trait Viewer Frame',
    description: 'LFG',
    openGraph: {
      title: 'this is my title',
      description: 'LFG',
      images: [`https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/steak-shop-images/${trait}.png`],
    },
    other: {
      ...frameMetadata,
    },
  }
}
 

  
export default function Page({ params, searchParams }: Props) {
    //const searchParams = useSearchParams();
    //const trait = searchParams?.get('trait')
    const trait = params.trait
    return (
      <>
        <h1>Try out {trait}</h1>
      </>
    );
  }
