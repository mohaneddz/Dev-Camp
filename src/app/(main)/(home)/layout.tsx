import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className=" min-w-screen overflow-x-hidden h-full  ">{children}</main>
      <Footer />
    </>
  );
}
