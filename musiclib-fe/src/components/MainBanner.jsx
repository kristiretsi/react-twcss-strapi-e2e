const MainBanner = ({ line1, line2 }) => {
    return (
        <div className="flex flex-col gap-0 text-left">
            <div className="text-4xl md:text-8xl font-extrabold italic text-on-bg leading-none tracking-tight">
                {line1}
            </div>

            <div className="text-5xl md:text-8xl font-black leading-none tracking-tight accent-grad bg-clip-text text-transparent">
                {line2}
            </div>
        </div>
    );
};

export default MainBanner;