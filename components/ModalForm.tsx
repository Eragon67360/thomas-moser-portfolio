import React, { useState } from 'react'
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Avatar, Link, Card, CardBody, CardFooter, Input, RadioGroup, Radio, cn, Textarea } from '@nextui-org/react'
import { H2, H3 } from './ui/Typography'
import { IoIosInformationCircleOutline } from "react-icons/io";

export const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}

            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse min-w-full text-xs cursor-pointer rounded-lg gap-4 p-2 border border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

const ModalForm = () => {
    const [contentStep, setContentStep] = useState('instructions');
    const handleContinue = () => setContentStep('form');

    return (
        <>
            <ModalContent>
                {(onClose) => (
                    <>
                        {contentStep === 'instructions' ? (
                            <>
                                <ModalBody className='flex flex-col items-center justify-center gap-8 px-8 py-24'>

                                    <Avatar src='/logos/logo.svg' className="w-20 h-20 text-large" />
                                    <H2>Let's get started</H2>
                                    <p className='text-center text-sm'>This form clarifies important questions in advance. Please be as precise as possible, as it saves us both time.</p>
                                    <div className='flex flex-col w-full gap-2 items-center justify-center'>
                                        <Button onClick={handleContinue} className='w-full font-semibold' color='primary'>Get started</Button>
                                        <p className='text-xs text-secondary'>Don't like forms?&nbsp;<Link href='mailto:thomas-moser@orange.fr' className='text-xs text-secondary underline' color='foreground'>Send an email</Link> </p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Card className='w-full'>
                                        <CardFooter className='gap-2'>
                                            <IoIosInformationCircleOutline size={20} />
                                            <p className='text-[10px]'>I take pure development projects, but also full stack projects with the amazing designer&nbsp;
                                                <Link href='https://portfolio-cristinaandres-projects.vercel.app/' target='_blank' className='text-[10px] text-indigo-600 dark:text-indigo-300 ' color='foreground'>
                                                    Cristina Andrés
                                                </Link>
                                            </p>
                                        </CardFooter>

                                    </Card>
                                </ModalFooter>
                            </>
                        ) : (
                            <>
                                <ModalBody className='flex flex-col items-center justify-center gap-8 px-8 py-10 w-full'>
                                    <form action="submit" className='flex flex-col w-full gap-8'>
                                        <Input
                                            isRequired
                                            type="name"
                                            label="Full name"
                                            labelPlacement="outside"
                                            placeholder="Steve Jobs"
                                        />
                                        <Input
                                            isRequired
                                            type="email"
                                            label="Email"
                                            labelPlacement="outside"
                                            placeholder="steve@apple.com"
                                        />
                                        <div className='flex gap-4 items-end'>
                                            <Input
                                                type="text"
                                                label="Position & Company"
                                                labelPlacement="outside"
                                                placeholder="CEO"
                                            />
                                            <p className='pb-2'>at</p>
                                            <Input
                                                type="text"
                                                placeholder="Apple"
                                            />
                                        </div>
                                        <RadioGroup
                                            label="Budget"
                                            className='w-full'
                                            orientation="vertical"
                                            description="Estimation of your budget.">
                                            <CustomRadio value="1-5">
                                                $1k - 5k
                                            </CustomRadio>
                                            <CustomRadio value="5-10">
                                                $5k - 10k
                                            </CustomRadio>
                                            <CustomRadio value=">10"
                                            >
                                                {'>$10k'}
                                            </CustomRadio>
                                        </RadioGroup>

                                        <Textarea
                                            label="Project description"
                                            size='md'
                                            minRows={4}
                                            labelPlacement="outside"
                                            placeholder="Tell me more about your project. Please include details like goals, timeline and design links if available."
                                            className="w-full"
                                        />
                                        <p className='text-xs'>By submitting this form, you agree to the &nbsp;<Link href='/privacy' target='_blank' size='sm' className='text-xs underline cursor-pointer' color='foreground'>privacy policy</Link></p>




                                        <Button color='primary' onClick={() => alert('Form Submitted')}>Submit</Button>
                                    </form>
                                </ModalBody>

                            </>
                        )}


                    </>
                )}
            </ModalContent>
        </>
    )
}

export default ModalForm