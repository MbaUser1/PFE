import { Stat } from "@/types/stat";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

let ratingIcons = [];
for (let index = 0; index < 5; index++) {
  ratingIcons.push(
    <span key={index} className="text-yellow">
      {starIcon}
    </span>,
  );
}

const statData: Stat[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="41" viewBox="0 0 512 512" className="fill-current">
        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/>
     </svg>
    ),
    designation: "50",
    paragraph:
      "Objets chaque mois.",
  },
  {
    id: 2,
    icon: (
      <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
        <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
      </svg>
    ),
    designation: "100",
    paragraph:
      "Review d'utilisateur à 5/5",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="41" viewBox="0 0 512 512" className="fill-current">
      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
     </svg>
    ),
    designation: "+",
    paragraph:
      "Lieux partenaires",
  },
];

export default statData;
