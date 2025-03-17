export default function BillHeading() {
    return (
      <div className="bg-gray-100 py-10 px-8 w-full">
        {/* Full-Width Blue Header Section with Company Name and Logo */}
        <div className="bg-blue-100 flex justify-between items-center px-6 py-3 rounded-md w-full">
          <h2 className="text-xl font-bold text-black">Ukshati Technologies Pvt Ltd.</h2>
          <img src="logowithleaf.png" alt="Ukshati Logo" className="h-10" />
        </div>
  
        {/* Company Details (Centered) */}
        <div className="text-gray-700 mt-3 text-center">
          <p>2nd floor, Pramod Automobiles bldg.</p>
          <p>Karangalpady, Mangalore - 575003</p>
          <p>Karnataka</p>
          <p>Phone: +91 8861567365</p>
          <a href="http://www.ukshati.com" className="text-blue-500 underline">
            www.ukshati.com
          </a>
        </div>
  
        {/* Full-Width Horizontal Separator */}
        <div className="my-6 border-b-4 border-blue-900 w-full"></div>
  
        {/* Bill Generation Title Centered */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Bill Generation</h1>
      </div>
    );
  }
  