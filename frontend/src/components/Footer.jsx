const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Task Management App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
