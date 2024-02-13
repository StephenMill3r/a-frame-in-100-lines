import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';


async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let dadid: string | null = '';     
  const fetcher = (url:string) => fetch(url).then((r) => r.json())
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  var imageResponse = 'https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/steak-shop-images/2Clickz.png'

  async function fetchDrip(tokenId: number) {
     const dripbot = await fetcher(`https://api.thedripbot.com/dripbot/drip/cryptodads/?token_id=${tokenId}&accessory=2%20Clickz`)
     return dripbot;
   } 

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }
  const url = new URL(req.url, `http://${req.headers.get('host')}`);
  dadid = url.searchParams.get('dadid');

  if (message?.input) {
    dadid = message.input;
    dadid = dadid.replace(/\D/g,'');

    imageResponse = `https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/cryptodads-images/${dadid}.png`;
    
    }

  if (dadid) {    
    imageResponse = `https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/cryptodads-images/${dadid}.png`;
 
    const tokenId = parseInt(dadid.replace(/\D/g,''));
    // Wait for fetchDrip to complete before proceeding
    const dripbot = await fetchDrip(tokenId);
    if (dripbot.status == 'COMPLETED'){
    imageResponse = dripbot.image_url;
    }else if (dripbot.status == 'RUNNING'){
    imageResponse = `https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/cryptodads-images/${dadid}.png`;
    const tryagain = await fetchDrip(tokenId);
    if (tryagain.status == 'COMPLETED'){
    imageResponse = tryagain.image_url;
    }
  
  }

  }

  // The NextResponse is now created and returned after the asynchronous operations have completed
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Apply 2Clickz (refresh)`,
        },
        {
          action: 'link',
          label: 'Buy 2Clickz Trait',
          target: 'https://steak.cryptodadsnft.com/shop?filter=CUSTOMIZE-DAD',
        },
      ],
      image: {
        src: imageResponse,
        aspectRatio: '1:1',
      },
      input: {
        text: dadid? dadid : 'Enter your CryptoDad #',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?dadid=${dadid}`,
    }),
  );
}


export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
