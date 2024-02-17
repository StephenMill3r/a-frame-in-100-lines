// pages/frame/[trait].tsx
import { GetServerSideProps, Metadata, ResolvingMetadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit';


import { NEXT_PUBLIC_URL } from '../config';



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { trait } = context.params;

  // Construct your metadata here
//   const metadata = {
//     title: 'CryptoDad Trait Viewer Frame',
//     description: 'LFG',
//     openGraph: {
//       title: 'this is my title',
//       description: 'LFG',
//       images: [`https://cryptodadsnft.nyc3.cdn.digitaloceanspaces.com/steak-shop-images/${trait}.png`],
//     },
//     trait: trait,
//   };
   
  return {
    props: { trait }, // Pass metadata as props to your page
  };
};



 
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
        label: 'Buy 2Clickz Trait for 5000 $steak',
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
  

// function Page({ metadata }) {
//   if (!metadata) return <div>Loading...</div>;
//   return (
//     <>
//       <Head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//         {metadata.openGraph.images.map((image, index) => (
//           <meta key={index} property="og:image" content={image} />
//         ))}

//         <meta name="fc:frame" content="vNext" />
//         <meta name="fc:frame:button:1" content="Select Dad" />
//         <meta name="fc:frame:button:2" content={"Buy "+metadata.trait+" Trait"} />
//         <meta name="fc:frame:button:2:action" content="link" />
//         <meta name="fc:frame:button:2:target" content="https://steak.cryptodadsnft.com/shop?filter=CUSTOMIZE-DAD" />
//         {'<meta name="fc:frame:image" content="'+metadata.openGraph.images[0]+'.png />'}
//         <meta name="fc:frame:image:aspect_ratio" content="1:1" />
//           <meta name="fc:frame:input:text" content="Enter your CryptoDad #" />
//           {'<meta name="fc:frame:post_url" content="'+NEXT_PUBLIC_URL+'/api/dadframe?trait='+metadata.trait+'" />'}
//       </Head>
//       {/* Page content */}
//       <h1>{metadata.title}</h1>
//     </>
//   );
// };


// const handler = async (req, res) => {
//     const { method } = req
//     switch (method) {
//       case 'GET':
//         await nfts(req, res)
//         break
//       default:
//         res.setHeader('Allow', ['GET', 'OPTIONS'])
//         res.status(405).end(`Method ${method} Not Allowed`)
//     }
//   }
  
//   export default cors(handler)