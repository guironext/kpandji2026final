import type { Copy } from "@/lib/i18n/pick";

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
	description: Copy;
	characteristics: Copy[];
	media: ModeleMedia;
	extern: {
		desc1: {
			ext1: string;
			descDetail1: Copy;
		};
		desc2: {
			ext2: string;
			descDetail2: Copy;
		};
		desc3: {
			ext3: string;
			descDetail3: Copy;
		};
		desc4?: {
			ext4: string;
			descDetail4: Copy;
		};
	};
	intern: {
		desc1: {
			ext1: string;
			descDetail1: Copy;
		};
		desc2: {
			ext2: string;
			descDetail2: Copy;
		};
		desc3: {
			ext3: string;
			descDetail3: Copy;
		};
		desc4?: {
			ext4: string;
			descDetail4: Copy;
		};
	};
	back: {
		desc1: {
			ext1: string;
			descDetail1: Copy;
		};
		desc2: {
			ext2: string;
			descDetail2: Copy;
		};
		desc3: {
			ext3: string;
			descDetail3: Copy;
		};
		desc4?: {
			ext4: string;
			descDetail4: Copy;
		};
	};
};

export const MODELES: Modele[] = [
	{
		id: "djetranplus",
		name: "DJETRAN PLUS",
		brochureHref: "/djetranplus.pdf",
		description: {
			fr: "Essence : 2.0GDI + boîte automatique 8 vitesses (Puissance : 145 kW / 197 ch, Couple : 360 Nm) Systèmes d'assistance à la conduite intelligents de niveau 2 : régulateur de vitesse adaptatif, alerte de franchissement de ligne, avertisseur de collision frontale, vision panoramique à 360°, allumage automatique des phares, essuie-glaces à induction",
			en: "Petrol: 2.0 GDI + 8-speed automatic gearbox (Power: 145 kW / 197 hp, Torque: 360 Nm). Level 2 smart driver-assistance systems: adaptive cruise control, lane-departure warning, forward-collision warning, 360° panoramic vision, automatic headlights, rain-sensing wipers.",
		},
		characteristics: [
			{
				fr: "Moteur Essence : 2.0GDI + boîte automatique 8 vitesses",
				en: "Petrol engine: 2.0 GDI + 8-speed automatic gearbox",
			},
			{
				fr: "Puissance : 145 kW / 197 ch, Couple : 360 Nm",
				en: "Power: 145 kW / 197 hp, Torque: 360 Nm",
			},
			{
				fr: "Essence : 2.0GDI + boîte automatique 8 vitesses",
				en: "Petrol: 2.0 GDI + 8-speed automatic gearbox",
			},
			{
				fr: "vision panoramique à 360°, allumage automatique des phares",
				en: "360° panoramic vision, automatic headlights",
			},
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
				descDetail1: {
					fr: `Dimensions: L\u00D7l\u00D7H : 5393 (5692) \u00D7 2045 \u00D7 1965 (1920) mm (Standard/Allégé) ; Empattement : 3230/3513 mm (Allégé) ; Voie : 1730 mm ; Châssis/Benne : Châssis haut : Suspension avant indépendante à double triangulation + Suspension arrière à cinq bras / Benne standard ; Châssis bas : Suspension avant indépendante à double triangulation + Suspension à lames / Benne allongée`,
					en: `Dimensions: L\u00D7W\u00D7H: 5393 (5692) \u00D7 2045 \u00D7 1965 (1920) mm (Standard/Lightweight); Wheelbase: 3230/3513 mm (Lightweight); Track: 1730 mm; Chassis/Bed: High chassis: independent double-wishbone front suspension + five-link rear suspension / standard bed; Low chassis: independent double-wishbone front suspension + leaf-spring suspension / extended bed`,
				},
			},
			desc2: {
				ext2: "/models/desc/plus/avant7.jpg",
				descDetail2: {
					fr: `Essence : 2,0 GDI + 8AT (Puissance : 145 KW/197 CV Couple : 360 N.m) Système d'aide à la conduite intelligent L2 : ACC/ LDWS/ FCW/ Moniteur de vision panoramique à 360°/ Phare automatique/ Essuie-glace à induction`,
					en: `Petrol: 2.0 GDI + 8AT (Power: 145 kW / 197 hp, Torque: 360 Nm). Level 2 smart driver-assistance system: ACC / LDWS / FCW / 360° panoramic-vision monitor / automatic headlights / rain-sensing wipers`,
				},
			},
			desc3: {
				ext3: "/models/desc/plus/avant9.jpg",
				descDetail3: {
					fr: "Lion couché: Les passages de roue aux épaules musclées affirment une allure ferme et audacieuse. Style lion: Des phares audacieux au look imposant. Rugissement du lion: La calandre noire révèle la puissance d'un roi. Griffe du lion:Les jantes en alliage d'aluminium à six branches soulignent son caractère sportif.",
					en: "Crouching lion: muscular wheel arches project a firm, bold stance. Lion style: bold headlights with a commanding look. Lion's roar: the black grille reveals the power of a king. Lion's claw: six-spoke alloy wheels underline its sporting character.",
				},
			},
			
		},
		intern: {
			desc1: {
				ext1: "/models/desc/plus/int1.png",
				descDetail1: {
					fr: "Cabine spacieuse et intelligente: L'intérieur s'inspire du style des pick-up américains, avec des lignes affirmées qui lui confèrent une allure robuste. Avec un volume de 4,3 m³, l'habitacle offre un confort comparable à celui des Mercedes-Benz GLE et Audi Q8.",
					en: "Spacious, smart cabin: the interior draws on American pick-up styling, with bold lines that give it a rugged stance. With a volume of 4.3 m³, the cabin offers comfort comparable to the Mercedes-Benz GLE and Audi Q8.",
				},
			},
			desc2: {
				ext2: "/models/desc/plus/int2.png",
				descDetail2: {
					fr: "Confort à l'avant: La largeur de la banquette avant est de 1 660 mm et la hauteur sous toit de 1 100 mm. Même un conducteur mesurant 1,90 m dispose d'un espace d'au moins un poing et demi entre sa tête et le toit.",
					en: "Front comfort: the front bench is 1,660 mm wide, with 1,100 mm of headroom. Even a driver standing 1.90 m tall keeps at least a fist and a half of clearance between their head and the roof.",
				},
			},
			desc3: {
				ext3: "/models/desc/plus/int10.jpg",
				descDetail3: {
					fr: "Spacieuse banquette arrière: La largeur de la banquette arrière est de 1 650 mm, la hauteur du toit au plancher de 1 210 mm et la longueur latérale des sièges de 1 380 mm, offrant un espace généreux pour trois adultes. L’inclinaison du dossier des sièges de la deuxième rangée est de 116°, pour un confort accru lors des longs trajets en famille ou entre amis, sans sensation de fatigue.",
					en: "Spacious rear bench: the rear bench is 1,650 mm wide, with 1,210 mm of floor-to-roof height and 1,380 mm of seat length, offering generous room for three adults. The second-row backrest reclines to 116°, for greater comfort on long family or friend trips, without fatigue.",
				},
			},
			
		},
		back: {
			desc1: {
				ext1: "/models/desc/plus/back1.jpg",
				descDetail1: {
					fr: "Technologies intelligentes pour la sécurité • Démarrage/arrêt du moteur • Commande vocale • Volant multifonctions • Frein de stationnement électronique • Airbags frontaux et latéraux • Assistance à l'éclairage d'accompagnement • Déverrouillage automatique en cas de collision • Coupure automatique de carburant en cas de collision • Intervention en cas de renversement • Système de surveillance de la pression des pneus (TPMS) • Fonction de localisation du véhicule • Système PEPS.",
					en: "Smart safety technologies • Engine start/stop • Voice control • Multifunction steering wheel • Electronic parking brake • Front and side airbags • Follow-me-home lighting assistance • Automatic unlocking in case of collision • Automatic fuel cut-off in case of collision • Rollover intervention • Tire pressure monitoring system (TPMS) • Vehicle locator function • PEPS keyless system.",
				},
			},
			desc2: {
				ext2: "/models/desc/plus/back4.jpg",
				descDetail2: {
					fr: "Système d'aide à la conduite intelligent L2: · Régulateur de vitesse adaptatif (ACC) · Système d'avertissement de sortie de voie (LDWS) · Avertisseur de collision frontale (FCW) · Moniteur de vision panoramique à 360 ° · Phares automatiques · Essuie-glace à détection de pluie.",
					en: "Level 2 smart driver-assistance system: · Adaptive cruise control (ACC) · Lane-departure warning system (LDWS) · Forward-collision warning (FCW) · 360° panoramic-vision monitor · Automatic headlights · Rain-sensing wipers.",
				},
			},
			desc3: {
				ext3: "/models/desc/plus/back5.jpg",
				descDetail3: {
					fr: "Techniques d'insonorisation: • Application de technologies d'amortissement et de réduction du bruit de la carrosserie • Réglage et calibrage de la suspension • Adaptation du système de transmission • Étanchéité du pack acoustique du véhicule • Isolation et absorption acoustiques de l'ensemble du véhicule • Sensibilité accrue de la structure de la carrosserie • Isolation vibratoire du module de refroidissement avant du compartiment moteur • Vitres arrière teintées (en option) : les vitres arrière teintées sont disponibles en option et offrent une bonne résistance aux UV, une isolation thermique et une meilleure protection contre les infrarouges.",
					en: "Sound-insulation techniques: • Body damping and noise-reduction technologies • Suspension tuning and calibration • Adapted transmission system • Sealed acoustic package • Full-vehicle acoustic insulation and absorption • Reinforced body-structure rigidity • Vibration isolation of the engine-bay front cooling module • Tinted rear windows (optional): available as an option, offering good UV resistance, thermal insulation, and improved infrared protection.",
				},
			},
			
		},
	},
	{
		id: "djetran",
		name: "DJETRAN",
		brochureHref: "/djetranbva.pdf",
		description: {
			fr: "Turbo Diesel et essence 2,3L, développant 163 chevaux  avec un couple 340 Nm, offran puissance et souplesse pour la route comme le tout-terrain. Cockpit intelligent, caméra 360°, contrôle électronique de stabilité et ABS + EBD. Se distingue par sa puissance et sa transmission intégrale. Il offre aussi un haut niveau de sécurité et de confort technologique.",
			en: "2.3L Turbo Diesel and petrol, developing 163 hp with 340 Nm of torque, delivering power and flexibility for both road and off-road driving. Smart cockpit, 360° camera, electronic stability control, and ABS + EBD. Distinguished by its power and all-wheel drive, it also offers a high level of safety and technological comfort.",
		},
		characteristics: [
			{ fr: "Moteur Turbo Diesel et essence 2.3L", en: "2.3L Turbo Diesel and petrol engine" },
			{ fr: "163 ch et 340 Nm de couple", en: "163 hp and 340 Nm of torque" },
			{ fr: "Transmission intégrale", en: "All-wheel drive" },
			{
				fr: "Caméra 360° et contrôle de stabilité",
				en: "360° camera and stability control",
			},
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
				descDetail1: {
					fr: "Usage professionnel et personnel: Dimensions du véhicule supérieures à celles des produits concurrents de même catégorie. Volume de chargement arrière le plus important de sa catégorie. Profitez d'un espace de conduite intérieur généreux. Transformez votre véhicule en SUV grâce à la capote. Inclinaison des sièges arrière réglable.",
					en: "Professional and personal use: larger overall dimensions than competing products in the same category. Class-leading rear load volume. Enjoy a generous interior driving space. Turn your vehicle into an SUV with the optional canopy. Adjustable rear-seat recline.",
				},
			},
			desc2: {
				ext2: "/models/desc/djetran/avant43.jpg",
				descDetail2: {
					fr: "Surveillance de la pression et de la température des pneus: Un design élégant et raffiné, rehaussé de détails soignés. Des finitions haut de gamme et des détails soignés témoignent d'un design exceptionnel. Un style résolument moderne et élégant.",
					en: "Tire pressure and temperature monitoring: an elegant, refined design enhanced with meticulous detailing. Premium finishes and careful details reflect exceptional design — a resolutely modern and elegant style.",
				},
			},
			desc3: {
				ext3: "/models/desc/djetran/avant5.jpg",
				descDetail3: {
					fr: "Capacité de franchissement élevée, charge utile importante: Châssis tout-terrain professionnel haute performance, conforme aux normes internationales, développé en harmonie avec les standards internationaux, garantie de 5 ans ou 150 000 kilomètres. Cadre élargi et renforcé, direction précise.",
					en: "High off-road capability, generous payload: professional-grade, high-performance off-road chassis, developed to international standards, with a 5-year or 150,000 km warranty. Widened, reinforced frame and precise steering.",
				},
			},
			
		},
		intern: {
			desc1: {
				ext1: "/models/desc/djetran/int1.jpg",
				descDetail1: {
					fr: "Profitez du luxe: Système audio/vidéo embarqué 5 en 1, ordinateur de bord intelligent (affichage de 10 informations) et surveillance de la pression et de la température des pneus.",
					en: "Enjoy the luxury: 5-in-1 onboard audio/video system, smart trip computer (10-point information display), and tire pressure and temperature monitoring.",
				},
			},
			desc2: {
				ext2: "/models/desc/djetran/int2.jpg",
				descDetail2: {
					fr: "Un style sportif et élégant: • MP5 9 pouces intégrant navigation, communication, divertissement, surveillance de la pression des pneus et assistance au stationnement à 360° • Ordinateur de bord intelligent, accès aux informations du véhicule à tout moment et en tout lieu",
					en: "A sporty, elegant style: • 9-inch MP5 display integrating navigation, communication, entertainment, tire-pressure monitoring, and 360° parking assistance • Smart trip computer, giving access to vehicle information anytime, anywhere",
				},
			},
			desc3: {
				ext3: "/models/desc/djetran/int3.jpg",
				descDetail3: {
					fr: "Caméra avant Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein.",
					en: "Front camera: thanks to a multi-channel video system with 4 wide-angle cameras, a seamless ultra-wide composite view, and a smart rotating reversing camera, parking becomes easier and more relaxed.",
				},
			},
			
		},
		back: {
			desc1: {
				ext1: "/models/desc/djetran/bak1.jpg",
				descDetail1: {
					fr: "Caméra arrière Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein..",
					en: "Rear camera: thanks to a multi-channel video system with 4 wide-angle cameras, a seamless ultra-wide composite view, and a smart rotating reversing camera, parking becomes easier and more relaxed.",
				},
			},
			desc2: {
				ext2: "/models/desc/djetran/bak2.jpg",
				descDetail2: {
					fr: "Caméra arrière: Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein.",
					en: "Rear camera: thanks to a multi-channel video system with 4 wide-angle cameras, a seamless ultra-wide composite view, and a smart rotating reversing camera, parking becomes easier and more relaxed.",
				},
			},
			desc3: {
				ext3: "/models/desc/djetran/bak3.jpg",
				descDetail3: {
					fr: "Caméras latérales: Grâce à un système d'acquisition vidéo multicanal avec 4 caméras grand angle, un assemblage fluide ultra grand angle et une caméra de recul à rotation intelligente, le stationnement devient plus facile et plus serein..",
					en: "Side cameras: thanks to a multi-channel video system with 4 wide-angle cameras, a seamless ultra-wide composite view, and a smart rotating reversing camera, parking becomes easier and more relaxed.",
				},
			},
			
		},
	},
	{
		id: "lathaye",
		name: "LATHAYE",
		brochureHref: "/lathaye.pdf",	
		description: {
			fr: "Avec un moteur 2.0T GDI Turbo compressé de 165 Kw. Transmission automatique CVT à 8 rapports pour une vitesse maximale de 210 km/h. C'est un véritable bilide qui redéfinit la performance à chaque voyage.",
			en: "Powered by a 2.0T GDI turbocharged engine developing 165 kW. 8-speed automatic CVT transmission for a top speed of 210 km/h. A true powerhouse that redefines performance on every journey.",
		},
		characteristics: [
			{ fr: "Moteur 2.0T GDI Turbo", en: "2.0T GDI Turbo engine" },
			{ fr: "Puissance maximale de 165 kW", en: "Maximum power of 165 kW" },
			{
				fr: "Boîte automatique CVT à 8 vitesses",
				en: "8-speed automatic CVT gearbox",
			},
			{ fr: "Vitesse maximale de 210 km/h", en: "Top speed of 210 km/h" },
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
				descDetail1: {
					fr: "Moteur 2.0T GDI Turbo compressé pour une performance exceptionnelle à chaque voyage.",
					en: "2.0T GDI turbocharged engine for exceptional performance on every journey.",
				},
			},
			desc2: {
				ext2: "/models/desc/lat/avt2.jpg",
				descDetail2: {
					fr: "Transmission automatique CVT à 8 vitesses pour fluidité et efficience.",
					en: "8-speed automatic CVT transmission for smoothness and efficiency.",
				},
			},
			desc3: {
				ext3: "/models/desc/lat/avt3.jpg",
				descDetail3: {
					fr: "Vitesse maximale de 210 km/h : un véritable bolide qui redéfinit la performance.",
					en: "Top speed of 210 km/h: a true powerhouse that redefines performance.",
				},
			},
			
		},
		intern: {
			desc1: {
				ext1: "/models/desc/lat/int1.jpg",
				descDetail1: {
					fr: "Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
					en: "Designed for both professional and personal use, this vehicle stands out with larger dimensions than competing models in its category, offering the largest rear load volume in its class. Its spacious cabin ensures optimal driving comfort, while the modular canopy lets you turn it into an SUV whenever you need. Reclining rear seats further enhance this sense of comfort and flexibility.",
				},
			},
			desc2: {
				ext2: "/models/desc/lat/int2.jpg",
				descDetail2: {
					fr: "Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
					en: "Thanks to an advanced tire pressure and temperature monitoring system, you drive with complete peace of mind. Its captivating design blends refined elegance and ruggedness, with meticulous finishes and premium materials that underline its high-end character.",
				},
			},
			desc3: {
				ext3: "/models/desc/lat/int3.jpg",
				descDetail3: {
					fr: "Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
					en: "Designed for both adventure and work, this vehicle offers excellent off-road capability along with a large load capacity. Its high-performance off-road chassis, developed to the strictest international standards, ensures strength and reliability, backed by a 5-year or 150,000 km warranty. Its widened, reinforced structure, paired with precise steering, guarantees optimal control on every terrain. On the safety and comfort side, nothing has been left to chance: equipped as standard with ESC and TCS systems, as well as brake assist (EBA) and hill-start assist (HAC), it offers maximum protection for driving that is both dynamic and secure.",
				},
			},
			
		},
		back: {
			desc1: {
				ext1: "/models/desc/lat/bak1.jpg",
				descDetail1: {
					fr: "Conçu aussi bien pour un usage professionnel que personnel, ce véhicule se distingue par des dimensions supérieures à celles des modèles concurrents de sa catégorie, offrant ainsi le plus grand volume de chargement arrière. Son habitacle spacieux garantit un confort de conduite optimal, tandis que la capote modulable permet de le transformer en SUV selon vos besoins. Les sièges arrière inclinables viennent renforcer cette sensation de confort et de flexibilité.",
					en: "Designed for both professional and personal use, this vehicle stands out with larger dimensions than competing models in its category, offering the largest rear load volume in its class. Its spacious cabin ensures optimal driving comfort, while the modular canopy lets you turn it into an SUV whenever you need. Reclining rear seats further enhance this sense of comfort and flexibility.",
				},
			},
			desc2: {
				ext2: "/models/desc/lat/bak2.jpg",
				descDetail2: {
					fr: "Grâce à un système avancé de surveillance de la pression et de la température des pneus, vous roulez en toute sérénité. Son design captivant allie élégance raffinée et robustesse, avec des finitions soignées et des matériaux de haute qualité qui soulignent son caractère premium.",
					en: "Thanks to an advanced tire pressure and temperature monitoring system, you drive with complete peace of mind. Its captivating design blends refined elegance and ruggedness, with meticulous finishes and premium materials that underline its high-end character.",
				},
			},
			desc3: {
				ext3: "/models/desc/lat/bak3.jpg",
				descDetail3: {
					fr: "Pensé pour l’aventure comme pour le travail, ce véhicule offre une excellente capacité de franchissement ainsi qu’une grande capacité de chargement. Son châssis tout-terrain haute performance, développé selon les normes internationales les plus strictes, assure solidité et fiabilité, soutenues par une garantie de 5 ans ou 150 000 km. Sa structure élargie et renforcée, associée à une direction précise, garantit une maîtrise optimale sur tous les terrains.Côté sécurité et confort, rien n’a été laissé au hasard : équipé de série des systèmes ESC et TCS, ainsi que de l’assistance au freinage (EBA) et au démarrage en côte (HAC), il offre une protection maximale pour une conduite à la fois dynamique et sécurisée.",
					en: "Designed for both adventure and work, this vehicle offers excellent off-road capability along with a large load capacity. Its high-performance off-road chassis, developed to the strictest international standards, ensures strength and reliability, backed by a 5-year or 150,000 km warranty. Its widened, reinforced structure, paired with precise steering, guarantees optimal control on every terrain. On the safety and comfort side, nothing has been left to chance: equipped as standard with ESC and TCS systems, as well as brake assist (EBA) and hill-start assist (HAC), it offers maximum protection for driving that is both dynamic and secure.",
				},
			},
			
		},
	},
];

export function getModeleById(id: string): Modele | undefined {
	return MODELES.find((m) => m.id === id);
}
