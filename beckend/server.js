const express = require('express');
const app=express();
const port=process.env.PORT || 3000;
const OpenAI = require ("openai");
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
require('dotenv').config()
app.get('/', (req, res)=>{
    res.send("this is working")
})

const openai = new OpenAI(
    {
        apiKey: process.env.openAi_KEY // This is the default and can be omitted
    }
);
app.post('/generateOffer', async (req, res) => {
    const request = req.body.text
    console.log(request)
    try {
        const stream = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-0125:personal:itappsoffer:9iNxvFwS",
            messages: [{ role: "user", content: ` ${request}. Daca clientul nu a mentionat trebuie evidentiata sectiunea financiara: cum se solicită bani de la administratorii aplicației, modalitati de plata, generarea automată a facturilor și posibilitatea clientului de a descărca factura generată. Vreau sa imi creezi o oferta pe baza inputurilor de mai sus. Vreau ca oferta sa contina 4 sectiunii: 1. Scopul documentului unde vor fi explicate tehnologiile folosite 2. Propunere structura pe baza fine-tuning-ului pe care ai fost antrenat 3. Sugestii suplimentare precum generare automata de facturi. 4. Pretul si timpul de implementare. Vreau sa fie cat mai detaliata fiecare sectiune` }],
            stream: true,
        });
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        for await (const chunk of stream) {
            res.write(chunk.choices[0]?.delta?.content || "");
        }
        return res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});
app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
})