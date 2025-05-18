document.addEventListener('DOMContentLoaded', function () {
    // --- Workout Generator ---
    const workouts = [
        '10 Push-Ups, 15 Squats, 30s Plank',
        '20 Jumping Jacks, 10 Burpees, 15 Lunges',
        '15 Sit-Ups, 20 Mountain Climbers, 10 Push-Ups',
        '5 Min Jog, 10 Pull-Ups, 20 Crunches',
        '30s Wall Sit, 20 High Knees, 15 Dips'
    ];
    document.getElementById('generate-workout').onclick = function () {
        const idx = Math.floor(Math.random() * workouts.length);
        document.getElementById('workout-result').textContent = workouts[idx];
    };

    // --- Progress Tracker ---
    const progressForm = document.getElementById('progress-form');
    const progressList = document.getElementById('progress-list');
    progressForm.onsubmit = function (e) {
        e.preventDefault();
        const exercise = progressForm.exercise.value.trim();
        const value = progressForm.value.value.trim();
        if (exercise && value) {
            const li = document.createElement('li');
            li.textContent = `${exercise}: ${value}`;
            progressList.appendChild(li);
            progressForm.reset();
        }
    };

    // --- Motivational Quotes Board ---
    const quotes = [
        'Push yourself, because no one else is going to do it for you.',
        'Success starts with self-discipline.',
        'No pain, no gain!',
        'The body achieves what the mind believes.',
        "Don't limit your challenges. Challenge your limits."
    ];
    let userQuotes = [];
    function showQuote() {
        const allQuotes = quotes.concat(userQuotes);
        const idx = Math.floor(Math.random() * allQuotes.length);
        document.getElementById('quote-display').textContent = allQuotes[idx];
    }
    document.getElementById('new-quote').onclick = showQuote;
    document.getElementById('quote-form').onsubmit = function (e) {
        e.preventDefault();
        const val = document.getElementById('user-quote').value.trim();
        if (val) {
            userQuotes.push(val);
            document.getElementById('user-quote').value = '';
            showQuote();
        }
    };
    showQuote();

    // --- Healthy Recipe Finder ---
    const recipes = [
        { name: 'Grilled Chicken Salad', ingredients: ['2 grilled chicken breasts', 'Mixed greens', 'Cherry tomatoes', 'Cucumber slices', 'Olive oil & balsamic vinegar'] },
        { name: 'Quinoa Veggie Bowl', ingredients: ['1 cup cooked quinoa', 'Steamed broccoli', 'Diced bell pepper', 'Chickpeas', 'Lemon-tahini dressing'] },
        { name: 'Greek Yogurt Parfait', ingredients: ['1 cup Greek yogurt', 'Fresh berries', 'Granola', 'Honey drizzle'] },
        { name: 'Oven-Baked Salmon', ingredients: ['1 salmon fillet', 'Lemon slices', 'Asparagus', 'Olive oil', 'Salt & pepper'] },
        { name: 'Avocado Toast with Egg', ingredients: ['2 slices whole grain bread', '1 ripe avocado', '1-2 eggs (poached or fried)', 'Red pepper flakes', 'Salt & pepper'] },
        { name: 'Turkey & Spinach Wrap', ingredients: ['Whole wheat wrap', 'Sliced turkey breast', 'Fresh spinach', 'Sliced tomato', 'Hummus spread'] },
        { name: 'Veggie Stir-Fry', ingredients: ['Broccoli florets', 'Bell pepper strips', 'Snap peas', 'Carrot slices', 'Low-sodium soy sauce', 'Brown rice (for serving)'] },
        { name: 'Berry Protein Smoothie', ingredients: ['1 cup frozen mixed berries', '1 scoop protein powder', '1 cup almond milk', '1 banana', '1 tbsp chia seeds'] },
        { name: 'Egg White Omelette', ingredients: ['3 egg whites', 'Spinach', 'Diced tomato', 'Feta cheese', 'Black pepper'] },
        { name: 'Chickpea Salad Bowl', ingredients: ['1 can chickpeas (drained & rinsed)', 'Chopped cucumber', 'Cherry tomatoes', 'Red onion', 'Lemon juice & olive oil'] },
        { name: 'Cottage Cheese & Pineapple Snack', ingredients: ['1 cup low-fat cottage cheese', '1/2 cup pineapple chunks', 'Chia seeds (optional)'] },
        { name: 'Sweet Potato & Black Bean Bowl', ingredients: ['1 baked sweet potato', '1/2 cup black beans', 'Corn kernels', 'Salsa', 'Cilantro'] },
        { name: 'Tofu & Broccoli Stir-Fry', ingredients: ['Firm tofu (cubed)', 'Broccoli florets', 'Garlic', 'Soy sauce', 'Brown rice (for serving)'] },
        // NEW RECIPES BELOW
        { name: 'Mediterranean Chickpea Pita', ingredients: ['Whole wheat pita', '1/2 cup chickpeas', 'Diced cucumber', 'Chopped tomato', 'Feta cheese', 'Tzatziki sauce'] },
        { name: 'Banana Oat Pancakes', ingredients: ['1 ripe banana', '2 eggs', '1/2 cup rolled oats', 'Cinnamon', 'Maple syrup (optional)'] },
        { name: 'Shrimp & Avocado Salad', ingredients: ['Cooked shrimp', 'Diced avocado', 'Mixed greens', 'Lime juice', 'Cherry tomatoes', 'Red onion'] },
        { name: 'Spinach & Mushroom Quesadilla', ingredients: ['Whole wheat tortilla', 'Fresh spinach', 'Sliced mushrooms', 'Shredded cheese', 'Salsa'] },
        { name: 'Peanut Butter Energy Bites', ingredients: ['1 cup rolled oats', '1/2 cup peanut butter', '1/3 cup honey', '1/4 cup chocolate chips', '1/4 cup flaxseed'] },
        { name: 'Zucchini Noodle Stir-Fry', ingredients: ['Zucchini noodles', 'Bell pepper', 'Carrot', 'Edamame', 'Soy sauce', 'Sesame oil'] },
        { name: 'Salmon & Quinoa Bowl', ingredients: ['Baked salmon', '1 cup cooked quinoa', 'Steamed broccoli', 'Avocado slices', 'Lemon wedge'] },
        { name: 'Apple Cinnamon Overnight Oats', ingredients: ['1/2 cup rolled oats', '1/2 cup almond milk', 'Diced apple', 'Cinnamon', 'Chia seeds', 'Maple syrup'] },
        { name: 'Turkey & Veggie Lettuce Wraps', ingredients: ['Ground turkey', 'Diced bell pepper', 'Chopped onion', 'Romaine lettuce leaves', 'Soy sauce', 'Ginger'] },
        { name: 'Berry Chia Pudding', ingredients: ['1 cup almond milk', '3 tbsp chia seeds', '1/2 cup mixed berries', 'Honey or maple syrup'] }
    ];
    document.getElementById('find-recipe').onclick = function () {
        const idx = Math.floor(Math.random() * recipes.length);
        const recipe = recipes[idx];
        document.getElementById('recipe-result').innerHTML =
            `<strong>${recipe.name}</strong><br><span style='font-weight:bold;'>Ingredients:</span><br><ul>` +
            recipe.ingredients.map(ing => `<li>${ing}</li>`).join('') +
            '</ul>';
    };

    // --- Leaderboard / Challenge Wall ---
    const leaderboardForm = document.getElementById('challenge-form');
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardForm.onsubmit = function (e) {
        e.preventDefault();
        const challenge = document.getElementById('challenge-name').value.trim();
        const score = document.getElementById('challenge-score').value.trim();
        if (challenge && score) {
            const li = document.createElement('li');
            li.textContent = `${challenge}: ${score}`;
            leaderboardList.appendChild(li);
            leaderboardForm.reset();
        }
    };


    const avatars = [
        // Sports & Fitness
        '🏋️‍♂️', '🏋️‍♀️', '🏋️', '🤸‍♂️', '🤸‍♀️', '🤸', '🚴‍♂️', '🚴‍♀️', '🚴', '🏃‍♂️', '🏃‍♀️', '🏃',
        '🧘‍♂️', '🧘‍♀️', '🧘', '🤾‍♂️', '🤾‍♀️', '🤾', '🏊‍♂️', '🏊‍♀️', '🏊', '🤼‍♂️', '🤼‍♀️', '🤼',
        '🤽‍♂️', '🤽‍♀️', '🤽', '🤹‍♂️', '🤹‍♀️', '🤹', '⛹️‍♂️', '⛹️‍♀️', '⛹️', '🏌️‍♂️', '🏌️‍♀️', '🏌️',
        '🚣‍♂️', '🚣‍♀️', '🚣', '🏇', '🏂', '⛷️', '🏄‍♂️', '🏄‍♀️', '🏄', '🛹', '🛷',
        // Professions & Fun
        '🧑‍🎤', '🧑‍🚀', '🧑‍🍳', '🧑‍🎓', '🧑‍🔬', '🧑‍💻', '🧑‍🏫', '🧑‍🚒', '🧑‍✈️', '🧑‍⚖️',
        '🦸‍♂️', '🦸‍♀️', '🦸', '🦹‍♂️', '🦹‍♀️', '🦹', '🧙‍♂️', '🧙‍♀️', '🧙', '🧚‍♂️', '🧚‍♀️', '🧚',
        '🧛‍♂️', '🧛‍♀️', '🧛', '🧟‍♂️', '🧟‍♀️', '🧟', '🧞‍♂️', '🧞‍♀️', '🧞', '🧜‍♂️', '🧜‍♀️', '🧜',
        // Diversity, Abilities, Accessories
        '🧑‍🦽', '🧑‍🦼', '🧑‍🦯', '🧑‍🍼', '🧑‍🤝‍🧑', '🧑‍🤝‍🧑', '🧑‍🦰', '🧑‍🦱', '🧑‍🦳', '🧑‍🦲',
        '💪', '🦵', '🦶', '👟', '🎽', '🥇', '🥈', '🥉', '🧢', '🎒', '🧤', '🧦', '🦺',
        // Faces & Expressions
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', 
        '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', 
        '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', 
        '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', 
        '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', 
        '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', 
        '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖',
        // Animals for fun (expanded)
        '🐻', '🐼', '🐨', '🦁', '🐯', '🐶', '🐱', '🐵', '🐸', '🐧', '🐦', '🐤',
        '🐔', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🦢', '🦩', '🦚', '🦜',
        '🦄', '🐴', '🦓', '🦌', '🐂', '🐃', '🐄', '🐖', '🐗', '🐏', '🐑', '🐐',
        '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐁', '🐀', '🐇', '🐿️', '🦔',
        '🦦', '🦨', '🦡', '🦫', '🦥', '🦦', '🦘', '🦡', '🦃', '🦚', '🦜', '🦢'
    ]; // (end of any array, but this avatars array is no longer used, so remove it entirely)
    // --- Wellness Tips Calendar ---
    const tips = [
        'Drink at least 8 cups of water today.',
        'Try a 10-minute stretch break.',
        'Eat a fruit or vegetable with every meal.',
        'Take a brisk 20-minute walk.',
        'Practice deep breathing for 2 minutes.'
    ];
    document.getElementById('new-tip').onclick = function () {
        const idx = Math.floor(Math.random() * tips.length);
        document.getElementById('calendar-tips').textContent = tips[idx];
    };
    // Show a tip on load
    document.getElementById('new-tip').click();
});