const dirtyParanoiaQuestions = [
  { mode: "Echauffement", text: "Qui dans ce groupe degage le plus d'energie de flirt sans le dire ?" },
  { mode: "Echauffement", text: "Qui enverrait le premier message risque a minuit ?" },
  { mode: "Echauffement", text: "Qui parait calme mais est en vrai le plus audacieux ?" },
  { mode: "Echauffement", text: "Qui serait le crush le plus dangereux ici ?" },
  { mode: "Echauffement", text: "Qui rougit le plus vite quand la question devient perso ?" },
  { mode: "Osé", text: "Qui joue l'innocent en public mais est tres direct en prive ?" },
  { mode: "Osé", text: "Qui enverrait le message le plus ose apres minuit ?" },
  { mode: "Osé", text: "Qui serait le plus tente par un jeu de role ?" },
  { mode: "Osé", text: "Qui transformerait un date normal en nuit folle ?" },
  { mode: "Osé", text: "Qui a le plus de presence dans les moments intimes ?" },
  { mode: "Osé", text: "Qui ajoute des questions pour faire monter la tension ?" },
  { mode: "Osé", text: "Qui cache surement le souvenir le plus epice ?" },
  { mode: "Osé", text: "Qui peut destabiliser juste avec le regard ?" },
  { mode: "Osé", text: "Qui semble discret mais serait le plus hardi ?" },
  { mode: "Osé", text: "Qui organiserait la soiree la plus memorable ?" },
  { mode: "Chaos", text: "Qui casserait les regles du groupe en premier ?" },
  { mode: "Chaos", text: "Qui pourrait attirer deux personnes en meme temps ?" },
  { mode: "Chaos", text: "Qui disparaitrait une semaine puis reviendrait tres flirty ?" },
  { mode: "Chaos", text: "Qui risquerait de reveler un secret sans faire expres ?" },
  { mode: "Chaos", text: "Qui dit « je m'en fiche » alors que c'est faux ?" },
  { mode: "Chaos", text: "Qui est le plus difficile a ignorer en fin de soiree ?" },
  { mode: "Chaos", text: "Qui transformerait ce jeu en vraie histoire ?" },
  { mode: "Chaos", text: "Qui mettrait le feu avec un seul vocal ?" },
  { mode: "Chaos", text: "Qui serait la plus grosse tentation ce soir ?" },
  { mode: "Chaos", text: "Qui dit « un dernier verre » puis lance le chaos ?" },
  { mode: "Echauffement", text: "Qui a le meilleur poker face quand c'est genant ?" },
  { mode: "Echauffement", text: "Qui se laisse le plus facilement chauffer par le groupe ?" },
  { mode: "Echauffement", text: "Qui trahirait son crush par erreur ?" },
  { mode: "Echauffement", text: "Qui transforme une blague en tension reelle ?" },
  { mode: "Echauffement", text: "Qui garde le mieux le groupe fluide ?" },
  { mode: "Osé", text: "Qui cache probablement une facette surprise ?" },
  { mode: "Osé", text: "Qui ferait le premier pas le plus vite ?" },
  { mode: "Osé", text: "Qui devient jaloux mais le cache parfaitement ?" },
  { mode: "Osé", text: "Qui casse ses propres regles de dating ?" },
  { mode: "Osé", text: "Qui a le regard le plus intense ici ?" },
  { mode: "Osé", text: "Qui tomberait pour la mauvaise personne ?" },
  { mode: "Osé", text: "Qui lance le flirt en premier en soiree ?" },
  { mode: "Osé", text: "Qui garde un secret le plus longtemps ?" },
  { mode: "Osé", text: "Qui poserait la question la plus osée ?" },
  { mode: "Osé", text: "Qui flirte juste pour tester les reactions ?" },
  { mode: "Chaos", text: "Qui creerait un triangle amoureux sans le vouloir ?" },
  { mode: "Chaos", text: "Qui disparait puis revient avec un gros scoop ?" },
  { mode: "Chaos", text: "Qui ecrirait a son ex a 2h du matin ?" },
  { mode: "Chaos", text: "Qui pourrait poster un detail trop prive par erreur ?" },
  { mode: "Chaos", text: "Qui deviendrait le coup de coeur surprise du groupe ?" },
  { mode: "Chaos", text: "Qui changerait ce jeu en session confessions ?" },
  { mode: "Chaos", text: "Qui diviserait la table avec une seule phrase ?" },
  { mode: "Chaos", text: "Qui repart avec les meilleures histoires ?" },
  { mode: "Chaos", text: "Qui transforme une rumeur en gros drama ?" },
  { mode: "Chaos", text: "Qui serait choisi le plus souvent ?" }
];

let currentIndex = 0;
function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `Question ${currentIndex + 1} sur ${dirtyParanoiaQuestions.length}`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionMode").textContent = q.mode;
}
function nextQuestion() { currentIndex = (currentIndex + 1) % dirtyParanoiaQuestions.length; renderQuestion(); }
function previousQuestion() { currentIndex = (currentIndex - 1 + dirtyParanoiaQuestions.length) % dirtyParanoiaQuestions.length; renderQuestion(); }
function randomQuestion() { currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length); renderQuestion(); }
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("prevBtn").addEventListener("click", previousQuestion);
  document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
