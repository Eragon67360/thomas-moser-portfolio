import Link from 'next/link'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'


type Props =
  | {
    title: string
    description?: string
    type?: string
    href: string
    date?: Date
    views?: number
    tags: string[]
  }

const BlockEntry = (props: Props) => {
  const { title, description, type, href, date, views, tags } = props

  return (
    <Link href={href} className='p-4 flex h-auto w-full gap-4'>
      <div className='w-1/3 hidden sm:flex flex-col flex-1 justify-evenly'>
        <div className='h-full'></div>
        <div className='bg-secondary/65 h-[.1vw]' />
        <div className='h-full'></div>
      </div>
      <Card className='w-full sm:w-2/3 bg-transparent' radius='md' shadow='none'>
        <CardHeader>
          <p className='font-bold text-lg'>{title}</p>
        </CardHeader>
        <CardBody>
          <p className='font-extralight text-secondary text-base'>{description}</p>
        </CardBody>
        <CardFooter>
          <div className='flex gap-2'>
            {tags.map((tag: string, index: number) => {
              return (
                <Card key={index} className='p-0' shadow='none'>
                  <CardBody>
                    <p className='text-xs'>{"#" + tag}</p>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BlockEntry
