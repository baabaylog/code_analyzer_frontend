import Navigation from "@/components/Navigation";
import SessionWrapper from "@/components/SessionWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Code Analyzer",
  description: "Code Analyzer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <Navigation />
          <main
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </main>
        </body>
      </SessionWrapper>
    </html>
  );
}
