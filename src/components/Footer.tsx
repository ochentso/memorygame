import { LinkIcon } from "./LinkIcon";
import { MailIcon } from "./MailIcon";

export const Footer = () => (
  <footer className="flex justify-between py-4 px-7 md:px-9 md:py-6 mt-4 md:mt-6 border-t-2 border-warmGray">
    <div className="flex gap-1 text-mainPurple text-xs md:text-sm lg:text-base">
      <MailIcon />
      <span>ochentso@gmail.com</span>
    </div>
    <div>
      <a
        href=""
        target="_blank"
        className="flex gap-1 text-mainPurple text-xs md:text-sm lg:text-base"
      >
        <LinkIcon />
        GitHub
      </a>
    </div>
  </footer>
);
