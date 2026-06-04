const FloatingParticles = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <span
                    key={i}
                    className="absolute w-2 h-2 bg-pink-400/30 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDuration: `${6 + Math.random() * 10}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;