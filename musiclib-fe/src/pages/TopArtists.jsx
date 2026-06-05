
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchArtists } from "../redux/thunks/artistThunk";
import CardGrid from "../components/CardGrid";

const TopArtists = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const artists = useSelector((state) => state.artists.items);
    const meta = useSelector((state) => state.artists.meta);

    const [page, setPage] = useState(1);
    const pageSize = 10;
    const MAX_PAGE = meta?.total > 0 ? Math.ceil(meta?.total / pageSize) : 1;
    console.log(meta?.total);

    useEffect(() => {
        if (page > MAX_PAGE) return;
        dispatch(fetchArtists(page, pageSize));
    }, [page, dispatch]);

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-3 py-1 rounded-md text-sm accent-grad text-white"
            >
                Back
            </button>

            <CardGrid
                cardSize="small"
                cards={artists}
                title="Top Artists"
                page={page}
                setPage={setPage}
                maxPage={MAX_PAGE}
                pageSize={pageSize}
            />
        </div>
    );
};

export default TopArtists;