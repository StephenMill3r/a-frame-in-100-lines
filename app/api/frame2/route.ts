import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';


async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';  
  let tokenId: string | undefined = '';   
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  var imageResponse = `https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/cryptodads-images/${text}.png`;
  
  async function fetchDrip(tokenId: number) {
     const dripbot = await fetcher(`https://api.thedripbot.com/dripbot/drip/cryptodads/?token_id=${tokenId}&accessory=2%20Clickz`)
     return dripbot;
   } 

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
    if (Number.isInteger(parseInt(text!))){

      tokenId = parseInt(text!);
      fetchDrip(tokenId).then((dripbot) => {
        if (dripbot.status == 'COMPLETED') {
          imageResponse = dripbot.image_url
        }
      })
        
    } 
  }

  // if (message?.button === 3) {
  //   return NextResponse.redirect(
  //     'https://steak.cryptodadsnft.com/shop?filter=CUSTOMIZE-DAD',
  //     { status: 302 },
  //   );
  // }
  

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Apply 2Clickz (Click to Refresh)`,
        },
        {
          action: 'link',
          label: 'Buy 2Clickz Trait for 5000 $steak',
          target: 'https://steak.cryptodadsnft.com/shop?filter=CUSTOMIZE-DAD',
        },
      ],
      image: {
        src: imageResponse,
      },
      input: {
        text: `${text}`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame2`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
