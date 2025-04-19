"use client";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section: Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1350&q=80"
              alt="Cozy coffee shop"
              className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
            />
          </div>

          {/* Right Section: Text */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">About Our Coffee House</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Welcome to <span className="font-semibold text-[#6F4F37]">Brew Haven</span>, your neighborhood sanctuary for coffee lovers. We blend warmth, quality, and passion in every cup, serving hand-picked beans brewed to perfection.
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Whether you need a morning pick-me-up or a cozy spot to unwind, Brew Haven offers the perfect ambiance and flavor to match. From classic espresso to seasonal specials, we serve it all with heart.
            </p>
            <p className="text-gray-600 text-lg">
              Our journey is fueled by community, creativity, and the desire to serve smiles. Stop by, sip slowly, and stay awhile.
            </p>
          </div>
        </div>

        {/* Optional Stats or Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-[#6F4F37]">50+</h3>
            <p className="text-gray-600 mt-2">Daily Visitors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#6F4F37]">25+</h3>
            <p className="text-gray-600 mt-2">Signature Drinks</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#6F4F37]">100%</h3>
            <p className="text-gray-600 mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
