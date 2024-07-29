import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mx-auto flex justify-between items-center py-4">
      <div>
        <Image src="/uokpq.svg" alt="" width={100} height={100} />
      </div>
      <div>
        <ul className="flex gap-6">
          <li>
            <Link href="" target="_blank">
              Home
            </Link>
          </li>
          <li>
            <Link href="" target="_blank">
              Home
            </Link>
          </li>
          <li>
            <Link href="" target="_blank">
              Home
            </Link>
          </li>
          <li>
            <Link href="" target="_blank">
              Home
            </Link>
          </li>
          <li>
            <Link href="" target="_blank">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
