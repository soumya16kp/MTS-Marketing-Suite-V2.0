import { Facebook, Linkedin, Github, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/mts-logo.png" alt="MTS Logo" className="w-10 h-10" />
              <div>
                <span className="font-montserrat font-bold text-xl text-white">MTS</span>
                <p className="text-sm text-gray-300">All-in-One Digital Marketing</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering businesses with comprehensive digital marketing solutions, professional SEO audits, and
              data-driven insights for sustainable growth.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/mtsmarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/mts-marketing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/mts-marketing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/mtsmarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/mtsmarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-montserrat font-semibold text-lg">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  SEO Audits
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Analytics & Reporting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  ROI Optimization
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  White-label Solutions
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-montserrat font-semibold text-lg">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-montserrat font-semibold text-lg">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">hello@mtsmarketing.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">© {currentYear} MTS Marketing Suite. All rights reserved.</div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">
                Developed by{" "}
                <a
                  href="https://mehedipatha.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  Mehedi Patha
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
