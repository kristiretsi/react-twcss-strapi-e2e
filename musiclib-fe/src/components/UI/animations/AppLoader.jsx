export default function AppLoader() {
    return (
        <div className="w-screen h-screen app-loader flex flex-col items-center justify-center p-20 bg-grad">

            <img
                src="/logo.svg"
                alt="logo"
                className="logo-animated max-w-[15vw] max-h-[15vh]"
            />

        </div>
    )
}