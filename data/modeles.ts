	export type ModeleMedia = {
	topImage: string;
	topVideo: string;
	bottomLeftImage: string;
	bottomRightImage: string;
	slideImage: string;
	bgSlideImage: string;
};

export type Modele = {
	id: string;
	name: string;
	brochureHref: string;
	description: string;
	characteristics: string[];
	media: ModeleMedia;
	extern: {
		desc1: {
			ext1: string;
			descDetail1: string;
		};
		desc2: {
			ext2: string;
			descDetail2: string;
		};
		desc3: {
			ext3: string;
			descDetail3: string;
		};
		desc4?: {
			ext4: string;
			descDetail4: string;
		};
	};
	intern: {
		desc1: {
			ext1: string;
			descDetail1: string;
		};
		desc2: {
			ext2: string;
			descDetail2: string;
		};
		desc3: {
			ext3: string;
			descDetail3: string;
		};
		desc4?: {
			ext4: string;
			descDetail4: string;
		};
	};
	back: {
		desc1: {
			ext1: string;
			descDetail1: string;
		};
		desc2: {
			ext2: string;
			descDetail2: string;
		};
		desc3: {
			ext3: string;
			descDetail3: string;
		};
		desc4?: {
			ext4: string;
			descDetail4: string;
		};
	};
};

export const MODELES: Modele[] = [
	{
		id: "djetranplus",
		name: "DJETRAN PLUS",
		brochureHref: "/djetranplus.pdf",
		description:
			"Essence : 2.0GDI + boîte automatique 8 vitesses (Puissance : 145 kW / 197 ch, Couple : 360 Nm) Systèmes d'assistance à la conduite intelligents de niveau 2 : régulateur de vitesse adaptatif, alerte de franchissement de ligne, avertisseur de collision frontale, vision panoramique à 360°, allumage automatique des phares, essuie-glaces à induction",
		characteristics: [
			"Moteur Essence : 2.0GDI + boîte automatique 8 vitesses",
			"Puissance : 145 kW / 197 ch, Couple : 360 Nm",
			"Essence : 2.0GDI + boîte automatique 8 vitesses",
			"vision panoramique à 360°, allumage automatique des phares",
		],
		media: {
			topImage: "/models/plus/pic4.jpg",
			topVideo: "/models/plus/djetplus.mp4",
			bottomLeftImage: "/models/plus/plint2.png",
			bottomRightImage: "/models/plus/pic3.png",
			slideImage: "/derniers/djetranplus1.png",
			bgSlideImage: "/models/plus/back.jpg",
		},
		extern: {
			desc1: {
				ext1: "/models/desc/plus/avant1.jpg",
				descDetail1:
					`Dimensions: L\u00D7l\u00D7H : 5393 (5692) \u00D7 2045 \u00D7 1965 (1920) mm (Standard/Allégé) ; Empattement : 3230/3513 mm (Allégé) ; Voie : 1730 mm ; Châssis/Benne : Châssis haut : Suspension avant indépendante à double triangulation + Suspension arrière à cinq bras / Benne standard ; Châssis bas : Suspension avant indépendante à double triangulation + Suspension à lames / Benne allongée`,
			},
			desc2: {
				ext2: "/models/desc/plus/avant7.jpg",
				descDetail2:
					`Essence : 2,0 GDI + 8AT (Puissance : 145 KW/197 CV Couple : 360 N.m) Système d'aide à la conduite intelligent L2 : ACC/ LDWS/ FCW/ Moniteur de vision panoramique à 360°/ Phare automatique/ Essuie-glace à induction`,
			},
			desc3: {
				ext3: "/models/desc/plus/avant9.jpg",
				descDetail3:
					"Lion couché: Les passages de roue aux épaules musclées affirment une allure ferme et audacieuse. Style lion: Des phares audacieux au look imposant. Rugissement du lion: La calandre noire révèle la puissance d'un roi. Griffe du lion:Les jantes en alliage d'aluminium à six branches soulignent son caractère sportif.",
			},
			
		},
		intern: {
			desc1: {
				ext1: "/models/desc/plus/int1.png",
				descDetail1:
					"Cabine spacieuse et intelligente: L'intérieur s'inspire du style des pick-up américains, avec des lignes affirmées qui lui confèrent une allure robuste. Avec un volume de 4,3 m³, l'habitacle offre un confort comparable à celui des Mercedes-Benz GLE et Audi Q8.",
			},
			desc2: {
				ext2: "/models/desc/plus/int2.png",
				descDetail2:
					"Confort à l'avant: La largeur de la banquette avant est de 1 660 mm et la hauteur sous toit de 1 100 mm. Même un conducteur mesurant 1,90 m dispose d'un espace d'au moins un poing et demi entre sa tête et le toit.",
			},
			desc3: {
				ext3: "/models/desc/plus/int10.jpg",
				descDetail3:
					"Spacieuse banquette arrière: La largeur de la banquette arrière est de 1 650 mm, la hauteur du toit au plancher de 1 210 mm et la longueur latérale des sièges de 1 380 mm, offrant un espace généreux pour trois adultes. L’inclinaison du dossier des sièges de la deuxième rangée est de 116°, pour un confort accru lors des longs trajets en famille ou entre amis, sans sensation de fatigue.",
			},
			
		},
		back: {
			desc1: {
				ext1: "/models/desc/plus/back1.jpg",
				descDetail1:
					"Technologies intelligentes pour la sécurité • Démarrage/arrêt du moteur • Commande vocale • Volant multifonctions • Frein de stationnement électronique • Airbags frontaux et latéraux • Assistance à l'éclairage d'accompagnement • Déverrouillage automatique en cas de collision • Coupure automatique de carburant en cas de collision • Intervention en cas de renversement • Système de surveillance de la pression des pneus (TPMS) • Fonction de localisation du véhicule • Système PEPS.",
			},
			desc2: {
				ext2: "/models/desc/plus/back4.jpg",
				descDetail2:
					"Système d'aide à la conduite intelligent L2: · Régulateur de vitesse adaptatif (ACC) · Système d'avertissement de sortie de voie (LDWS) · Avertisseur de collision frontale (FCW) · Moniteur de vision panoramique à 360 ° · Phares automatiques · Essuie-glace à détection de pluie.",
			},
			desc3: {
				ext3: "/models/desc/plus/back5.jpg",
				descDetail3:
					"Techniques d'insonorisation: • Application de technologies d'amortissement et de réduction du bruit de la carrosserie • Réglage et calibrage de la suspension • Adaptation du système de transmission • Étanchéité du pack acoustique du véhicule • Isolation et absorption acoustiques de l'ensemble du véhicule • Sensibilité accrue de la structure de la carrosserie • Isolation vibratoire du module de refroidissement avant du compartiment moteur • Vitres arrière teintées (en option) : les vitres arrière teintées sont disponibles en option et offrent une bonne résistance aux UV, une isolation thermique et une meilleure protection contre les infrarouges.",
			},
			
		},
	},
	{
		id: "djetran",
		name: "DJETRAN",
		brochureHref: "/djetranbva.pdf",
		description:
			"Turbo Diesel et essence 2,3L, développant 163 chevaux  avec un couple 340 Nm, offran puissance et souplesse pour la route comme le tout-terrain. Cockpit intelligent, caméra 360°, contrôle électronique de stabilité et ABS + EBD. Se distingue par sa puissance et sa transmission intégrale. Il offre aussi un haut niveau de sécurité et de confort technologique.",
		characteristics: [
			"Moteur Turbo Diesel et essence 2.3L",
			"163 ch et 340 Nm de couple",
			"Transmission intégrale",
			"Caméra 360° et contrôle de stabilité",
		],
		media: {
			topImage: "/models/djet/int2.jpg",
			topVideo: "/video.mp4",
			bottomLeftImage: "/models/djet/front1.jpg",
			bottomRightImage: "/models/djet/back.jpg",
			slideImage: "/models/djet/slide1.png",
			bgSlideImage: "/models/djet/bgslide2.jpg",
		},
		extern: {
			desc1: {
				ext1: "/models/desc/djetran/avant3.jpg",
				descDetail1:
					"Usage professionnel et personnel: Dimensions du véhicule supérieures à celles des produits concurrents de même catégorie. Volume de chargement arrière le plus important de sa catégorie. Profitez d'un espace de conduite intérieur généreux. Transformez votre véhicule en SUV grâce à la capote. Inclinaison des sièges arrière réglable.",
			},
			desc2: {
				ext2: "/models/desc/djetran/avant4.jpg",
				descDetail2:
					"Surveillance de la pression et de la température des pneus: Un design élégant et raffiné, rehaussé de détails soignés. Des finitions haut de gamme et des détails soignés témoignent d'un design exceptionnel. Un style résolument moderne et élégant.",
			},
			desc3: {
				ext3: "/models/desc/djetran/avant5.jpg",
				descDetail3:
					"Capacité de franchissement élevée, charge utile importante: Châssis tout-terrain professionnel haute performance, conforme aux normes internationales, développé en harmonie avec les standards internationaux, garantie de 5 ans ou 150 000 kilomètres. Cadre élargi et renforcé, direction précise.",
			},
			
		},
		intern: {
			desc1: {
				ext1: "/models/desc/djetran/int1.jpg",
				descDetail1:
					"Profitez du luxe: Système audio/vidéo embarqué 5 en 1, ordinateur de bord intelligent (affichage de 10 informations) et surveillance de la pression et de la température des pneus.",
			},
			desc2: {
				ext2: "/models/desc/djetran/int2.jpg",
				descDetail2:
					"Un style sportif et élégant: • MP5 9 pouces intégrant navigation, communication, divertissement, surveillance de la pression des pneus et assistance au stationnement à 360° • Ordinateur de bord intelligent, accès aux informations du véhicule à tout moment et en tout lieu",
			},
			desc3: {
				ext3: "/models/desc/djetran/int3.jpg",
				descDetail3:
					"Caméra avant Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein.",
			},
			
		},
		back: {
			desc1: {
				ext1: "/models/desc/djetran/bak1.jpg",
				descDetail1:
					"Caméra arrière Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein..",
			},
			desc2: {
				ext2: "/models/desc/djetran/bak2.jpg",
				descDetail2:
					"Caméra arrière: Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein.",
			},
			desc3: {
				ext3: "/models/desc/djetran/bak3.jpg",
				descDetail3:
					"Caméras latérales: Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein..",
			},
			
		},
	},
	{
		id: "lathaye",
		name: "LATHAYE",
		brochureHref: "/lathaye.pdf",	
		description:
			"Avec un moteur 2.0T GDI Turbo compressé de 165 Kw. Transmission automatique CVT à 8 rapports pour une vitesse maximale de 210 km/h. C'est un véritable bilide qui redéfinit la performance à chaque voyage.",
		characteristics: [
			"Moteur 2.0T GDI Turbo",
			"Puissance maximale de 165 kW",
			"Boîte automatique CVT à 8 vitesses",
			"Vitesse maximale de 210 km/h",
		],
		media: {
			topImage: "/models/lath/pic3.jpg",
			topVideo: "/videolat.mp4",
			bottomLeftImage: "/models/lath/pic4.jpg",
			bottomRightImage: "/models/lath/pic5.jpg",
			slideImage: "/derniers/lathaye.png",
			bgSlideImage: "/derniers/backlat.png",
		},
		extern: {
			desc1: {
				ext1: "/models/desc/lat/avt1.jpg",
				descDetail1:
					"Moteur 2.0T GDI Turbo compressé pour une performance exceptionnelle à chaque voyage.",
			},
			desc2: {
				ext2: "/models/desc/lat/avt2.jpg",
				descDetail2:
					"Transmission automatique CVT à 8 vitesses pour fluidité et efficience.",
			},
			desc3: {
				ext3: "/models/desc/lat/avt3.jpg",
				descDetail3: "Vitesse maximale de 210 km/h : un véritable bolide qui redéfinit la performance.",
			},
			
		},
		intern: {
			desc1: {
				ext1: "/models/desc/lat/int1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/lat/int2.jpg",
				descDetail2:
					"Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
			},
			desc3: {
				ext3: "/models/desc/lat/int3.jpg",
				descDetail3:
					"Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
			},
			
		},
		back: {
			desc1: {
				ext1: "/models/desc/lat/bak1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/lat/bak2.jpg",
				descDetail2:
					"Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
			},
			desc3: {
				ext3: "/models/desc/lat/bak3.jpg",
				descDetail3:
					"Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
			},
			
		},
	},
];

export function getModeleById(id: string): Modele | undefined {
	return MODELES.find((m) => m.id === id);
}
