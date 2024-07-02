type ImagePreviewProps = {
  image: string;
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
  return (
    <img
      src={image}
      alt="Preview"
      loading="lazy"
      width={60}
      height={60}
      className="object-contain w-24 h-24 rounded"
    />
  );
};

export default ImagePreview;
