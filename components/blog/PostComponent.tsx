import * as React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

export default function PostComponent({ code }: { code: any }) {

  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <>
      <div className='w-full'>
        
          <Component />

      </div>

    </>
  )
}