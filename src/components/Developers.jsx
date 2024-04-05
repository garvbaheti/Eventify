import { pricingOptions } from "../constants";

const Developers = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center my-8 tracking-wide">
        The Developers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingOptions.map((option, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
            <img className="w-full h-64 object-cover object-center" src={option.image} alt={option.name} />
            <div className="p-4 flex flex-col justify-center items-center">
              <h3 className="text-gray-900 font-semibold text-xl mb-2 text-center">{option.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
