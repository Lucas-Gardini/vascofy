export default function useImage() {
	const image = useState("image", () => null);

	const setImage = (file: File) => {
		image.value = file;
	};

	return { image, setImage };
}
