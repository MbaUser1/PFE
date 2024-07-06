import { Atout } from "@/types/atout";

const atoutData: Atout[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="41" viewBox="0 0 512 512" className="fill-current">
      <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/>
     </svg>
    ),
    title: "Sécurité",
    paragraph:
      "RestoreU agrége de manière sécurisée tous les Documents perdus et trouvés par sa communauté.",
  },
  {
    id: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 640 512" className="fill-current">
        <path d="M153.4 480H387.1L502.6 275.8 204.2 333.2zM504.7 240.1 387.1 32H155.7L360.2 267.9zM124.4 48.8 7.3 256 123.2 461.2 225.6 165.6z"/>
      </svg>
    ),
    title: "Processus",
    paragraph:
      "Une interface vous permet de retrouver et gérer vos dernières déclarations en quelques clics : du signalement de la perte, jusqu’à sa reception.",
  },
  {
    id: 1,
    icon: (
      <svg width="40" height="45" viewBox="0 0 384 512" className="fill-current">
        <path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/>
      </svg>
    ),
    title: "Localisation",
    paragraph:
      "Une facilité de répérage de nos points de dépôts.",
  },
];
export default atoutData;
