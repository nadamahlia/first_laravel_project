<?php
namespace Database\Seeders;

use App\Models\Family;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class DemoProductsSeeder extends Seeder
{
    public function run(): void
    {
        // Récupérer les utilisateurs qui peuvent publier des annonces.
        $owners = User::where('role', 'user')->pluck('id')->all();

        // Si aucun utilisateur normal n'existe, utiliser les comptes existants.
        if (empty($owners)) {
            $owners = User::pluck('id')->all();
        }

        if (empty($owners)) {
            throw new RuntimeException(
                'Crée au moins un compte avant de lancer ce seeder.'
            );
        }

        // 100 produits de démonstration.
        // Chaque ligne contient : nom, famille, prix en DA, description.
        $items = [
            // Téléphones (1–10)
            ["Samsung Galaxy A55", "Téléphones", 95000, "Smartphone performant avec écran AMOLED et appareil photo polyvalent."],
            ["iPhone 13 128 Go", "Téléphones", 125000, "iPhone avec puce A15, Face ID et stockage de 128 Go."],
            ["Redmi Note 13", "Téléphones", 48000, "Téléphone avec grand écran, bonne autonomie et charge rapide."],
            ["Oppo Reno 11 F", "Téléphones", 78000, "Smartphone élégant adapté aux photos et à un usage quotidien."],
            ["Realme C67", "Téléphones", 42000, "Téléphone abordable avec grand écran et batterie longue durée."],
            ["Samsung Galaxy S22", "Téléphones", 110000, "Smartphone haut de gamme avec écran Dynamic AMOLED."],
            ["iPhone 12 64 Go", "Téléphones", 85000, "iPhone compact avec Face ID et double appareil photo."],
            ["Tecno Camon 30", "Téléphones", 53000, "Smartphone orienté photographie avec écran lumineux."],
            ["Infinix Note 40", "Téléphones", 57000, "Téléphone avec grande batterie et écran fluide."],
            ["Nokia G22", "Téléphones", 30000, "Smartphone pratique pour les appels et les tâches quotidiennes."],

            // Informatique (11–20)
            ["Lenovo ThinkPad T14", "Informatique", 115000, "Ordinateur portable professionnel adapté au travail et aux études."],
            ["HP ProBook 450 G9", "Informatique", 138000, "Portable professionnel pour la bureautique et le développement."],
            ["Dell Latitude 5420", "Informatique", 120000, "Ordinateur robuste avec clavier confortable et connectivité complète."],
            ["MacBook Air M1", "Informatique", 165000, "Ordinateur léger avec puce Apple M1 et bonne autonomie."],
            ["Asus VivoBook 15", "Informatique", 105000, "Portable polyvalent pour les études et les tâches courantes."],
            ["Acer Aspire 5", "Informatique", 99000, "Ordinateur portable polyvalent pour la maison et le bureau."],
            ["PC gaming Ryzen 5", "Informatique", 185000, "Ordinateur fixe destiné aux jeux et aux applications gourmandes."],
            ["Écran Samsung 24 pouces", "Informatique", 32000, "Moniteur Full HD pour le travail, les études ou le divertissement."],
            ["Clavier mécanique RGB", "Informatique", 8500, "Clavier mécanique rétroéclairé pour la saisie et le gaming."],
            ["Souris sans fil Logitech", "Informatique", 4500, "Souris sans fil ergonomique pour ordinateur portable ou fixe."],

            // Électroménager (21–30)
            ["Machine à laver Samsung 8 kg", "Électroménager", 92000, "Machine à laver familiale avec plusieurs programmes de lavage."],
            ["Réfrigérateur Condor 400 L", "Électroménager", 118000, "Réfrigérateur spacieux adapté aux besoins d'une famille."],
            ["Micro-ondes Iris 25 L", "Électroménager", 18500, "Micro-ondes pratique pour réchauffer et préparer les repas."],
            ["Aspirateur Rowenta", "Électroménager", 16500, "Aspirateur domestique pour l'entretien des sols et des tapis."],
            ["Mixeur Moulinex", "Électroménager", 7500, "Mixeur pour préparer des soupes, sauces et boissons."],
            ["Cafetière électrique", "Électroménager", 6800, "Cafetière électrique simple pour préparer le café à domicile."],
            ["Friteuse à air 5 L", "Électroménager", 22000, "Friteuse sans huile avec panier de grande capacité."],
            ["Climatiseur 12000 BTU", "Électroménager", 79000, "Climatiseur destiné à rafraîchir une pièce de taille moyenne."],
            ["Chauffage électrique", "Électroménager", 9500, "Chauffage d'appoint pour les journées froides."],
            ["Fer à repasser vapeur", "Électroménager", 5800, "Fer à vapeur pour un repassage quotidien efficace."],

            // Maison (31–40)
            ["Canapé trois places", "Maison", 68000, "Canapé confortable pour aménager un salon."],
            ["Table à manger six places", "Maison", 45000, "Table familiale pour les repas et les réunions."],
            ["Matelas deux places", "Maison", 28000, "Matelas confortable pour un lit double."],
            ["Bibliothèque en bois", "Maison", 17500, "Meuble de rangement pour livres et objets décoratifs."],
            ["Bureau d'étude", "Maison", 22000, "Bureau pratique pour travailler ou étudier à domicile."],
            ["Lampe de chevet", "Maison", 3200, "Lampe compacte pour une chambre à coucher."],
            ["Ensemble de rideaux", "Maison", 6500, "Paire de rideaux pour décorer et habiller les fenêtres."],
            ["Service de vaisselle 24 pièces", "Maison", 7800, "Service de table pour les repas quotidiens."],
            ["Tapis de salon 2 x 3 m", "Maison", 14500, "Tapis décoratif pour apporter du confort au salon."],
            ["Miroir mural décoratif", "Maison", 5500, "Miroir mural pour une entrée ou une chambre."],

            // Mode (41–50)
            ["Veste en jean pour femme", "Mode", 6500, "Veste en jean facile à porter au quotidien."],
            ["Robe de soirée", "Mode", 9500, "Robe élégante pour une cérémonie ou une occasion spéciale."],
            ["Sac à main en cuir", "Mode", 12000, "Sac à main avec compartiments pour les essentiels."],
            ["Nike Air Max", "Mode", 18500, "Chaussures de sport au design classique et confortable."],
            ["Adidas Run", "Mode", 12500, "Baskets adaptées à la marche et aux activités quotidiennes."],
            ["Montre Casio", "Mode", 7500, "Montre classique pour un usage quotidien."],
            ["Lunettes de soleil UV400", "Mode", 4200, "Lunettes de soleil conçues pour protéger les yeux des UV."],
            ["Portefeuille en cuir", "Mode", 3500, "Portefeuille compact pour cartes et billets."],
            ["Hijab jersey premium", "Mode", 1800, "Hijab en jersey doux, adapté à un usage quotidien."],
            ["Chaussures en cuir pour homme", "Mode", 11000, "Chaussures classiques adaptées aux tenues formelles."],

            // Sport et plein air (51–60)
            ["Tapis de yoga", "Sport et plein air", 2800, "Tapis antidérapant pour le yoga et les exercices au sol."],
            ["Paire d'haltères de 5 kg", "Sport et plein air", 4200, "Haltères pour les entraînements musculaires à domicile."],
            ["Vélo VTT 26 pouces", "Sport et plein air", 38000, "Vélo tout-terrain pour les sorties et les loisirs."],
            ["Ballon de football taille 5", "Sport et plein air", 3200, "Ballon de football pour les entraînements et les matchs."],
            ["Raquette de tennis", "Sport et plein air", 7800, "Raquette destinée aux joueurs débutants et intermédiaires."],
            ["Corde à sauter", "Sport et plein air", 900, "Accessoire compact pour les exercices cardio."],
            ["Tente de camping deux personnes", "Sport et plein air", 12500, "Tente compacte pour les sorties en plein air."],
            ["Sac de randonnée 40 L", "Sport et plein air", 8500, "Sac à dos avec compartiments pour les randonnées."],
            ["Trottinette pliable", "Sport et plein air", 16000, "Trottinette pliable pour les déplacements et les loisirs."],
            ["Gants de boxe 12 oz", "Sport et plein air", 4500, "Gants pour les séances de boxe et d'entraînement."],

            // Jeux et électronique (61–70)
            ["PlayStation 5 Slim", "Jeux et électronique", 125000, "Console de jeu de salon avec stockage rapide."],
            ["PlayStation 4 500 Go", "Jeux et électronique", 48000, "Console de génération précédente pour les jeux vidéo."],
            ["Manette DualSense", "Jeux et électronique", 14500, "Manette sans fil compatible avec la PlayStation 5."],
            ["Nintendo Switch OLED", "Jeux et électronique", 79000, "Console hybride portable et de salon avec écran OLED."],
            ["Casque gaming HyperX", "Jeux et électronique", 11500, "Casque avec microphone pour jouer et communiquer en ligne."],
            ["Webcam Full HD", "Jeux et électronique", 6500, "Webcam pour les visioconférences et les cours à distance."],
            ["Téléviseur LED 43 pouces", "Jeux et électronique", 68000, "Téléviseur Full HD pour les films, les séries et les chaînes TV."],
            ["Projecteur portable", "Jeux et électronique", 42000, "Projecteur compact pour afficher des vidéos sur grand écran."],
            ["Enceinte Bluetooth JBL", "Jeux et électronique", 9800, "Enceinte portable pour écouter de la musique."],
            ["Écouteurs sans fil Anker", "Jeux et électronique", 7200, "Écouteurs Bluetooth adaptés aux appels et à la musique."],

            // Livres et fournitures (71–80)
            ["Atomic Habits", "Livres et fournitures", 2200, "Livre consacré aux habitudes et à l'amélioration personnelle."],
            ["Le Petit Prince", "Livres et fournitures", 900, "Œuvre littéraire classique adaptée à différents âges."],
            ["Verity de Colleen Hoover", "Livres et fournitures", 1800, "Roman à suspense psychologique."],
            ["Carnet de notes A5", "Livres et fournitures", 500, "Carnet pour les notes, les cours et l'organisation quotidienne."],
            ["Set de stylos gel", "Livres et fournitures", 750, "Lot de stylos gel pour l'écriture et la prise de notes."],
            ["Calculatrice Casio FX-991", "Livres et fournitures", 4800, "Calculatrice scientifique pour les études scientifiques."],
            ["Sac à dos scolaire", "Livres et fournitures", 3800, "Sac avec plusieurs compartiments pour les cours."],
            ["Lampe de bureau LED", "Livres et fournitures", 2600, "Lampe LED pour éclairer un bureau de travail."],
            ["Ramette de papier A4", "Livres et fournitures", 1100, "Papier A4 pour l'impression et les documents."],
            ["Livre d'introduction aux réseaux TCP/IP", "Livres et fournitures", 3200, "Ouvrage d'introduction aux protocoles et aux réseaux informatiques."],

            // Beauté et accessoires (81–90)
            ["Parfum femme 100 ml", "Beauté et accessoires", 6500, "Parfum féminin pour une utilisation quotidienne ou les sorties."],
            ["Parfum homme 100 ml", "Beauté et accessoires", 6200, "Parfum masculin dans un flacon de 100 ml."],
            ["Coffret de soins visage", "Beauté et accessoires", 4800, "Ensemble de produits de soin pour la routine du visage."],
            ["Sèche-cheveux 2200 W", "Beauté et accessoires", 5200, "Sèche-cheveux puissant pour un usage domestique."],
            ["Lisseur céramique", "Beauté et accessoires", 3900, "Lisseur à plaques céramiques pour coiffer les cheveux."],
            ["Tondeuse à barbe", "Beauté et accessoires", 4200, "Tondeuse électrique pour entretenir la barbe."],
            ["Brosse à dents électrique", "Beauté et accessoires", 3500, "Brosse électrique pour l'hygiène bucco-dentaire."],
            ["Sac à dos antivol", "Accessoires", 6800, "Sac à dos avec compartiments et poche sécurisée."],
            ["Batterie externe 20000 mAh", "Accessoires", 5800, "Batterie portable pour recharger des appareils mobiles."],
            ["Chargeur USB-C 65 W", "Accessoires", 3200, "Chargeur USB-C pour les appareils compatibles."],

            // Automobile, réseau et sécurité (91–100)
            ["Pneu automobile 16 pouces", "Automobile", 12500, "Pneu de remplacement pour véhicule compatible."],
            ["Caméra embarquée Full HD", "Automobile", 7800, "Caméra de bord pour enregistrer les déplacements."],
            ["Compresseur automobile portable", "Automobile", 6500, "Compresseur électrique pour regonfler les pneus."],
            ["Siège auto pour bébé", "Automobile", 14500, "Siège pour enfant à choisir selon sa taille et son âge."],
            ["Coffret d'outils 100 pièces", "Bricolage", 8500, "Jeu d'outils pour les réparations et le bricolage."],
            ["Caméra de surveillance Wi-Fi", "Réseau et sécurité", 7200, "Caméra connectée pour la surveillance d'un espace."],
            ["Routeur Wi-Fi 6", "Réseau et sécurité", 13500, "Routeur sans fil pour un réseau domestique compatible."],
            ["Switch Ethernet 8 ports", "Réseau et sécurité", 6800, "Commutateur réseau pour connecter plusieurs équipements Ethernet."],
            ["SSD NVMe 1 To", "Informatique", 14500, "Stockage SSD rapide pour un ordinateur compatible NVMe."],
            ["Imprimante laser monochrome", "Informatique", 29500, "Imprimante noir et blanc adaptée aux documents et aux cours."],
        ];

        $created = 0;

        foreach ($items as $index => [$name, $familyName, $price, $description]) {
            $family = Family::firstOrCreate([
                'name' => $familyName,
            ]);

            $product = Product::firstOrCreate(
                ['name' => $name],
                [
                    'family_id' => $family->id,
                    'image_link' => null,
                    'user_id' => $owners[$index % count($owners)],
                    'price' => $price,
                    'description' => $description,
                    'status' => $index % 10 === 0 ? 'sold' : 'available',
                ]
            );

            if ($product->wasRecentlyCreated) {
                $created++;
            }
        }

        $this->command?->info(
            "{$created} nouveaux produits ajoutés. Les produits de démonstration déjà présents ont été conservés."
        );
    }
}
