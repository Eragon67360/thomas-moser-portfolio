import React, { ReactNode } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import AdBanner from '../ads/AdBanner'

export default function PostComponent({ code }:{code:string}) {

  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <>
      <div className='w-full'>
        <Component components={{AdBanner} as any}/>
      </div>

    </>
  )
}