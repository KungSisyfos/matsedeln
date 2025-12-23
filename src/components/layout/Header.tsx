import { Link } from '@tanstack/react-router';
import matsedelnLogo from '../../assets/images/matsedelnLogo.png';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="w-full bg-[#251AD1] border-b-4 border-[#00008B]">
                <div className=" mx-10 flex flex-row justify-between">
                    <Link to="/" className="flex py-3 cursor">
                        <img src={matsedelnLogo} alt="logo for the matsedeln website" className="size-12 mx-5" />
                        <h1 className="my-auto text-[#FFAB01] text-2xl font-extrabold tracking-wider text-shadow-xl">
                            Matsedeln
                        </h1>
                    </Link>
                    <div id="burger-menu" className="md:hidden my-auto mb-2">
                        <Button
                            onClick={() => setOpen(!open)}
                            className="text-black  bg-[#251AD1] "
                            aria-label="button"
                        >
                            {open ? (
                                <X color="#f1130E" className="size-12" />
                            ) : (
                                <Menu color="#FFAB01" className="size-11" />
                            )}
                        </Button>
                    </div>
                    <div className="hidden md:flex my-auto">
                        <Separator orientation="vertical" />
                        <ul className="text-[#FFAB01] flex flex-row text-lg font-bold">
                            <li className="hover:underline underline-offset-8">
                                <Link to="/login" className="mx-3 hover:overline overline-offset-8">
                                    Logga in
                                </Link>
                            </li>
                            <li className="hover:underline underline-offset-8">
                                <Link to="/register" className="mx-3 hover:overline overline-offset-8">
                                    Registrera dig
                                </Link>
                            </li>
                            <li className="hover:underline underline-offset-8">
                                <Link to="/" className="mx-3 hover:overline overline-offset-8">
                                    Om oss
                                </Link>
                            </li>
                            <li className="hover:underline underline-offset-8">
                                <Link to="/" className="mx-3 hover:overline overline-offset-8">
                                    Användarvillkor
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {open && (
                <Card className="z-100 absolute text-right bg-[#FFAB01] left-[55%] mr-5 md:hidden">
                    <CardContent>
                        <CardHeader className="text-[#251AD1] text-lg text-center font-bold uppercase">Meny</CardHeader>
                        <Separator className="color-[#f1130E]" />
                        <ul className="text-[#251AD1] text-lg font-bold">
                            <li className="my-6 hover:underline underline-offset-8">
                                <Link to="/login">Logga in</Link>
                            </li>
                            <li className="my-6 hover:underline underline-offset-8">
                                <Link to="/register">Registrera dig</Link>
                            </li>
                            <li className="my-6 hover:underline underline-offset-8">
                                <Link to="/">Om oss</Link>
                            </li>
                            <li className="my-6 hover:underline underline-offset-8">
                                <Link to="/">Användarvillkor</Link>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
export default Header;
