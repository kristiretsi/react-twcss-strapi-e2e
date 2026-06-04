const Footer = () => {
    return (
        <footer className="w-full mt-auto py-6 flex items-center justify-center modal-bg">
            <p className="text-xs sm:text-sm text-zinc-500 text-center">
                Data provided by{" "}
                <a
                    href="https://www.last.fm/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-on-bg font-semibold hover:underline"
                >
                    Last.fm
                </a>
                .
            </p>
        </footer>
    );
};

export default Footer;