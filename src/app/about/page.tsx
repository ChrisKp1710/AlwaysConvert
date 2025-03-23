export default function About() {
  const features = [
    {
      emoji: "🖼️",
      title: "Image Conversion",
      description:
        "Resize, crop, rotate, or convert formats effortlessly. JPEG, PNG, and beyond – boost your visual content.",
    },
    {
      emoji: "🎵",
      title: "Audio Transformation",
      description:
        "Convert audio files (MP3, WAV, AAC). Adjust bitrates, trim, merge and create your ideal soundtrack.",
    },
    {
      emoji: "🎥",
      title: "Video Metamorphosis",
      description:
        "Edit, transcode, merge clips or change formats to craft stunning video content for any platform.",
    },
    {
      emoji: "🚀",
      title: "Unlimited & Free",
      description:
        "Enjoy unlimited conversions without hidden fees or restrictions, completely free.",
    },
    {
      emoji: "🌐",
      title: "Accessible Anywhere",
      description:
        "Convert from your desktop, tablet, or smartphone with ease, anywhere you go.",
    },
    {
      emoji: "🔒",
      title: "Secure & Private",
      description:
        "Your privacy matters. Files remain secure and confidential, always.",
    },
    {
      emoji: "💡",
      title: "User-Friendly Interface",
      description:
        "Intuitive for beginners, powerful for experts—no tech skills required.",
    },
    {
      emoji: "📈",
      title: "Constantly Evolving",
      description:
        "Frequent updates and new features to enhance your multimedia experience.",
    },
    {
      emoji: "🌟",
      title: "AlwaysConvert Advantage",
      description:
        "Transform multimedia without limits. Powerful, versatile, and completely free.",
    },
  ];

  return (
    <div className="space-y-8 text-muted-foreground pb-8">
      <section className="text-center py-8 border-b">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">About AlwaysConvert</h1>
        <p className="mt-4 text-lg md:text-xl">
          Transform images, audio, and videos with unprecedented freedom—all at absolutely no cost.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 pt-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-muted/20 rounded-xl shadow-sm border p-6 transition-transform hover:scale-105 duration-200"
          >
            <h2 className="text-xl font-semibold text-foreground flex gap-2 items-center">
              <span>{feature.emoji}</span> {feature.title}
            </h2>
            <p className="mt-2 text-md md:text-lg">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="text-center py-8 border-t">
        <p className="text-xl md:text-2xl font-medium">
          Join thousands of creators who trust AlwaysConvert to bring their ideas to life.
        </p>
      </section>
    </div>
  );
}
