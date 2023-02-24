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
                <Link href="/" className='my-auto text-xl'>Thomas Moser</Link>
                <div className=' justify-between flex px-8 transition-p ease-in-out duration-500 '>
                    <nav className='flex items-center justify-center w-full'>
                        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                        <div className='hidden text-lg md:text-2xl space-x-3 sm:pr-2 md:ml-10 md:space-x-12 md:pr-4 md:flex' id='navbar-default'>
                            
                            
                            <ul className="flex flex-col rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:font-medium md:bg-transparent ">
                                {navigation.map((item) => (
                                <Link href={item.href} key={item.name}>
                                    <div className='py-1 md:py-2 hover:border-b-2 text-gray-300 md:text-xl lg:text-2xl hover:border-primary hover:text-primary transition-py duration-500 ease-in-out'>{item.name}</div>
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