import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleFavoriteAlbum } from "../redux/thunks/favoriteAlbum";
import { useDispatch, useSelector } from "react-redux";
import FavIcon from '../assets/svgs/fav.svg?react'

const MainCard = ({
    image,
    title,
    description,
    note,
    cardSize = "normal",
    type,
    mbid,
    id,
    name,
    art
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSmall = cardSize === "small";

    const favorites = useSelector((state) => state.favorites.albums);

    const isFav = useMemo(() => {
        return favorites?.some((a) => {
            if (a.exId === mbid) {
                return true;
            } else if (art && title) {
                return a.name === name && a.artist === art;
            }

            return a.exId === mbid;
        });
    }, [favorites, title, art, mbid]);

    const handleClick = () => {
        if (type === "artist") {
            navigate(`/explore/artist/${encodeURIComponent(id)}`);
            return;
        }

        if (type === "album") {
            navigate(
                `/explore/album/${encodeURIComponent(art)}/${encodeURIComponent(name)}`
            );
            return;
        }

        if (type === "track") {
            // navigate(
            //     `/explore/track/${encodeURIComponent(art)}/${encodeURIComponent(id)}`
            // );
        }
    };
    return (
        <div
            onClick={handleClick}
            className={`group cursor-pointer ${isSmall ? "w-32" : "w-45"}`}
        >
            <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg">
                <img
                    src={image}
                    alt={title}
                    className={`modal-bg w-full object-cover transition duration-300 group-hover:scale-105 ${isSmall ? "h-32" : "h-45"
                        }`}
                />
            </div>

            <div className="mt-3 flex flex-row justify-between items-center">
                <div>
                    {title && (
                        <h3
                            className={`text-wrap truncate font-bold text-on-bg ${isSmall ? "text-xs" : "text-sm"
                                }`}
                        >
                            {title}
                        </h3>
                    )}

                    {description && (
                        <p
                            className={`text-wrap truncate text-zinc-500 ${isSmall ? "text-xs" : "text-sm"
                                }`}
                        >
                            {description}
                        </p>
                    )}

                    {note && (
                        <p
                            className={`text-wrap truncate text-zinc-500 ${isSmall ? "text-[12px]" : "text-sm"
                                }`}
                        >
                            {note}
                        </p>
                    )}
                </div>

                {type === 'album' && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            dispatch(
                                toggleFavoriteAlbum(
                                    {
                                        name: title,
                                        artist: art,
                                        image: image,
                                        id: mbid
                                    },
                                    isFav
                                )
                            );
                        }}
                    >
                        {isFav ? <FavIcon className="h-5 w-5 fill-pink-600 stroke-none" /> : <FavIcon className="h-5 w-5 stroke-white" />}

                    </div>
                )}
            </div>
        </div>
    );
};

export default MainCard;