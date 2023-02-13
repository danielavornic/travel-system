import { FiGithub } from "react-icons/fi";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <p>Copyright © {year} - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://github.com/danielavornic/travel-system" target="_blank" rel="noreferrer">
          <FiGithub className="text-2xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
