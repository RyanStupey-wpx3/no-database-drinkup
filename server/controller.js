let cocktailsfrombackend = []
let id = 0;

// res.status(404).end(), stops data flow due to 

module.exports = {

    create: (req, res) => {
        let {strDrink, strDrinkThumb} = req.body;
        cocktailsfrombackend.push({strDrink, strDrinkThumb , id})
        id++
        res.status(200).send(cocktailsfrombackend)
    }, 

    get_drinks_by_name: (req, res) => {
        res.status(200).send(cocktailsfrombackend)
    },

    

    update: (req, res) => {
        let {text} = req.body
        const updateId = req.params.id;
        // assigns constant variable to req.params.id which comes from url "/api/:id"
        const messageIndex = messages.findIndex((messages) => {
            // find the Index of the messages object with the id that matches the parameters from the url
         return messageIndex.id == updateId
        })

        let message = messages[messageIndex];

        message = {
            id: message.id,
            text: text || message.text,
            time: message.time
            // include all details In this message object
        }
            res.status(200).send(messages)
        // still have to define what to send to front end
        
    },

    delete: (req, res) => {
        console.log('from delete', req.params.id)

        const deleteId = req.params.id
         cocktailsfrombackend.forEach((element, index) => {
                if (element.id == deleteId){
                     cocktailsfrombackend.splice(index, 1)
                } 
        });
        console.log('cocktailsfrombackend', cocktailsfrombackend)
   
    res.status(200).send(cocktailsfrombackend)
    }


}