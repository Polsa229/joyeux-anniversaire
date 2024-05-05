<?php
$folderPath = './img'; // Chemin du dossier contenant les images
$imageFiles = array();

// Vérifie si le dossier existe
if (is_dir($folderPath)) {
    // Ouvre le dossier
    if ($dh = opendir($folderPath)) {
        // Parcourt tous les fichiers dans le dossier
        while (($file = readdir($dh)) !== false) {
            // Vérifie si le fichier est une image (extensions autorisées : jpg, jpeg, png, gif)
            if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), array('jpg', 'jpeg', 'png', 'gif'))) {
                $imageFiles[] = $file;
            }
        }
        // Ferme le dossier
        closedir($dh);
    }
}

// Renvoie les noms des fichiers d'images au format JSON
echo json_encode($imageFiles);