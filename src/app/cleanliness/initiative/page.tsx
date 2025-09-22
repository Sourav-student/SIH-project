type CardType = {
  link: string;
  name: string;
};

const allInitiative: CardType[] = [
  {
    link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2061457",
    name: "Ministry of MSME – Special Campaign 4.0",
  },
  {
    link: "https://smeclimatehub.org/india",
    name: "SME Climate Hub – India",
  },
  {
    link: "https://c4rb.org/how-indian-msmes-are-leading-the-integration-of-environmental-sustainability-into-their-operations",
    name: "MSE-SPICE & MSE-GIFT Schemes",
  },
  {
    link: "https://smestreet.in/limelight/msme-reports-100-target-success-in-special-campaign-40-7561561",
    name: "MGIRI Waste-to-Art & Eco Initiatives",
  },
  {
    link: "https://timesofindia.indiatimes.com/city/vijayawada/andhra-pradesh-to-play-key-role-in-msme-centric-adeetie-scheme/articleshow/122454299.cms",
    name: "ADEETIE Scheme – Energy Efficiency for MSMEs",
  },
  {
    link: "https://sustainabledevelopment.in/wp-content/uploads/2022/06/Toolkit-for-MSMEs-24-March-2022-1.pdf",
    name: "Toolkit for MSMEs – Nature-based Solutions & Air Pollution",
  },
];

export default function Initiative() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 font-sans">
      {allInitiative.map((initiative, index) => (
        <div
          key={index}
          className="flex flex-col justify-between p-5 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-transparent hover:border-gray-300"
        >
          <p className="text-gray-700 text-sm mb-3">
            <span className="font-semibold text-gray-800">Site Name:</span>
            <br />
            <span className="text-gray-900 font-bold text-sm block mt-1">{initiative.name}</span>
          </p>
          <a
            href={initiative.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit mt-auto inline-block text-center px-3 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors font-medium text-sm"
          >
            Visit Site
          </a>
        </div>
      ))}
    </div>
  );
}