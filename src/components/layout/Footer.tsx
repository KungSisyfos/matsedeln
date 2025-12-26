import matsedelnLogo from '@/assets/images/matsedelnLogo.png';
import { Link } from '@tanstack/react-router';

const Footer = () => {
    return (
        <div className="bg-[#251AD1] pt-5">
            <div className="flex pb-3">
                <img src={matsedelnLogo} alt="logo for the matsedeln website" className="size-10 mx-5" />
                <h1 className="my-auto text-[#FFAB01] text-xl font-extrabold tracking-wider text-shadow-xl">
                    Matsedeln
                </h1>
            </div>
            <p className="text-white mx-5 mb-5">Skapar varierde måltidsplaner för svenska förskolor och skolor</p>
            <div className="flex flex-col space-around text-white px-5">
                <h2 className="text-[#FFAB01] font-bold">Navigation</h2>
                <Link to="/">Hem</Link>
                <Link to="/login">Logga in</Link>
                <Link to="/register">Registrera Konto</Link>
                <Link to="/about">Om oss</Link>
            </div>
            <p className="text-xs mt-2">© 2024 Matsedeln. Alla rättigheter förbehållna.</p>
        </div>
    );
};

export default Footer;
