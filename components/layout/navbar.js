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

    const router = useRouter();

    const checkSlug = router.pathname.endsWith('/[slug]')
    ? router.pathname.replace('/[slug]', '')
    : router.pathname;
      
    return(
        <div className='font-montserrat'>
        
        {/* Mobile View */}
        <nav className='relative z-10 w-full bg-opacity-90 px-0 xs:px-4 sm:hidden'>
            <div className='mx-auto flex justify-center space-x-3 text-xs xs:space-x-6 xs:text-sm'>
                {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                    {item.href === checkSlug ? (
                        <div className=' my-4 text-gray-300'>
                            <div className='border-b-2 border-primary pb-1 text-white'>
                                {item.name}
                            </div>
                        </div>
                    ) : (                    
                        <div className=' my-4 text-gray-300'>
                            <div className='hover:text-primary'>
                                {item.name}
                            </div>
                        </div>
                    )}
                </Link>
                ))}
            </div>
        </nav>
        {/* Desktop View */}
        <nav className='hidden relative z-10 w-full bg-opacity-90 px-0 xs:px-4 sm:flex'>
            <div className='mx-auto text-2xl flex justify-center space-x-3  xs:space-x-6 '>
            {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                {item.href === checkSlug ? (
                    <div className=' my-4 text-gray-300'>
                        <p className='flex justify-center border-b-2 border-primary pb-1 text-white'>
                            {item.name}
                        </p>
                    </div>
                ) : (
                    <div className='my-4 text-gray-300'>
                        <p className='flex justify-center  hover:text-primary'>{item.name}</p>
                    </div>
                )}
                </Link>
            ))}
            </div>
        </nav>
    </div>
        
    )
}

export default Navbar;