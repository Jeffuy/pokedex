const isIntersecting = (entry) => {
    return entry.isIntersecting;
};

const loadImage = (entry) => {
	const image = entry.target;
	image.src = image.dataset.src;
	observer.unobserve(image);
};

const observer = new IntersectionObserver((entries) => {
    entries.filter(isIntersecting).forEach(loadImage);
});

export const registerImage = (img) => {
    observer.observe(img);
};
