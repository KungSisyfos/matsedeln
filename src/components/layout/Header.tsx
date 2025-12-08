import { Link } from '@tanstack/react-router';
import matsedelnLogo from '../../assets/images/matsedelnLogo.png';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className=" w-full flex flex-row justify-between bg-[#251AD1]">
                <Link to="/" className="flex py-3">
                    <img src={matsedelnLogo} alt="logo for the matsedeln website" className="size-12 mx-5" />
                    <h1 className="my-auto text-[#FFAB01] text-2xl font-extrabold tracking-wider text-shadow-xl">
                        Matsedeln
                    </h1>
                </Link>
                <div id="burger-menu" className="md:hidden my-auto mb-2">
                    <Button onClick={() => setOpen(!open)} className="text-black  bg-[#251AD1] " aria-label="button">
                        {open ? (
                            <X color="#f1130E" className="size-12" />
                        ) : (
                            <Menu color="#FFAB01" className="size-11" />
                        )}
                    </Button>
                </div>
            </div>
            {open && (
                <Card className="z-100 absolute left">
                    <CardContent>
                        <ul>
                            <li>
                                <Link to="/login">Logga in</Link>
                            </li>
                            <li>
                                <Link to="/register">Registrera konto</Link>
                            </li>
                            <li>
                                <Link to="/">Om oss</Link>
                            </li>
                            <li>
                                <Link to="/">Användarvillkor</Link>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
<Menu color="#FFAB01" />;
export default Header;
