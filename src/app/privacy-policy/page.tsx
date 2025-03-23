export default function PrivacyPolicy() {
    const formattedDate = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
    const sections = [
      {
        title: "Information We Collect",
        content:
          "We collect limited information through Google Analytics, including pages visited, IP addresses, browser types, device types, and referral URLs, to enhance functionality and content.",
      },
      {
        title: "How We Use Your Information",
        content:
          "We use collected data solely to analyze user behavior and improve website performance. We do not sell, rent, or share this information with third parties.",
      },
      {
        title: "Cookies and Tracking Technologies",
        content:
          "We use cookies and similar technologies to enhance your website experience. You can control cookie preferences via your browser settings, though disabling cookies might impact functionality.",
      },
      {
        title: "Data Security",
        content:
          "We implement reasonable security measures to protect your data from unauthorized access. However, no data transmission or storage method is completely secure.",
      },
      {
        title: "Third-Party Links",
        content:
          "Our website may contain links to external websites. We are not responsible for the privacy practices of third-party sites. We recommend reviewing their privacy policies.",
      },
      {
        title: "Children's Privacy",
        content:
          "Our website is not designed for children under 13, and we do not knowingly collect their personal data. If you suspect we've collected data from a minor, please contact us immediately.",
      },
      {
        title: "Changes to This Privacy Policy",
        content:
          "We may update this Privacy Policy without prior notice. Changes are effective immediately upon posting. Check regularly for updates.",
      },
      {
        title: "Contact Us",
        content:
          "For questions regarding this Privacy Policy, please contact us at Chriskp1710@gmail.com.",
      },
    ];
  
    return (
      <div className="space-y-8 text-md md:text-lg text-muted-foreground pb-8">
        <p className="text-sm">Effective Date: {formattedDate}</p>
        <p>
          AlwaysConvert is committed to protecting your privacy. This policy explains our data handling practices clearly and transparently.
        </p>
  
        {sections.map((section, index) => (
          <section key={index} className="space-y-2">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {index + 1}. {section.title}
            </h2>
            <p>{section.content}</p>
          </section>
        ))}
  
        <p className="border-t pt-4">
          By using AlwaysConvert, you consent to this Privacy Policy. Please discontinue use if you disagree with these terms.
        </p>
      </div>
    );
  }
  