const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-white text-gray-500 py-2 text-center">
            <p className="m-0 text-sm">&copy; {currentYear} <span className="text-blue-600">DeshIT-BD</span>. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
