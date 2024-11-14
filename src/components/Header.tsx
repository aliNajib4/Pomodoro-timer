import logo from "/icon.svg";

const Header = () => {
  return (
    <header className="flex items-center px-4 py-3 ">
      <div className="w-8 h-8 inline ">
        <img src={logo} alt="logo" />
      </div>
      <h1 className="text-senondary text-2xl font-black uppercase ml-2">
        timer
      </h1>
    </header>
  );
};

export default Header;
