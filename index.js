const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1,
        user_id: "kanishka_gupta_13072004",
        email: "kanishka1740.be22@chitkara.edu.in",
        roll_number: "2210991740"
    });
});

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    const user_id = "kanishka_gupta_13072004";
    const email = "kanishka1740.be22@chitkara.edu.in";
    const roll_number = "2210991740";

    let even_numbers = [], odd_numbers = [], alphabets = [], special_characters = [];
    let sum = 0;
    let alpha_concat = "";

    data.forEach(item => {
        if (!isNaN(item)) {
            const num = Number(item);
            sum += num;
            (num % 2 === 0 ? even_numbers : odd_numbers).push(item.toString());
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
            alpha_concat += item;
        } else {
            special_characters.push(item);
        }
    });

    let rev_alt_caps = alpha_concat.split('').reverse().map((ch, idx) =>
        idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join('');

    res.status(200).json({
        is_success: true,
        user_id,
        email,
        roll_number,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string: rev_alt_caps
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


