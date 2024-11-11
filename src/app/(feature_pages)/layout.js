import Navbar from "@/components/root/Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="p-8">{children}</main>
    </div>
  );
}
