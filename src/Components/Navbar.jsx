import './Navbar.css'

const links = [
    { label: 'About',    href: '#background' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Music',    href: '#music' },
    { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
    return (
        <nav className="navbar">
            <a href="#about" className="nav-logo">JTB</a>
            <ul className="nav-links">
                {links.map(link => (
                    <li key={link.label}>
                        <a href={link.href}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
