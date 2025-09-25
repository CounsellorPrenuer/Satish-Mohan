export default function PartnershipSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Powered by Mentoria's
            <br />
            <span className="text-primary">Career Discovery Platform</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Every Innervea consultation includes lifetime access to Mentoria: India's most trusted platform for 
            career discovery, mentorship, and lifelong upskilling.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Students and Professionals */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="stat-students">
              3,50,000+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Students and Professionals<br />Mentored
            </div>
          </div>

          {/* Corporate Partners */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="stat-corporate">
              240+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Corporate Partners
            </div>
          </div>

          {/* Schools and Colleges */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="stat-schools">
              350+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Schools and College Partners
            </div>
          </div>

          {/* Career Webinars */}
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="stat-webinars">
              1000+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Hours of Career Webinars
            </div>
          </div>
        </div>

        {/* Mentoria Platform Link */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl px-4 sm:px-8 py-3 sm:py-4 shadow-lg border border-gray-200 dark:border-gray-700 mb-4 max-w-sm sm:max-w-none mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-sm">MENTORIA</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Career Discovery Platform</div>
              </div>
            </div>
            <a
              href="https://mentoria.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              data-testid="mentoria-platform-link"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
            Click to explore Mentoria's comprehensive career platform
          </p>
        </div>
      </div>
    </section>
  );
}