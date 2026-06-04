import MainCard from "./MainCard";

const CardGrid = ({
    cards = [],
    title = null,
    page = 1,
    setPage = () => { },
    maxPage = 1,
    pageSize = 10,
    cardSize = 'normal',
    image = null,
    type,
    favs
}) => {
    return (
        <div className="w-full">
            {title && (
                <div className="flex items-center justify-start mb-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-on-bg">
                        {title}
                    </h2>
                </div>
            )}

            <div className="
                grid 
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-2
                items-start
                justify-items-center
            ">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <MainCard
                            image={image || card.image}
                            cardSize={cardSize}
                            key={card.id}
                            title={card.name || null}
                            description={card.playcount ? `${card.playcount} plays` : card.artist && card.artist}
                            note={card.listeners ? `${card.listeners} listeners` : (type === "track" && card.artist) ? card.artist : null}
                            type={type}
                            mbid={card.exId}
                            id={card.id}
                            // id={favs ? card.id : card.name}
                            name={card.name}
                            art={(type === "album" || type === "track") ? card.artist : null}
                        />
                    ))
                ) : (
                    <p className="text-sm text-on-bg opacity-70">
                        No results.
                    </p>
                )}
            </div>
            {cards.length > 0 && (
                <div className="flex items-center justify-center gap-6 mt-6">
                    <button
                        onClick={() => setPage(Number(page) - 1)}
                        disabled={page === 1}
                        className="px-2 py-1 rounded-md cursor-pointer accent-grad text-xs text-white disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <div className="text-on-bg font-medium text-xs">
                        Page <span className="font-bold">{page}</span> / {maxPage}
                    </div>

                    <button
                        onClick={() => setPage(Number(page) + 1)}
                        disabled={page >= maxPage}
                        className="px-2 py-1 rounded-md cursor-pointer accent-grad text-xs text-white disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardGrid;