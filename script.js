let medicaments = JSON.parse(localStorage.getItem("medicaments")) || [];
let recommandations = JSON.parse(localStorage.getItem("recommandations")) || [];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultList = document.getElementById("resultList");

const medForm = document.getElementById("medForm");
const allMeds = document.getElementById("allMeds");

const doctorForm = document.getElementById("doctorForm");
const doctorList = document.getElementById("doctorList");

function saveMedicaments() {
  localStorage.setItem("medicaments", JSON.stringify(medicaments));
}

function saveRecommandations() {
  localStorage.setItem("recommandations", JSON.stringify(recommandations));
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.classList.remove("active"));

  document.getElementById(sectionId).classList.add("active");
}

function afficherResultats(resultats) {
  resultList.innerHTML = "";

  if (resultats.length === 0) {
    resultList.innerHTML = "<p>Aucun médicament disponible trouvé.</p>";
    return;
  }

  resultats.forEach((m) => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    card.innerHTML = `
      <h3>${m.medicament}</h3>
      <p><strong>Pharmacie:</strong> ${m.pharmacie}</p>
      <p><strong>Ville:</strong> ${m.ville}</p>
      <p><strong>Adresse:</strong> ${m.adresse}</p>
      <p><strong>Prix:</strong> ${m.prix} FCFA</p>
      <span class="badge disponible">Disponible</span>
    `;

    resultList.appendChild(card);
  });
}

function rechercherMedicament() {
  const motCle = searchInput.value.toLowerCase().trim();

  if (motCle === "") {
    resultList.innerHTML = "<p>Veuillez entrer un nom de médicament.</p>";
    return;
  }

  const resultats = medicaments.filter(m =>
    m.medicament.toLowerCase().includes(motCle) &&
    m.stock === "Disponible"
  );

  afficherResultats(resultats);
}

searchBtn.addEventListener("click", rechercherMedicament);

searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    rechercherMedicament();
  }
});

medForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const medicament = document.getElementById("medicament").value;
  const pharmacie = document.getElementById("pharmacie").value;
  const ville = document.getElementById("ville").value;
  const adresse = document.getElementById("adresse").value;
  const prix = document.getElementById("prix").value;
  const stock = document.getElementById("stock").value;

  const nouveau = {
    medicament: medicament,
    pharmacie: pharmacie,
    ville: ville,
    adresse: adresse,
    prix: prix,
    stock: stock
  };

  medicaments.unshift(nouveau);
  saveMedicaments();

  afficherTousMedicaments();
  medForm.reset();
});

function afficherTousMedicaments() {
  allMeds.innerHTML = "";

  if (medicaments.length === 0) {
    allMeds.innerHTML = "<p>Aucun médicament enregistré.</p>";
    return;
  }

  medicaments.forEach((m, index) => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    let badgeClass = m.stock === "Disponible" ? "disponible" : "rupture";

    card.innerHTML = `
      <h3>${m.medicament}</h3>
      <p><strong>Pharmacie:</strong> ${m.pharmacie}</p>
      <p><strong>Ville:</strong> ${m.ville}</p>
      <p><strong>Adresse:</strong> ${m.adresse}</p>
      <p><strong>Prix:</strong> ${m.prix} FCFA</p>
      <span class="badge ${badgeClass}">${m.stock}</span>
      <br><br>
      <button onclick="supprimerMedicament(${index})">Supprimer</button>
    `;

    allMeds.appendChild(card);
  });
}

function supprimerMedicament(index) {
  medicaments.splice(index, 1);
  saveMedicaments();
  afficherTousMedicaments();
}

doctorForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const nom = document.getElementById("medNom").value;
  const conseil = document.getElementById("medConseil").value;

  const rec = {
    nom: nom,
    conseil: conseil,
    date: new Date().toLocaleString()
  };

  recommandations.unshift(rec);
  saveRecommandations();

  afficherRecommandations();
  doctorForm.reset();
});

function afficherRecommandations() {
  doctorList.innerHTML = "";

  if (recommandations.length === 0) {
    doctorList.innerHTML = "<p>Aucune recommandation enregistrée.</p>";
    return;
  }

  recommandations.forEach((r, index) => {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    card.innerHTML = `
      <h3>${r.nom}</h3>
      <p><strong>Conseil:</strong> ${r.conseil}</p>
      <p><strong>Date:</strong> ${r.date}</p>
      <br>
      <button onclick="supprimerRecommandation(${index})">Supprimer</button>
    `;

    doctorList.appendChild(card);
  });
}

function supprimerRecommandation(index) {
  recommandations.splice(index, 1);
  saveRecommandations();
  afficherRecommandations();
}

afficherTousMedicaments();
afficherRecommandations();