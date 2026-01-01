const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#e8c1a9] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            ADHANYA CREATIONS
          </h3>
          <p className="text-sm">a.sharmaaa679@gmail.com</p>
          <p className="text-sm">8130759969</p>
        </div>

        {/* Spacer */}
        <div />

        {/* Address */}
        <div className="md:text-right text-sm">
          <p>KE-44 Kavi Nagar</p>
          <p>Ghaziabad, UP, 201002</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 py-6 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2035 by Adhanya Creations</p>

          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
