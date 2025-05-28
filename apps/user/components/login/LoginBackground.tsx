export default function LoginBackground() {
  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/background/intro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
