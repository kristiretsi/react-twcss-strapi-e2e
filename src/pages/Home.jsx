import { useEffect, useRef } from "react";

import MainBanner from "../components/MainBanner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ContentSwiper from "../components/ContentSwiper";
import MainCard from "../components/MainCard";
import { fetchArtists } from "../redux/thunks/artistThunk";
import { useDispatch, useSelector } from "react-redux";
import FloatingParticles  from "../components/UI/animations/FloatingParticles";

const topSongs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The",
        note: 'Weeknd',
        image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    },
    {
        id: 2,
        title: "Starboy",
        artist: "The",
        note: 'Weeknd',
        image:
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    },
    {
        id: 3,
        title: "After Hours",
        artist: "The",
        note: 'Weeknd',
        image:
            "https://images.unsplash.com/photo-1501612780327-45045538702b",
    },
];

function Home() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const dispatch = useDispatch();
    const artists = useSelector((state) => state.artists.items);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <>
            <div className="relative mt-2.5 h-min py-10">

                <button
                    ref={prevRef}
                    className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-start text-md md:text-xl text-on-bg opacity-70"
                >
                    ❮
                </button>
                <button
                    ref={nextRef}
                    className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-end text-md md:text-xl text-on-bg opacity-70"
                >
                    ❯
                </button>

                <Swiper
                    modules={[Autoplay, Navigation]}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    className="w-full h-fit"
                >
                    <SwiperSlide>
                        <div className="flex items-center justify-start h-full px-7">
                            <MainBanner line1="Check Out" line2="New Releases" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex items-center justify-start h-full px-7">
                            <MainBanner line1="Fresh Drops" line2="Just Landed" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* <FloatingParticles /> */}

            <ContentSwiper title="Top 200 Artists" viewAll={'/explore/top-artists'}>
                {artists.map((artist) => (
                    <MainCard
                        key={artist.id}
                        title={artist.name}
                        image={artist.image}
                        description={`${artist.listeners} listeners`}
                        note={`${artist.playcount} plays`}
                    />
                ))}
            </ContentSwiper>
            {/* <ContentSwiper title="Top Songs" viewAll={'/explore/songs'}>
                {topSongs.map((song) => (
                    <MainCard
                        key={song.id}
                        image={song.image}
                        title={song.title}
                        description={song.artist}
                        note={song.note}
                    />
                ))}
            </ContentSwiper> */}
        </>
    );
}

export default Home;