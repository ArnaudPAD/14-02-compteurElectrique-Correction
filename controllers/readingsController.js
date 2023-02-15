const path = require("path");
const fs = require("fs");
const dateformat = Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "medium",
});
// Import du modèle Reading
const Reading = require("../models/Readings");

const readingController = {
  /**
   * Création d'un relevé
   */
  createReading(req, res) {
    const { kwh, adresse, id } = req.body;

    // Validation
    if (typeof kwh !== "number" || kwh < 0) {
      return res.status(422).json({ error: "kwh doit être un nombre positif" });
    }

    if (typeof adresse !== "string") {
      return res
        .status(422)
        .json({ error: "adresse doit être une chaine de caractères" });
    }

    if (typeof id !== "number") {
      return res.status(422).json({ error: "id doit être un nombre" });
    }

    // Création du fichier et du dossier si nécessaire
    const date = new Date();

    // Création d'une nouvelle donnée à mettre dans la BDD à partir du schéma Reading
    const newReading = new Reading({
      date: date,
      compteur: id,
      address: adresse,
      consomation: kwh,
    });
    // Sauvegardé dans la BDD le nouveau modèle crée
    newReading.save((err) => {
      if (err) {
        res.status(404).json({ message: "Erreur" });
      } else {
        res.json({ message: "Compteur ajouté" });
      }
    });
  },

  /**
   * Récupérer la liste des relevés pour un compteur
   */
  getReadings(req, res) {
    // Récupération de l'id dans l'URL
    // On le converti en nombre pour eviter les valeurs interdites
    const id = Number(req.params.id);

    // Vérification de l'id
    // On vérifique la conversion en nombre ait réussi
    if (isNaN(id)) {
      return res.status(422).json({ error: "L'id est invalide." });
    }
    // Lancement d'une opération CRUD sur la BDD qui va récupérer un reading avec l'id de compteur mis en paramètre
    Reading.findOne({ compteur: id }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).json({ message: "Erreur" });
      } else {
        // Renvoi de la data trouvée dans la BDD
        res.json(data);
      }
    });
  },

  deleteReading(req, res) {
    const id = Number(req.params.id);

    // Remplacez la ligne du dessus par celle-ci et essayez
    // une requête sur http://localhost:3000/releve/4/..%2F..%2Fapp.js
    //const fileName = req.params.fileName;

    if (isNaN(id)) {
      return res.status(422).json({ error: "L'id est invalide." });
    }
    // Lancement de l'opération deleteOne sur la collection Readings collection qu iva supprimer le compteur de l'id sélectionné en paramètre
    Reading.deleteOne({ compteur: id }, (err) => {
      if (err) {
        console.log(err);
        res.status(404).json({ message: "Erreur" });
      } else {
        res.json({ message: "Le compteur n° " + id + " a bien été supprimé" });
      }
    });
  },
};

module.exports = readingController;
