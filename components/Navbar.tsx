import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className='flexBetween navbar'>
        <div className='flex-1 flexStart gap-10'>
        <Link href="/">
            <Image 
                src="/logo.svg"
                width={115}
                height={43}
                alt="Flexibble"
            />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
            {NavLinks.map((link) => (
                <Link href={link.href} key={link.key}>
                    {link.text}
                </Link>
            ))}
        </ul>
        </div>
    </nav>
  )
}

export default Navbar