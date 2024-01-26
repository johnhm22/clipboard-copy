'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);

  const [storeCopiedText, setStoreCopiedText] = useState<string>('');
  const [storeCopiedImage, setStoreCopiedImage] = useState<string>('');

  useEffect(() => {
    const checkCopiedText = async () => {
      if (copied === true) {
        const text = await navigator.clipboard.readText();
        setStoreCopiedText(text);
      } else if (copiedImage === true) {
        const clipboard = await navigator.clipboard.read();
        console.log('clipboard[0]: ', clipboard[0]);
        const image = await clipboard[0].getType('image/png');
        setStoreCopiedImage(URL.createObjectURL(image));
      }
    };
    setTimeout(() => {
      setCopied(false);
      setStoreCopiedText('');
    }, 3000);
    checkCopiedText();
  }, [copied, copiedImage]);

  const handleImageClick = async () => {
    const response = await fetch(
      'https://res.cloudinary.com/spacejelly-tutorials/image/upload/v1704743747/my-clipboard/Windows_11_Clippy_paperclip_emoji_rlnfod.png'
    );
    const contentType = response.headers.get('Content-Type');
    const blob = await response.blob();
    setCopiedImage(true);
    const data = [new ClipboardItem({ [contentType as string]: blob })];
    await navigator.clipboard.write(data);

    // setTimeout(() => {
    //   setCopiedImage(false);
    // }, 3000);
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='mt-10 w-1/2 h-32'>
        <h1 className='flex mb-5 justify-center font-semibold'>
          Clipboard - copy/paste exercise
        </h1>
        <div className='flex relative bg-slate-400 rounded-lg  px-2'>
          <div className=''>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText('let x = 20');
                setCopied(true);
              }}
              className=' absolute right-1 top-2 text-base rounded-lg text-neutral-300'
            >
              {copied ? '✅ Copied' : 'Copy'}
            </button>
          </div>
          <pre className='py-8'>
            <code>let x = 20</code>
          </pre>
        </div>

        <div className='mt-10'>
          <h2 className='font-semibold'>Copied Text</h2>
          <p className='mt-2'>{storeCopiedText}</p>
        </div>
        <div className='flex flex-col mt-10'>
          <h2>Cool images!</h2>
          <div className='flex relative rounded-lg  px-2'>
            <img
              width={240}
              height={240}
              src='https://res.cloudinary.com/spacejelly-tutorials/image/upload/v1704743747/my-clipboard/Windows_11_Clippy_paperclip_emoji_rlnfod.png'
            />
            <div className=''>
              <button
                onClick={handleImageClick}
                className=' absolute right-0 top-2 text-base rounded-md w-1/2 bg-slate-200 hover:bg-slate-300 py-2 hover:font-semibold'
              >
                {copiedImage ? '✅ Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <pre className='mt-10'>
            {storeCopiedImage && (
              <>
                <img width={150} height={150} src={storeCopiedImage} />
              </>
            )}
          </pre>
        </div>
      </div>
    </main>
  );
}
