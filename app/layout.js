import "./globals.css";

export const metadata = {
  title: "cxThrift — Turn conversations into customers",
  description:
    "AI-native commerce for Instagram & WhatsApp. cxThrift plugs into DMs, comments, and stories so every follower gets a hyper-personalized shopping flow.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
