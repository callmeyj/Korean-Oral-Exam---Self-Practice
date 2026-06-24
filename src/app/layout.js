export const metadata = {
  title: "HSC Korean Oral Practice",
  description: "AI examiner for NSW HSC Korean Beginners and Continuers oral exam practice",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, background: "#0c0c16" }}>
        {children}
      </body>
    </html>
  );
}
