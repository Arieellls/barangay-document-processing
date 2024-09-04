export const services = [
  {
    id: 1,
    name: "Barangay Clearance",
    description:
      "A document certifying that an individual is a resident of the barangay and has no criminal record.",
    requirements: [
      "Valid ID",
      "Barangay Certificate of Residency",
      "Community Tax Certificate (Cedula)"
    ],
    fee: 50.0,
    processingTime: "1 day",
    imageCover: "/Barangay Clearance.jpg"
  },
  {
    id: 2,
    name: "Barangay Indigency",
    description:
      "A certificate proving that an individual is indigent and in need of assistance.",
    requirements: [
      "Valid ID",
      "Proof of Indigency (e.g., Income Tax Return, Social Case Study Report)"
    ],
    fee: 30.0,
    processingTime: "1 day",
    imageCover: "/Barangay Indigency.jpg"
  },
  {
    id: 3,
    name: "Barangay Residency",
    description:
      "A certificate verifying that an individual is a resident of the barangay.",
    requirements: [
      "Valid ID",
      "Proof of Residency (e.g., utility bill, lease agreement)"
    ],
    fee: 20.0,
    processingTime: "1 day",
    imageCover: "/Barangay Residency.jpg"
  }
];
