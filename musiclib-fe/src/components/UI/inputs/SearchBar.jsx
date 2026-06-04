import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchMusic } from "../../../redux/thunks/searchThunk";
import { setSearchResults } from "../../../redux/slices/searchSlice";

function SearchBar({ placeholder = "Search artists, songs, albums..." }) {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const t = setTimeout(() => {
            if (value.trim().length >= 1) {
                dispatch(searchMusic(value, 1)); // reset to page 1
            } else if (value.trim() === "") {
                dispatch(setSearchResults(null));
            }
        }, 400);

        return () => clearTimeout(t);
    }, [value, dispatch]);

    const triggerSearch = (val) => {
        //if (!val || val.trim() == "") return;

        dispatch(searchMusic(val));
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);

        // live search (debounced-lite)
        // setTimeout(() => {
        //     triggerSearch(val);
        // }, 300);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!value || value.trim() == "") return;
            triggerSearch(value);
        }
    };

    return (
        <div className="w-full flex items-center justify-center gap-2 px-2 py-3">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full max-w-250 px-4 py-2 rounded-md text-sm modal-bg text-on-bg outline-none"
            />

            <button
                onClick={() => triggerSearch(value)}
                className="cursor-pointer px-4 py-2 rounded-md text-sm accent-grad text-white"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar; 