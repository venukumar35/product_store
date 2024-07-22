function Footer() {
  return (
    <footer className="fixed w-full whitespace-nowrap">
      <p className="text-center text-[10px] font-semibold md:text-sm">
        Copyright &copy; {new Date().getFullYear()} Venukumar. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
