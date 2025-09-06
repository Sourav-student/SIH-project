
type cardType = {
  link: string,
  name: string
}

const allInitiative: cardType[] = [
  {
    link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2061457",
    name: "Ministry of MSME – Special Campaign 4.0"
  },
  {
    link: "https://smeclimatehub.org/india",
    name: "SME Climate Hub – India"
  },
  {
    link: "https://c4rb.org/how-indian-msmes-are-leading-the-integration-of-environmental-sustainability-into-their-operations",
    name: "MSE-SPICE & MSE-GIFT Schemes"
  },
  {
    link: "https://smestreet.in/limelight/msme-reports-100-target-success-in-special-campaign-40-7561561",
    name: "MGIRI Waste-to-Art & Eco Initiatives"
  },
  {
    link: "https://timesofindia.indiatimes.com/city/vijayawada/andhra-pradesh-to-play-key-role-in-msme-centric-adeetie-scheme/articleshow/122454299.cms",
    name: "ADEETIE Scheme – Energy Efficiency for MSMEs"
  },
  {
    link: "https://sustainabledevelopment.in/wp-content/uploads/2022/06/Toolkit-for-MSMEs-24-March-2022-1.pdf",
    name: "Toolkit for MSMEs – Nature-based Solutions & Air Pollution"
  },
]

export default function Initiative() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 p-7 gap-5">
      {
        allInitiative.map((initiative, index) => (
          <div className="p-4 space-y-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:border hover:border-stone-400" key={index}>
            <p className="text-sm">Site name :  <br />
            <span className="text-xs font-bold shadow-2xl p-1 rounded-lg bg-[#cdcdcd]">{initiative.name}</span></p>
            <a href={initiative.link} target="_blank" className="text-blue-800 text-sm cursor-pointer shadow-2xl p-1 rounded-lg bg-[#cdcdcd]">Link</a>
          </div>
        ))
      }
    </div>
  )
}