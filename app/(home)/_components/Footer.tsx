import Link from "next/link";
import Container from "../../../components/Container";
import Logo from "../../../components/ui/Logo";
import { staticData } from "@/shared/staticData";

type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className="bg-gray-dark py-3">
            <Container>
                <div className="flex items-center justify-between">
                    <Logo variant="with-watermark" color="light" />

                    <ul className="flex items-center justify-center gap-x-6 font-normal">
                        {staticData.navLinks.map((link, i) => (
                            <li key={i}>
                                <Link
                                    className="font-light text-white"
                                    href={link.href}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
