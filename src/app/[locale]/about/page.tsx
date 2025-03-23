export default function About() {
  const cards = [
    {
      title: "🖼️ Image Conversion",
      description: "Resize, crop, rotate, and convert images effortlessly. Formats supported: JPEG, PNG, and more.",
    },
    {
      title: "🎵 Audio Transformation",
      description: "Convert audio formats (MP3, WAV, AAC), adjust bitrates, trim, and merge audio files.",
    },
    {
      title: "🎥 Video Metamorphosis",
      description: "Edit, transcode, merge clips or change formats to craft stunning video content for any platform.",
    },
    {
      title: "🚀 Unlimited & Free",
      description: "Enjoy unlimited conversions without hidden fees or restrictions, completely free.",
    },
    {
      title: "🌐 Accessible Anywhere",
      description: "Convert from your desktop, tablet, or smartphone with ease, anywhere you go.",
    },
    {
      title: "🔒 Secure & Private",
      description: "Your privacy matters. Files remain secure and confidential, always.",
    },
    {
      title: "💡 User-Friendly Interface",
      description: "Intuitive for beginners, powerful for experts—no tech skills required.",
    },
    {
      title: "📈 Constantly Evolving",
      description: "Frequent updates and new features to enhance your multimedia experience.",
    },
    {
      title: "🌟 AlwaysConvert Advantage",
      description: "Transform multimedia without limits. Powerful, versatile, and completely free.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 pb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`border rounded-xl shadow-sm p-6 space-y-2 transition duration-300 hover:shadow-lg hover:border-primary ${
            index === cards.length - 1 && cards.length % 2 !== 0
              ? "md:col-span-2 md:max-w-[50%] md:mx-auto"
              : ""
          }`}
        >
          <h3 className="font-semibold text-lg">{card.title}</h3>
          <p className="text-muted-foreground">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
