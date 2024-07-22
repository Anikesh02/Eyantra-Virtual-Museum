//this would be the object shape for storing the questions  
//you can change the questions to your own taste or even add more questions..
const questions = [
    {
        question: "According to the passage, how was Kubera initially depicted in Vedic literature?",
        image:"../../static/assets/quiz/kubera_quiz.jpeg",
        optionA: "God of wealth and protector of the North",
        optionB: " Creator of the universe",
        optionC: "Chief of spirits of darkness and lord of thieves",
        optionD: "Guardian of the underworld",
        correctOption: "optionC",
        explanation:"In Vedic literature, Kubera was associated with the darker aspects, being the lord of thieves and spirits of darkness. His role as the god of wealth and prosperity developed later in Puranic and Epic literature."
    },

    {
        question: "How is Kubera depicted in the statue according to the passage?",
        image:"../../static/assets/quiz/kubera_quiz.jpeg",
        optionA: "Standing tall and slender, holding a sword",
        optionB: "Seated in bhadrasana (butterfly pose) with a round belly",
        optionC: "Kneeling in prayer with his hands clasped",
        optionD: "Riding a chariot drawn by four horses",
        correctOption: "optionB",
        explanation:"In statue Kubera is seated in bhadrasana (butterfly pose) with a round belly. This posture signifies a position of ease and wealth, aligning with Kubera's role as the god of prosperity."
    },

    {
        question: "What is the significance of Kubera's bow-like mustache in the context of Hindu iconography?",
        image:"../../static/assets/quiz/kubera_quiz.jpeg",
        optionA: "It represents his power and authority.",
        optionB: "It symbolizes his connection to the royal court.",
        optionC: "It signifies his association with merchants and traders. ",
        optionD: "It is a stylistic element unique to the Mathura school of art.",
        correctOption: "optionC",
        explanation:"The mustache might symbolize Kubera's association with wealth and prosperity, aligning with his role as the god of merchants and traders. "
    },

    {
        question: "What does the term 'Prabhavali' signify in the context of Jain art?",
        image:"../../static/assets/quiz/prabhavali_quiz.jpg",
        optionA: "Ornate sculpture of a single deity",
        optionB: "Ornate arch depicting stories and deities ",
        optionC: "Ritualistic offering stand",
        optionD: "Symbolic representation of enlightenment",
        correctOption: "optionB",
        explanation:"A Prabhavali (or Prabhavalaya) is a specific type of architectural element in Jain temples, typically an arched frame or halo used to showcase narratives and figures associated with Jain beliefs."
    },

    {
        question: " In the 7th-century CE ceiling slab depicting Vishnu, which unique characteristic distinguishes him from other deities?",
        image:"../../static/assets/quiz/sheshashayiVishnu_quiz.jpeg",
        optionA: "Crowned with a Kirita Mukuta",
        optionB: "Adorned with Yajnopavitam (sacred thread)",
        optionC: "Shown reclining on the serpent Adisesha",
        optionD: "Holding weapons like the chakra and gada",
        correctOption: "optionC",
        explanation:"Vishnu, in his Sheshashayi form, is the only Hindu deity traditionally depicted reclining. This posture signifies his cosmic rest between creation cycles. The other options, while describing elements of Vishnu's adornment or weaponry, are not unique to him and can be found with other deities as well."
    },

    {
        question: "What is the Mutoscope most similar to?",
        image:"../../static/assets/quiz/mutoscope_quiz.jpg",
        optionA: "Projector",
        optionB: "Flipbook",
        optionC: "Phonograph",
        optionD: "Camera",
        correctOption: "optionB",
        explanation:"The Mutoscope, like a flipbook, uses a series of rapidly flipped images to create the illusion of motion."
    },

    {
        question: "What is the significance of the Mutoscope in film history?",
        image:"../../static/assets/quiz/mutoscope_quiz.jpg",
        optionA: "It was the first device to capture sound with moving images.",
        optionB: "It laid the groundwork for early animation techniques.",
        optionC: "It was the first commercially successful motion picture device.",
        optionD: "It was the most portable movie viewing experience.",
        correctOption: "optionB",
        explanation:"The Mutoscope's use of sequential images to create motion is a foundational concept in animation and film."
    },

    {
        question: "Bhairava is considered a form of which Hindu deity?",
        image:"../../static/assets/quiz/bhairava_quiz.jpg",
        optionA: "Vishnu",
        optionB: "Ganesha",
        optionC: "Shiva",
        optionD: "Brahma",
        correctOption: "optionC",
        explanation:"The passage mentions Bhairava's association with Shiva since the Puranic period."
    },

    {
        question: "What does the elephant skin garment Bhairava wears symbolize?",
        image:"../../static/assets/quiz/bhairava_quiz.jpg",
        optionA: "Wealth and prosperity",
        optionB: "Royal authority",
        optionC: "Power over animals",
        optionD: "Detachment from worldly possessions",
        correctOption: "optionD",
        explanation:"Elephant skin, a symbol of ego and worldly attachment, being worn by Bhairava signifies his detachment from these things."
    },

    {
        question: "Bhairava representing a specific aspect of Shiva. Which is it?",
        image:"../../static/assets/quiz/bhairava_quiz.jpg",
        optionA: "Creation (Sarjana Murti)",
        optionB: "Preservation (Sthiti Murti)",
        optionC: "Destruction (Samhara Murti)",
        optionD: "Transformation (Sanhara Murti)",
        correctOption: "optionC",
        explanation:"The passage highlights Bhairava as a form of Shiva's destructive aspect, Samhara Murti."
    },

    {
        question: "What is Vrishanana Yogini's unique physical characteristic that sets her apart from other Yoginis?",
        image:"../../static/assets/quiz/vrishanana_quiz.jpeg",
        optionA: "Seated in Lalitasana pose",
        optionB: " Holding a club and bilva fruit",
        optionC: "Adorned with jewelry",
        optionD: "Having the head of a buffalo",
        correctOption: "optionD",
        explanation:"The artifact highlights Vrishanana Yogini's distinct feature - the head of a buffalo."
    },

    {
        question: "What is the significance of the swan in the sculpture?",
        image:"../../static/assets/quiz/vrishanana_quiz.jpeg",
        optionA: "Symbolic representation of beauty",
        optionB: "Vahan (vehicle) of Vrishanana Yogini",
        optionC: "Material used to create the sculpture",
        optionD: "Offering held by Vrishanana Yogini",
        correctOption: "optionB",
        explanation:"The swan is Vrishanana Yogini's vahana, the animal or mythical creature associated with a deity."
    },


    {
        question: "What is the primary material used to traditionally make Tsho Lham boots?",
        image:"../../static/assets/quiz/tshoLahm_quiz.png",
        optionA: "Wool",
        optionB: "Silk cloth",
        optionC: "Leather",
        optionD: "Canvas",
        correctOption: "optionB",
        explanation:"Silk cloth is the original material for Tsho Lham, highlighting its cultural significance."
    },

    {
        question: "In Bhutanese culture, what role do Tsho Lham boots traditionally play?",
        image:"../../static/assets/quiz/tshoLahm_quiz.png",
        optionA: "Everyday footwear",
        optionB: "Festive attire for men",
        optionC: "Footwear for working in the fields",
        optionD: "Symbolic offering in religious ceremonies",
        correctOption: "optionB",
        explanation:"Tsho Lham are boots worn by men during festive seasons, indicating their role in special occasions."
    },

    {
        question: "What historical event does the Shaheed Bhaale Sultan Smarak commemorate?",
        image:"../../static/assets/quiz/saheedSmarak_quiz.jpg",
        optionA: "Sepoy Mutiny of 1857",
        optionB: "Indian Independence Movement of the 20th century",
        optionC: "A local uprising unrelated to British rule",
        optionD: "World War I",
        correctOption: "optionA",
        explanation:"The monument marks a revolt during the 200-year British rule, aligning with the Sepoy Mutiny of 1857."
    },

    {
        question: "Why might Ganesh be considered an important deity in the Hindu religion?",
        image:"../../static/assets/quiz/ganesh_quiz.png",
        optionA: "He is associated with war and destruction.",
        optionB: "He is worshipped as a remover of obstacles and a bringer of good beginnings.",
        optionC: "He is the creator god in Hindu mythology.",
        optionD: "He is only worshipped in South India.",
        correctOption: "optionB",
        explanation:" Ganesh being worshipped before any other deity and as a remover of obstacles, aligning with his significance in Hinduism."
    },

    {
        question: " In Hinduism, who is traditionally associated with the Vajra?",
        image:"../../static/assets/quiz/vajra_quiz.jpeg",
        optionA: "Ganesha",
        optionB: "Indra (King of Gods)",
        optionC: "Shiva",
        optionD: "Vishnu",
        correctOption: "optionB",
        explanation:"The Vajra being wielded by Indra, the king of Gods, in Hinduism."
    },

    {
        question: "What is the primary function of the Stone Chariot?",
        image:"../../static/assets/quiz/stoneChariot_quiz.jpg",
        optionA: " Entrance gate to the Vijaya Vitthala Temple",
        optionB: "Shrine dedicated to Garuda, Vishnu's vehicle ",
        optionC: "Reservoir for water storage",
        optionD: "Observation tower for the surrounding area",
        correctOption: "optionB",
        explanation:" the Stone Chariot is a temple dedicated to Garuda."
    },

    {
        question: " Why might the Stone Chariot be nicknamed 'The Jewel of Hampi'?",
        image:"../../static/assets/quiz/stoneChariot_quiz.jpg",
        optionA: "It is the tallest structure within the temple complex.",
        optionB: " It is made from precious stones and metals.",
        optionC: "It showcases exceptional craftsmanship and is considered a significant landmark.",
        optionD: " It is the only chariot structure dedicated to Garuda in India.",
        correctOption: "optionC",
        explanation:"It emphasizes the temple's architectural marvel and its place among other famous chariots, the nickname likely reflects its beauty and importance within Hampi."
    },

    {
        question: "What is the primary purpose of the Ara Palang?",
        image:"../../static/assets/quiz/horn_quiz.jpeg",
        optionA: "To hold decorative items",
        optionB: "To store locally brewed alcohol (Ara)",
        optionC: "To serve food",
        optionD: "As a musical instrument",
        correctOption: "optionB",
        explanation:" the Ara Palang is a traditional container used to hold locally brewed alcohol."
    },

    {
        question: "What figure does the artifact represent?",
        image:"../../static/assets/quiz/buddha_quiz.jpeg",
        optionA: "A Hindu deity",
        optionB: "Shakyamuni Gautama Buddha",
        optionC: "A Chinese philosopher",
        optionD: "A historical Indian emperor",
        correctOption: "optionB",
        explanation:"the artifact is a statue of Shakyamuni Gautama Buddha."
    },

    {
        question: "What role did Shakyamuni Gautama Buddha play in the development of Buddhism?",
        image:"../../static/assets/quiz/buddha_quiz.jpeg",
        optionA: " He was a follower who spread existing teachings.",
        optionB: "He is considered the founder of Buddhism. ",
        optionC: "He was a military leader who converted to Buddhism.",
        optionD:" He created a new branch of Hinduism.",
        correctOption: "optionB",
        explanation:""
    },

    {
        question: "Before Buddha statues were used, how was he worshipped",
        image:"../../static/assets/quiz/buddha_quiz.jpeg",
        optionA: " Through large, detailed paintings",
        optionB: "By chanting mantras",
        optionC: " Through symbolic representations",
        optionD: " There was no form of worship before statues.",
        correctOption: "optionC",
        explanation:"Buddha was initially worshipped through symbols before statues emerged."
    },

    {
        question: "The significance of the statue's four heads?",
        image:"../../static/assets/quiz/brahmaOfGoa.jpeg",
        optionA: "They represent the four elements: earth, air, fire, and water",
        optionB: "They symbolize Brahma's role as the creator of the four Vedas.",
        optionC: "They represent his knowledge and awareness of all directions. ",
        optionD: " They depict the four castes in the Hindu social hierarchy.",
        correctOption: "optionC",
        explanation:"The four heads facing all directions symbolize Brahma creating the entire universe."
    },

    {
        question: "From which historical period does the Brahma statue originate?",
        image:"../../static/assets/quiz/brahmaOfGoa.jpeg",
        optionA: " Gupta Empire (Earlier)",
        optionB: "Kadamba era (12th century) ",
        optionC: "Mughal Empire",
        optionD: "British Colonial Era",
        correctOption: "optionB",
        explanation:"The statue originates from the Kadamba era (12th century)."
    }

]

console.log(questions.length);
let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 23) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index];
    // document.getElementById("question-number").innerHTML = questionNumber
    // document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementsByClassName("artifact-image")[0].src = currentQuestion.image;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
    document.getElementsByClassName("explanation")[0].innerHTML = "";

}


function checkForAnswer() {
    resetOptionBackground();
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    // if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
    //     document.getElementById('option-modal').style.display = "flex"
    // }
    
    //  Remove event listeners from all radio spans after the first click
    // const radioSpans = document.querySelectorAll('span');
    //  radioSpans.forEach(otherSpan => {
    //     otherSpan.removeEventListener('click', () => {});  // Empty callback
    //   });

    //checking if checked radio button is same as answer
    options.forEach((option) => {
       
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            const explanationElement = document.getElementsByClassName("explanation")[0];
            console.log(explanationElement);
            explanationElement.innerHTML = currentQuestion.explanation;
            // playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            const explanationElement = document.getElementsByClassName("explanation")[0];
            console.log(explanationElement);
            explanationElement.innerHTML = currentQuestion.explanation;
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


const radioSpans = document.querySelectorAll('span'); 
radioSpans.forEach(span => {
    
    span.addEventListener('click', () => {
        const clickedRadio = span.querySelector('input[type="radio"]');
        // Call your checkAnswer function with the clicked radio's value
        checkForAnswer();
        unCheckRadioButtons();
       
        // Remove event listeners from all radio spans after the first click
        //  radioSpans.forEach(otherSpan => {
        //     otherSpan.removeEventListener('click', () => {});  // Empty callback
        //   });
    });
    });


//called when the next button is called
function handleNextQuestion() {
    // checkForAnswer() //check if player picked right or wrong option

    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 22) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            // handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 300);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = "";
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}
function CheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = true;
    }
}

// function for when all questions being answered
// function handleEndGame() {
//     let remark = null
//     let remarkColor = null

//     // condition check for player remark and remark color
//     if (playerScore <= 3) {
//         remark = "Bad Grades, Keep Practicing."
//         remarkColor = "red"
//     }
//     else if (playerScore >= 4 && playerScore < 7) {
//         remark = "Average Grades, You can do better."
//         remarkColor = "orange"
//     }
//     else if (playerScore >= 7) {
//         remark = "Excellent, Keep the good work going."
//         remarkColor = "green"
//     }
//     const playerGrade = (playerScore / 10) * 100

//     //data to display to score board
//     document.getElementById('remarks').innerHTML = remark
//     document.getElementById('remarks').style.color = remarkColor
//     document.getElementById('grade-percentage').innerHTML = playerGrade
//     document.getElementById('wrong-answers').innerHTML = wrongAttempt
//     document.getElementById('right-answers').innerHTML = playerScore
//     document.getElementById('score-modal').style.display = "flex"

// }

// //closes score modal, resets game and reshuffles questions
// function closeScoreModal() {
//     questionNumber = 1
//     playerScore = 0
//     wrongAttempt = 0
//     indexNumber = 0
//     shuffledQuestions = []
//     NextQuestion(indexNumber)
//     document.getElementById('score-modal').style.display = "none"
// }

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"}

