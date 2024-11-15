import logo from "/icon.svg";

const Header = () => {
  return (
    <header className="flex items-center px-4 py-3">
      <div className="inline h-8 w-8">
        <img src={logo} alt="logo" />
      </div>
      <h1 className="ml-2 text-2xl font-black uppercase text-senondary">
        timer
      </h1>
    </header>
  );
};

export default Header;
