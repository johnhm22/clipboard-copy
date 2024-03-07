'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [copied, setCopiedId] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (copied === true) {
        const text = await navigator.clipboard.readText();
        setCopiedText(text);
      }
    })();
    setTimeout(() => {
      setCopiedId(false);
      setCopiedText('');
    }, 3000);
  }, [copied]);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='mt-10 w-1/2 h-32'>
        <h1 className='flex mb-5 justify-center font-semibold'>
          Clipboard - copy/paste exercise
        </h1>
        <div className='flex relative bg-slate-200 rounded-lg  px-2'>
          <div className=''>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText('let x = 20');
                setCopiedId(true);
              }}
              className=' absolute right-1 top-2 text-base rounded-lg text-neutral-500'
            >
              {copied ? '✅ Copied' : 'Copy'}
            </button>
          </div>
          <pre className='py-8'>
            <code>Sample code snippet: let x = 20</code>
          </pre>
        </div>

        <div className='mt-10'>
          {copied && <h2 className='font-semibold'>Copied Text</h2>}
          <p className='mt-2'>{copiedText}</p>
        </div>
      </div>
    </main>
  );
}
