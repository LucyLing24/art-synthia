import mango from "../Assets/mango.png"
const items = [
    {
        id: "000",
        name: "Default",
        settings: {
            "character_details": "default",
            "game_type": "default",
            "render_style": "default",
            "background_story": "default",
        },
        details: {
            age: "default",
            sex: "default",
            height: "default",
            weight: "default",
            Game_Type: "default",
            Background_Story: "default",
        },
        keywords: ["keyword 1","keyword 2"],
    },
    {
        id: "001",
        name: "Mango",
        picture: mango,
        settings: {
            "name": "Mango",
            "character_details": "Mango is a dog",
            "game_type": {
                "value": "Role-Playing Game (RPG)",
                "label": "Role-Playing Game (RPG)"
            },
            "render_style": {
                "value": "Ethereal Odyssey",
                "label": "Ethereal Odyssey"
            },
            "background_story": "Mango wants eat mangoes",
            "id": "001"
        },
        details: {
            "name": "Mango",
            "species": "dog",
            "personality": "playful and vibrant",
            "traits": [
                "loyalty",
                "friendliness",
                "sense of adventure"
            ],
            "gameType": "Role-Playing Game (RPG)",
            "abilities": "controlled and developed by players",
            "skills": "developed throughout the game",
            "renderStyle": "Ethereal Odyssey",
            "appearance": "mystical and otherworldly",
            "powers": [
                "magical",
                "ethereal"
            ],
            "backgroundStory": "strong desire to eat mangoes",
            "comicalTrait": true,
            "humor": "adds a touch of humor",
            "overallDescription": "charming dog character with a playful nature and potentially unique abilities"
        },
        keywords: [
            "Mango",
            " dog",
            " playful",
            " vibrant",
            " loyalty"
        ],
        summary: "Mango is a dog in the game. With a name like Mango, it suggests a playful and vibrant personality. As a dog character, Mango might exhibit loyalty, friendliness, and a sense of adventure. The game type for Mango is a Role-Playing Game (RPG), which indicates that players will have the opportunity to control and develop Mango's abilities and skills throughout the game. The character's render style is called Ethereal Odyssey, implying a mystical and otherworldly appearance. Perhaps Mango possesses magical or ethereal powers within the game. The background story reveals Mango's strong desire to eat mangoes, which could be interpreted as a comical and endearing trait, adding a touch of humor to the character. Overall, Mango seems to be a charming dog character with a playful nature and potentially unique abilities in the game."
    },
]

export default items
