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
	description: string;
	characteristics: string[];
	media: ModeleMedia;
	extern: {
		desc1: {
			ext1: string;
			descDetail1: string;
		},
		desc2: {
			ext2: string;
			descDetail2: string;
		},
		desc3: {
			ext3: string;
			descDetail3: string;
		},
		desc4: {
			ext4: string;
			descDetail4: string;
		},
	};
	intern: {
		desc1: {
			ext1: string;
			descDetail1: string;
		},
		desc2: {
			ext2: string;
			descDetail2: string;
		},
		desc3: {
			ext3: string;
			descDetail3: string;
		},
		desc4: {
			ext4: string;
			descDetail4: string;
		},
	};
	back: {
		desc1: {
			ext1: string;
			descDetail1: string;
		},
		desc2: {
			ext2: string;
			descDetail2: string;
		},
		desc3: {
			ext3: string;
			descDetail3: string;
		},	
		desc4: {
			ext4: string;
			descDetail4: string;
		},
	};
};

export const MODELES: Modele[] = [
	{
		id: "djetranplus",
		name: "DJETRAN PLUS",
		description:
			"Moteur Turbo Diesel 2,5L, développant 136 chevaux (100 kW) avec un couple 340 Nm. Contrôle électrique Bosch, démarrage sans clé, camera panoramique 360° et système ABS + EBD. Allie économie de carburant, faible bruit et performances exceptionnelles à haute vitesse.",
		characteristics: [
			"Moteur Turbo Diesel 2.5L",
			"136 ch (100 kW) et 340 Nm de couple",
			"Caméra panoramique 360°",
			"ABS + EBD et démarrage sans clé",
		],
		media: {
			topImage: "/models/plus/pic1.jpg",
			topVideo: "/models/plus/djetplus.mp4",
			bottomLeftImage: "/models/plus/plint2.png",
			bottomRightImage: "/models/plus/pic3.png",
			slideImage: "/models/plus/slide1.png",
			bgSlideImage: "/models/plus/bgslide1.jpg",
		},
		extern: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc4: {
				ext4: "/models/desc/djetext2.jpg",
				descDetail4:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
		},
		intern: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc4: {
				ext4: "/models/desc/djetext2.jpg",
				descDetail4:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
		},
		back: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc4: {
				ext4: "/models/desc/djetext2.jpg",
				descDetail4:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
		},
	},
	{
		id: "djetran",
		name: "DJETRAN",
		description:
			"Turbo Diesel 2,3L, développant 163 chevaux  avec un couple 340 Nm, offran puissance et souplesse pour la route comme le tout-terrain. Cockpit intelligent, caméra 360°, contrôle électronique de stabilité et ABS + EBD. Se distingue par sa puissance et sa transmission intégrale. Il offre aussi un haut niveau de sécurité et de confort technologique.",
		characteristics: [
			"Moteur Turbo Diesel 2.3L",
			"163 ch et 340 Nm de couple",
			"Transmission intégrale",
			"Caméra 360° et contrôle de stabilité",
		],
		media: {
			topImage: "/models/djet/int2.jpg",
			topVideo: "/video.mp4",
			bottomLeftImage: "/models/djet/front.jpg",
			bottomRightImage: "/models/djet/back.jpg",
			slideImage: "/models/djet/slide1.png",
			bgSlideImage: "/models/djet/bgslide1.jpg",
		},
		extern: {
			desc1: {
				ext1: "/models/djet/int/int1.jpg",
				descDetail1:
					"Système audio/vidéo embarqué 5 en 1, ordinateur de bord intelligent (affichage de 10 informations) et surveillance de la pression et de la température des pneus.",
			},
			desc2: {
				ext2: "/models/djet/int/int3.jpg",
				descDetail2:
					"Système multimédia 9 pouces intégrant navigation, communication, divertissement, surveillance de la pression des pneus et assistance au stationnement à 360° • Ordinateur de bord intelligent, accès aux informations du véhicule à tout moment et en tout lieu",
			},
			desc3: {
				ext3: "/models/djet/int/int2.jpg",
				descDetail3:
					"Consommation de carburant instantanée, consommation pour un trajet simple, consommation cumulée sur longs trajets • Indicateur d'autonomie restante • Températures intérieure et extérieure • Horloge et temps de conduite • Réglage du rétroéclairage du tableau de bord • Indicateur indépendant des commandes des 4 portes.",
			},
			desc4: {
				ext4: "/models/djet/int/int6.jpg",
				descDetail4:
					"Consommation de carburant instantanée, consommation pour un trajet simple, consommation cumulée sur longs trajets • Indicateur d'autonomie restante • Températures intérieure et extérieure • Horloge et temps de conduite • Réglage du rétroéclairage du tableau de bord • Indicateur indépendant des commandes des 4 portes.",
			},
		},
		intern: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3:
					"Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
			},
			desc4: {
				ext4: "/models/djet/int/int6.jpg",
				descDetail4:
					"Affichage des instruments divisé, petit volant à 4 branches et écran de contrôle central de 8 pouces : un style sportif et élégant.",
			},
		},
		back: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3:
					"Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
			},
			desc4: {
				ext4: "/models/djet/int/int6.jpg",
				descDetail4:
					"Consommation de carburant instantanée, consommation pour un trajet simple, consommation cumulée sur longs trajets • Indicateur d'autonomie restante • Températures intérieure et extérieure • Horloge et temps de conduite • Réglage du rétroéclairage du tableau de bord • Indicateur indépendant des commandes des 4 portes.",
			},
		},
	},
	{
		id: "lathaye",
		name: "LATHAYE",
		description:
			"Avec un moteur 2.0T GDI Turbo compressé de 165 Kw. Transmission automatique CVT à 8 vitesses pour une vitesse maximale de 210 km/h. C'est un véritable bilide qui redéfinit la performance à chaque voyage.",
		characteristics: [
			"Moteur 2.0T GDI Turbo",
			"Puissance maximale de 165 kW",
			"Boîte automatique CVT à 8 vitesses",
			"Vitesse maximale de 210 km/h",
		],
		media: {
			topImage: "/models/lath/pic3.jpg",
			topVideo: "/video.mp4",
			bottomLeftImage: "/models/lath/pic4.jpg",
			bottomRightImage: "/models/lath/pic2.jpeg",
			slideImage: "/models/lath/slide1.png",
			bgSlideImage: "/models/lath/bgslide1.jpg",
		},
		extern: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Moteur 2.0T GDI Turbo compressé pour une performance exceptionnelle à chaque voyage.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Transmission automatique CVT à 8 vitesses pour fluidité et efficience.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3: "Vitesse maximale de 210 km/h : un véritable bolide qui redéfinit la performance.",
			},
			desc4: {
				ext4: "/models/desc/djetext2.jpg",
				descDetail4:
					"Transmission automatique CVT à 8 vitesses : fluidité, efficience et plaisir de conduite au quotidien.",
			},
		},
		intern: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3:
					"Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
			},
			desc4: {
				ext4: "/models/desc/djetext2.jpg",
				descDetail4:
					"Habitacle et finitions pensés pour allier confort longue distance et sensation sportive à bord du LATHAYE.",
			},
		},
		back: {
			desc1: {
				ext1: "/models/desc/djetext1.jpg",
				descDetail1:
					"Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
			},
			desc2: {
				ext2: "/models/desc/djetext2.jpg",
				descDetail2:
					"Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
			},
			desc3: {
				ext3: "/models/desc/pic2.jpg",
				descDetail3:
					"Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
			},
			desc4: {
				ext4: "/models/desc/pic2.jpg",
				descDetail4:
					"Ligne arrière affirmée, volumes équilibrés et signature lumineuse : une présence routière distinctive.",
			},
		},
	},
];

export function getModeleById(id: string): Modele | undefined {
	return MODELES.find((m) => m.id === id);
}
