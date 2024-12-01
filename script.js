let goals = [];

// Fonction pour ajouter un objectif
function addGoal() {
    const input = document.getElementById('goalInput');
    const newGoal = input.value.trim();

    if (newGoal) {
        goals.push({ text: newGoal, completed: false });
        input.value = ''; // Reset le champ
        renderGoals(); // Rafraîchir la liste
    }
}

// Fonction pour marquer/unmarquer comme accompli
function toggleCompletion(index) {
    goals[index].completed = !goals[index].completed;
    renderGoals();
}

// Fonction pour afficher la liste des objectifs
function renderGoals() {
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = ''; // Clear la liste actuelle

    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.className = 'goal-item';
        
        // Case à cocher
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = goal.completed;
        checkbox.onclick = () => toggleCompletion(index);

        li.appendChild(checkbox);

        // Création du texte
        const textSpan = document.createElement('span');
        textSpan.textContent = goal.text;
        
        // Appliquer le barré si la tâche est complétée
        if (goal.completed) {
            textSpan.style.textDecoration = 'line-through'; // Applique le barré
            textSpan.style.color = '#aaa'; // Change la couleur si accompli
        } else {
            textSpan.style.textDecoration = 'none'; // Enlève le barré
            textSpan.style.color = ''; // Restaure la couleur initiale si non accompli
        }
        li.appendChild(textSpan); // Ajoute le texte

        // Bouton de suppression
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×'; // Icône de suppression
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteGoal(index);
        li.appendChild(deleteButton); // Ajoute la croix

        goalList.appendChild(li); // Ajoute l'élément à la liste
    });
}

// Fonction pour supprimer un objectif
function deleteGoal(index) {
    goals.splice(index, 1); // Supprime l'objectif
    renderGoals(); // Rafraîchit la liste
}