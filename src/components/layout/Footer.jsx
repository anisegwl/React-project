import React, { useState } from 'react';

const Footer = () => {
  const [error, setError] = useState(null);

  const handleSocialClick = (platform, e) => {
    e.preventDefault();
    try {
      // Add your social media URLs here
      const socialLinks = {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      };

      if (socialLinks[platform]) {
        window.open(socialLinks[platform], '_blank', 'noopener,noreferrer');
      } else {
        console.warn(`Social link for ${platform} not configured`);
        setError(`${platform} link not available`);
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      console.error('Social link error:', err);
      setError('Failed to open social link');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleQuickLinkClick = (link, e) => {
    e.preventDefault();
    try {
      console.log(`Navigating to: ${link}`);
      // Add navigation logic here
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Navigation failed');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-300">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-500 text-white text-center py-2 px-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Main Footer */}
      <footer className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Contact Us Section */}
            <div>
              <h5 className="text-xl font-bold text-white mb-6 border-b-2 border-blue-600 pb-2 inline-block">
                Contact Us
              </h5>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-500"></i>
                  <span>Irving 2194 USA</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone-alt mt-1 mr-3 text-blue-500"></i>
                  <span>0478 517 210</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-3 text-blue-500"></i>
                  <span>uoit-msar@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-id-card mt-1 mr-3 text-blue-500"></i>
                  <span>ABN: 30 628 513 20</span>
                </li>
              </ul>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mt-6">
                <a 
                  href="#facebook" 
                  onClick={(e) => handleSocialClick('facebook', e)}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
                <a 
                  href="#instagram" 
                  onClick={(e) => handleSocialClick('instagram', e)}
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-white"></i>
                </a>
                <a 
                  href="#linkedin" 
                  onClick={(e) => handleSocialClick('linkedin', e)}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
                <a 
                  href="#twitter" 
                  onClick={(e) => handleSocialClick('twitter', e)}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-white"></i>
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h5 className="text-xl font-bold text-white mb-6 border-b-2 border-blue-600 pb-2 inline-block">
                Quick Links
              </h5>
              <ul className="space-y-2 text-sm">
                {['Home', 'About Us', 'Services', 'Gallery', 'Testimonials', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      onClick={(e) => handleQuickLinkClick(link, e)}
                      className="hover:text-blue-400 transition-colors duration-200 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us Section */}
            <div>
              <h5 className="text-xl font-bold text-white mb-6 border-b-2 border-blue-600 pb-2 inline-block">
                About Us
              </h5>
              <p className="text-sm leading-relaxed mb-4">
                We take pleasure in providing individuals with a unique style of fitting and finishing. 
                Our team of skilled craftsmen are dedicated to delivering the highest quality products 
                that meet the standard.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg inline-block">
                <p className="text-2xl font-bold text-blue-500">5 Years</p>
                <p className="text-sm text-gray-400">In Clothing</p>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Lower Footer */}
      <div className="bg-gray-950 py-4 text-center border-t border-gray-800">
        <p className="text-sm text-gray-400">
          &copy; 2026 - Fitify. All Rights Reserved.
          <br className="md:hidden" />
          <span className="hidden md:inline"> | </span>
          Designed by Anise Gnawali.
        </p>
      </div>
    </div>
  );
};

export default Footer;