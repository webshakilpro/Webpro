import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Ghorer Bazar - খাঁটি ও প্রাকৃতিক খাদ্যের বিশ্বস্ত প্রতিষ্ঠান',
  description: 'Ghorer Bazar - খাঁটি সুন্দরবনের মধু, গাওয়া ঘি, ঘানি ভাঙা সরিষার তেল, খেজুর ও ড্রাই ফ্রুটসের বিশ্বস্ত ই-কমার্স শপ। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।',
  openGraph: {
    title: 'Ghorer Bazar - খাঁটি ও প্রাকৃতিক খাদ্যের বিশ্বস্ত প্রতিষ্ঠান',
    description: 'খাঁটি সুন্দরবনের মধু, গাওয়া ঘি, ঘানি ভাঙা সরিষার তেল, খেজুর ও ড্রাই ফ্রুটস কিনুন ক্যাশ অন ডেলিভারিতে।',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghorer Bazar - খাঁটি ও প্রাকৃতিক খাদ্যের বিশ্বস্ত প্রতিষ্ঠান',
    description: 'খাঁটি সুন্দরবনের মধু, গাওয়া ঘি, ঘানি ভাঙা সরিষার তেল, খেজুর ও ড্রাই ফ্রুটস কিনুন ক্যাশ অন ডেলিভারিতে।',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
