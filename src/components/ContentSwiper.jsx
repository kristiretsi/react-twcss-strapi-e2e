
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const ContentSwiper = ({ title, children, viewAll }) => {
    const navigate = useNavigate();
    return (
        <section className="h-fit w-full py-6">
            <div className="mb-4 flex items-center justify-between px-4 sm:px-6">
                {title && (
                    <h2 className="text-2xl font-black text-on-bg">
                        {title}
                    </h2>
                )}

                {viewAll !== '' && (
                    <button className="text-sm font-medium accent-color hover:accent-color-hov" onClick={() => navigate(`${viewAll}`)}>
                        View All
                    </button>
                )}
            </div>

            <div className="px-2 sm:px-4">
                <Swiper
                    spaceBetween={18}
                    slidesPerView={"auto"}
                >
                    {Array.isArray(children)
                        ? children.map((child, index) => (
                            <SwiperSlide key={child.key ?? index} className="w-fit!">
                                {child}
                            </SwiperSlide>
                        ))
                        : children}
                </Swiper>
            </div>

        </section>
    );
};

export default ContentSwiper;