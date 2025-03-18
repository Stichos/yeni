import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavbarProps {
  onConnectWallet: () => void;
}

export function Navbar({ onConnectWallet }: NavbarProps) {
  return (
    <header className="fixed w-full top-0 py-8 z-[99] bg-background/80 backdrop-blur-sm">
      <div className="flex justify-between items-center w-full max-w-[1320px] px-6 mx-auto">
        <div className="flex-1">
          <Link href="/" className="block relative w-[126px] h-[32px] group text-[#EBF5ED]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="126"
              height="32"
              fill="none"
              viewBox="0 0 126 32"
              className="w-full h-full"
            >
              <g fill="currentColor">
                <path d="M0 0c8.837 0 16 7.163 16 16C7.163 16 0 8.837 0 0M32 32c-8.837 0-16-7.163-16-16 8.837 0 16 7.163 16 16M16 16a8 8 0 0 1 8-8 8 8 0 0 1-8 8M16 16a8 8 0 0 1-8 8 8 8 0 0 1 8-8M82.96 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M72 6v22h3v2H65v-2h3V8h-.3l-8.2 17.58L51.3 8v20H54v2h-8v-2h2.7V6H46V4h8l6.5 13.94L67 4h8v2zM87.5 30v-2H85V10l-4 .6-2.6.4v2l2.6.4V28h-2.6v2zM111.7 30v-2H109V16c0-3.32-2.68-6-6-6-2.96 0-5.42 2.14-5.9 4.94V10l-4 .6-2.6.4v2l2.6.4V28h-2.6v2h9.1v-2h-2.5V16.96c0-2.2 1.74-3.96 3.94-3.96s3.96 1.76 3.96 3.96V28h-2.4v2zM120.7 13v15h5.3v2h-7.3c-1.1 0-2-.9-2-2V13h-3.74v-2h1.24c1.04 0 1.92-.64 2.3-1.52l.2-.42L118.6 5h2.1v6h5.3v2z"></path>
              </g>
              <mask id="logo_svg__a" width="126" height="32" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
                <g fill="currentColor">
                  <path d="M0 0c8.837 0 16 7.163 16 16C7.163 16 0 8.837 0 0M32 32c-8.837 0-16-7.163-16-16 8.837 0 16 7.163 16 16M16 16a8 8 0 0 1 8-8 8 8 0 0 1-8 8M16 16a8 8 0 0 1-8 8 8 8 0 0 1 8-8M82.96 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M72 6v22h3v2H65v-2h3V8h-.3l-8.2 17.58L51.3 8v20H54v2h-8v-2h2.7V6H46V4h8l6.5 13.94L67 4h8v2zM87.5 30v-2H85V10l-4 .6-2.6.4v2l2.6.4V28h-2.6v2zM111.7 30v-2H109V16c0-3.32-2.68-6-6-6-2.96 0-5.42 2.14-5.9 4.94V10l-4 .6-2.6.4v2l2.6.4V28h-2.6v2h9.1v-2h-2.5V16.96c0-2.2 1.74-3.96 3.94-3.96s3.96 1.76 3.96 3.96V28h-2.4v2zM120.7 13v15h5.3v2h-7.3c-1.1 0-2-.9-2-2V13h-3.74v-2h1.24c1.04 0 1.92-.64 2.3-1.52l.2-.42L118.6 5h2.1v6h5.3v2z"></path>
                </g>
              </mask>
            </svg>
            <div className="absolute top-0 left-0 h-full w-0 z-10 overflow-hidden transition-all group-hover:w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="126"
                height="32"
                fill="none"
                viewBox="0 0 126 32"
                className="w-[126px] h-full"
              >
                <path
                  fill="#30BF54"
                  d="M0 0c8.837 0 16 7.163 16 16C7.163 16 0 8.837 0 0M32 32c-8.837 0-16-7.163-16-16 8.837 0 16 7.163 16 16M16 16a8 8 0 0 1 8-8 8 8 0 0 1-8 8M16 16a8 8 0 0 1-8 8 8 8 0 0 1 8-8M82.96 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M72 6v22h3v2H65v-2h3V8h-.3l-8.2 17.58L51.3 8v20H54v2h-8v-2h2.7V6H46V4h8l6.5 13.94L67 4h8v2zM87.5 30v-2H85V10l-4 .6-2.6.4v2l2.6.4V28h-2.6v2zM111.7 30v-2H109V16c0-3.32-2.68-6-6-6-2.96 0-5.42 2.14-5.9 4.94V10l-4 .6-2.6.4v2l2.6.4V28h-2.6v2h9.1v-2h-2.5V16.96c0-2.2 1.74-3.96 3.94-3.96s3.96 1.76 3.96 3.96V28h-2.4v2zM120.7 13v15h5.3v2h-7.3c-1.1 0-2-.9-2-2V13h-3.74v-2h1.24c1.04 0 1.92-.64 2.3-1.52l.2-.42L118.6 5h2.1v6h5.3v2z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <NavItem label="Build" />
          <NavItem label="Use" />
          <NavItem label="$MINT" />
          <NavItem label="Ecosystem" />
          <NavItem label="Community" />
          <Link href="https://minty.mintchain.io/" className="flex items-center gap-2">
            <div className="bg-mint-green text-white px-3 py-1 rounded-md font-medium">MINTY</div>
          </Link>
        </div>

        <div className="flex-1 flex justify-end">
          <Button
            onClick={onConnectWallet}
            className="bg-transparent hover:bg-transparent text-[#EBF5ED] hover:text-mint-green transition-all"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <div className="flex gap-2 items-center cursor-pointer group">
      <span className="block py-4 text-md font-medium text-[#EBF5ED] group-hover:text-mint-green transition-colors">
        {label}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="7"
        viewBox="0 0 19 12"
        className="w-4 h-4 text-[#EBF5ED] group-hover:text-mint-green transition-colors"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="m2.115.656-1.5 1.5 9.193 9.193L19 2.156l-1.5-1.5L9.808 8.35z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
