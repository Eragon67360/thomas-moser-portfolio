import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
    const navigation = [
        { name: 'Home', href: '/home' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects'},
        { name: 'Activites', href: '/activities' },
        { name: 'Contact', href: '/contact' },
        { name: 'Resume', href: '/resume' },
      
      ];
      
    return(
        <header className='unselectable h-[5vh] py-2 font-montserrat w-full mx-auto bg-black/10 px-4'>
            <div className='w-full flex justify-between'>
                <Link href="/" className='my-auto text-xl hidden lg:block'>Thomas Moser</Link>
                <div className='sm:mx-auto lg:mx-0 justify-between flex px-8 transition-p ease-in-out duration-500 '>
                    <nav className='flex items-center justify-center w-full'>
                        <div className='text-lg space-x-3' id='navbar-default'>
                            <ul className="flex rounded-lg flex-row space-x-3 md:space-x-8 md:font-medium bg-transparent ">
                                {navigation.map((item) => (
                                <Link href={item.href} key={item.name}>
                                    <div className='py-1 md:py-2 hover:border-b-2 text-gray-300 text-md sm:text-lg md:text-xl lg:text-2xl hover:border-primary hover:text-primary transition-py duration-500 ease-in-out'>{item.name}</div>
                                </Link>
                                
                                ))}

                            </ul>
                        
                        </div>
                    </nav>
                </div>
            </div>
        </header>
        
    )
}

export default Navbar;