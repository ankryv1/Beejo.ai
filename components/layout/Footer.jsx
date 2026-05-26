import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#102f1f] text-[#c6d7cc] text-center py-8 px-6 ">
      <p className="text-sm">© 2026 PlantX India Pvt. Ltd.</p>
      <div className="flex flex-wrap justify-center gap-4 mt-3">
        <Link href="/about-us" className="text-[#a8d5b5] text-sm hover:text-white transition-colors">About Us</Link>
        <Link href="/contact-us" className="text-[#a8d5b5] text-sm hover:text-white transition-colors">Contact Us</Link>
        <Link href="/privacy-policy" className="text-[#a8d5b5] text-sm hover:text-white transition-colors">Privacy Policy</Link>
        <Link href="/refund-policy" className="text-[#a8d5b5] text-sm hover:text-white transition-colors">Refund Policy</Link>
        <Link href="/terms-and-conditions" className="text-[#a8d5b5] text-sm hover:text-white transition-colors">Terms & Conditions</Link>
      </div>
    </footer>
  );
}
