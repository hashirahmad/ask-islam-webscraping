# [Ask Islam](http://www.askislam.org/) Web Scraping

## Background
Part of my ***Philiosohy of Life*** is greatly inspired by [this](https://en.wikipedia.org/wiki/Mirza_Tahir_Ahmad) great man. I wanted to further enhance my ***Philiosohy of Life*** by listening more to his great wisdom. [This](http://www.askislam.org/) website has about **1120** different questions and answers about all aspects of life. All this content is available in `.mp3` format. <br>
<br>
Now I wanted to ***download*** this using some sort of script instead of mnaully downloading each `.mp3` which will take forever 🙄 and never mind originisation of the content.

## Step 1: Organise all questions in one `json` file for each category
[This](http://www.askislam.org/concepts/god/index.html) is an example of a category page. In this examaple category is: [Home](http://www.askislam.org/index.html)  >  [Concepts](http://www.askislam.org/concepts/index.html)  >  God

Run the following code in **`Developer Tools`** for each category:
```js
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function run() {

    if ( window.issues ) {

        let children = Array.from(
            document
            .getElementById("issues")
            .firstElementChild
            .children
        )
        let catgory = document.
        getElementsByClassName("breadcrumb-navigation")[0].
        innerText

        let json = { [catgory] : [] }

        for ( let c = 0; c < children.length; c++ ) {

            json[catgory].push({
                question: children[ c ].innerText,
                url: children[ c ].firstElementChild.href
            })

        }

        copyTextToClipboard( JSON.stringify( json, null, 4) )
        return json

    }

}
run()
```
This will copy a `JSON` object like below:

```js
{
    "Home > Concepts > God": [
        {
            "question": "Question – Is it possible to remember God even while sleeping?",
            "url": "http://www.askislam.org/concepts/god/question_41.html"
        },
        {
            "question": "Question – What is the distinction of the attributes of God as jamaal and jalaal and their manifestation in Islam and other religions?",
            "url": "http://www.askislam.org/concepts/god/question_74.html"
        },
        {
            "question": "Question – Why does God sometimes refer to Himself as \"I\" and sometimes as \"We\" in the Quran?",
            "url": "http://www.askislam.org/concepts/god/question_91.html"
        },
        {
            "question": "Question – Is it accurate to make the argument that God must exist because there has to be something that preceded us?",
            "url": "http://www.askislam.org/concepts/god/question_214.html"
        },
        {
            "question": "Question – How will Rab relate toward man as he makes constant progress?",
            "url": "http://www.askislam.org/concepts/god/question_228.html"
        },
        {
            "question": "Question – What is meaning of the Quranic verse in Chapter Luqman that warns against associating partners with God (31:14)?",
            "url": "http://www.askislam.org/concepts/god/question_264.html"
        },
        {
            "question": "Question – Can God forgive someone who commits wrong five times a day?",
            "url": "http://www.askislam.org/concepts/god/question_280.html"
        },
        {
            "question": "Question – In the Quran, why does God refer to Himself in the plural?",
            "url": "http://www.askislam.org/concepts/god/question_312.html"
        },
        {
            "question": "Question – In the Quran (61:11), God addresses the believers and says to them to believe in Him. If He was already addressing the believers why does He again tell them to believe in Him in the next verse?",
            "url": "http://www.askislam.org/concepts/god/question_355.html"
        },
        {
            "question": "Question – Is the word \"Allah\" derived from any other Arabic words?",
            "url": "http://www.askislam.org/concepts/god/question_406.html"
        },
        {
            "question": "Question – What response can you give to those athiests who joke, \"From looking at the droughts and floods of the world, it seems as if your God does not know where to send rain.\"?",
            "url": "http://www.askislam.org/concepts/god/question_417.html"
        },
        {
            "question": "Question – How many attributes of God are there?",
            "url": "http://www.askislam.org/concepts/god/question_420.html"
        },
        {
            "question": "Question – What is the best way to develop a love for God?",
            "url": "http://www.askislam.org/concepts/god/question_444.html"
        },
        {
            "question": "Question – What should the response be to someone who says that they don’t want to be a malik (master) of their personal religious affairs because God is supposed to be the malik of everything?",
            "url": "http://www.askislam.org/concepts/god/question_517.html"
        },
        {
            "question": "Question – Is God the ultimate personification of justice?",
            "url": "http://www.askislam.org/concepts/god/question_664.html"
        },
        {
            "question": "Question – Is God offended by jokes that refer to Him?",
            "url": "http://www.askislam.org/concepts/god/question_676.html"
        },
        {
            "question": "Question – How do the differing concepts of God in the different religions influence their followers’ good deeds?",
            "url": "http://www.askislam.org/concepts/god/question_679.html"
        },
        {
            "question": "Question – Will God forgive someone who repeatedly commits errors but also repeatedly seeks forgiveness (taubah) for his errors?",
            "url": "http://www.askislam.org/concepts/god/question_684.html"
        },
        {
            "question": "Question – If God provides the sustenance for all living things, as referenced by the Quran (11:7), then why do some people die of starvation?",
            "url": "http://www.askislam.org/concepts/god/question_687.html"
        },
        {
            "question": "Question – If God is All-Powerful, then why does He allow natural disasters to occur?",
            "url": "http://www.askislam.org/concepts/god/question_694.html"
        },
        {
            "question": "Question – What is the meaning of the name Allah?",
            "url": "http://www.askislam.org/concepts/god/question_718.html"
        },
        {
            "question": "Question – How can God be eternal if everything has a beginning and an end?",
            "url": "http://www.askislam.org/concepts/god/question_734.html"
        },
        {
            "question": "Question – How should one respond to the Buddhist notion that if God supposedly created the Universe in the beginning, and there is no beginning, therefore there is no God?",
            "url": "http://www.askislam.org/concepts/god/question_736.html"
        },
        {
            "question": "Question – Is God close to everyone, including those who do not believe in Him?",
            "url": "http://www.askislam.org/concepts/god/question_855.html"
        },
        {
            "question": "Question – Why do we refer to God as \"Him\"?",
            "url": "http://www.askislam.org/concepts/god/question_863.html"
        },
        {
            "question": "Question – What is the meaning of the Quranic verse, \"Everything vanishes except His face.\" (28:89)?",
            "url": "http://www.askislam.org/concepts/god/question_874.html"
        },
        {
            "question": "Question – How does one find out if God is pleased with oneself or not?",
            "url": "http://www.askislam.org/concepts/god/question_881.html"
        },
        {
            "question": "Question – Why can’t we see God?",
            "url": "http://www.askislam.org/concepts/god/question_990.html"
        },
        {
            "question": "Question – If we are able to see God in Paradise, and Paradise can be experienced on this earth, then is it possible to see God on this earth?",
            "url": "http://www.askislam.org/concepts/god/question_1050.html"
        },
        {
            "question": "Question – Does God know of something if it currently does not exist but will exist in the future?",
            "url": "http://www.askislam.org/concepts/god/question_1057.html"
        },
        {
            "question": "Question – How can God talk without a mouth and see without eyes?",
            "url": "http://www.askislam.org/concepts/god/question_1069.html"
        },
        {
            "question": "Question – How did God come to be?",
            "url": "http://www.askislam.org/concepts/god/question_1072.html"
        },
        {
            "question": "Question – Why don’t Muslims believe in the Trinity of God as the Christians do?",
            "url": "http://www.askislam.org/concepts/god/question_1096.html"
        },
        {
            "question": "Question – How does the Islamic concept of God differ from the Christian concept?",
            "url": "http://www.askislam.org/concepts/god/question_1138.html"
        },
        {
            "question": "Question – Why does a God of love allow such evil to exist in the world today?",
            "url": "http://www.askislam.org/concepts/god/question_1142.html"
        },
        {
            "question": "Question – How can I better communicate the existence of God to those that are scientifically minded?",
            "url": "http://www.askislam.org/concepts/god/question_1158.html"
        },
        {
            "question": "Question – Should poor man’s priority be towards his stomach instead of God?",
            "url": "http://www.askislam.org/concepts/god/question_1194.html"
        },
        {
            "question": "Question – Why do we address Muhammad in our prayers when we say, \"Peace be upon you, oh Prophet\"?",
            "url": "http://www.askislam.org/concepts/god/question_1195.html"
        }
    ]
}
```
This above `JSON` needs to be copied and pasted into one big `JSON` file.

## Step 2: Repeat step 1 for each category
There is about 136 categories, some categories within categories but it should take about an hour or so. 

## Step 3: Check that big `JSON` file is correct format
At this point your big `JSON` file should refelect something like below:
```json
{
    "Concepts": [
        {
            "question": "What is Islam’s view about the differing philosophies of Determinism and Existentialism?",
            "url": "http://www.askislam.org/concepts/question_173.html"
        },
        {
            "question": "What is the difference between Satan and Iblis?",
            "url": "http://www.askislam.org/concepts/question_440.html"
        },
        ...
    ],
    "Concepts > Afterlife": [
        {
            "question": "Did Muhammad say that children who die in childhood will be gathered in a place called Maidan-i-Hashr and then a prophet will be sent to them there, and that those who accept the prophet will go to Heaven?",
            "url": "http://www.askislam.org/concepts/afterlife/question_72.html"
        },
        {
            "question": "Is it possible to make contact with the spirits of the deceased?",
            "url": "http://www.askislam.org/concepts/afterlife/question_86.html"
        },
        {
            "question": "When the Quran refers to \"a punishment in the grave\" is it reffering to the physical grave or to something else?",
            "url": "http://www.askislam.org/concepts/afterlife/question_162.html"
        },
        {
            "question": "Will the soul’s development after death be similar to the embryo’s development in the womb?",
            "url": "http://www.askislam.org/concepts/afterlife/question_163.html"
        },
        ...
    ],
    "Concepts > Angels": [
        {
            "question": "Has the Angel Gabriel ever appeared again after the time of Muhammad?",
            "url": "http://www.askislam.org/concepts/angels/question_295.html"
        },
        {
            "question": "Why do angels take a human form when they appear to people?",
            "url": "http://www.askislam.org/concepts/angels/question_397.html"
        },
        ...
    ],
    "Concepts > Conscience": [
    {
        "question": "Is the conscience implanted by God or created by society?",
        "url": "http://www.askislam.org/concepts/conscience/question_23.html"
    }],
    "Concepts > Creation": [
        {
            "question": "What is Islam’s view of the Christian Creationists?",
            "url": "http://www.askislam.org/concepts/creation/question_21.html"
        },
        {
            "question": "What is the difference between of God \"breathing into Adam\" (Quran, 14:30) and Him \"breathing into a child\" (Quran, 32:10)?",
            "url": "http://www.askislam.org/concepts/creation/question_101.html"
        },
        {
            "question": "Why couldn’t have God created the universe in less than six days?",
            "url": "http://www.askislam.org/concepts/creation/question_123.html"
        },
        ...
    ],
    "Concepts > Destiny": [{
            "question": "Why does God test us if He already knows what the outcome will be?",
            "url": "http://www.askislam.org/concepts/destiny/question_120.html"
        },
        {
            "question": "What is Islam’s concept of destiny?",
            "url": "http://www.askislam.org/concepts/destiny/question_336.html"
        },
        ...
    ],
    "Concepts > Doomsday": [{
            "question": "How can the victory of Islam be glorious when it will come after the destruction of the known civilizations?",
            "url": "http://www.askislam.org/concepts/doomsday/question_195.html"
        },
        {
            "question": "Will the process of man’s creation be repeated after Doomsday?",
            "url": "http://www.askislam.org/concepts/doomsday/question_445.html"
        }
        ...
    ]
}
``` 

## Step 4: Unflat the `JSON` file into categories within categories ...
You will notice that at this point the big `JSON` file is catgorized but partially. Categories must represent a **tree structure** or **hierachical structure** because this massively helps with organisation of content.

Copy that `JSON` file into **`Developer Tools`** or can also do it in **`Node.js`**
Run this on that `JSON`

*Please note*: **This is not the best and most efficent way to do it**. Because it is one-off it is not worth the effort to spend time coming up with a better algorithm because it will only run once and that is all. 

*Side note*: ***When trying to find the best solution. It is important to first `code` it with hand a working solution irrespective of performance. Optimisation comes later.***

```js
function reformatData( json ) {

    let keys = Object.keys( json )
    let newJson = {}

    for ( let k = 0; k < keys.length; k++ ) {

        let key = keys[ k ]
        let categories = key.split(" > ")
        let adam = categories[0]
        newJson = categorize( newJson, categories, adam, json )

    }

    return newJson

}

function categorize( json, categories, adam, data ) {

    if ( categories.length > 1 ) {

        switch( categories.length ) {

            case 2: {

                let category = categories[1]
                let prop = [
                    adam,
                    category
                ].join(" > ")
                json[adam][category] = {
                    questions: data[prop]
                }
                break
                
            }

            case 3: {

                let category = categories[1]
                let prop = [
                    adam,
                    category
                ].join(" > ")
                let prop2 = [
                    adam,
                    category,
                    categories[2]
                ].join(" > ")
                json[adam][category] = {
                    ...json[adam][category],
                    questions: data[prop],
                    [ categories[2] ]: {
                        questions: data[prop2]
                    }
                }
                break

            }

            case 4: {

                let category = categories[1]
                let prop = [
                    adam,
                    category
                ].join(" > ")
                let prop2 = [
                    adam,
                    category,
                    categories[2]
                ].join(" > ")
                let prop3 = [
                    adam,
                    category,
                    categories[2],
                    categories[3],
                ].join(" > ")
                json[adam][category] = {
                    ...json[adam][category],
                    questions: data[prop],
                    [ categories[2] ]: {
                        ...json[adam][category][categories[2]],
                        questions: data[prop2],
                        [ categories[3] ]: {
                            questions: data[prop3]
                        }
                    }
                }
                break

            }

            case 5: {

                let category = categories[1]
                let prop = [
                    adam,
                    category
                ].join(" > ")
                let prop2 = [
                    adam,
                    category,
                    categories[2]
                ].join(" > ")
                let prop3 = [
                    adam,
                    category,
                    categories[2],
                    categories[3],
                ].join(" > ")
                let prop4 = [
                    adam,
                    category,
                    categories[2],
                    categories[3],
                    categories[4],
                ].join(" > ")
                json[adam][category] = {
                    ...json[adam][category],
                    questions: data[prop],
                    [categories[2]]: {
                        ...json[adam][category][categories[2]],
                        questions: data[prop2],
                        [categories[3]]: {
                            ...json[adam][category][categories[2]][categories[3]],
                            questions: data[prop3],
                            [categories[4]]: {
                                questions: data[prop4]
                            }
                        }
                    }
                }
                break

            }

            case 6: {

                let category = categories[1]
                let prop = [
                    adam,
                    category
                ].join(" > ")
                let prop2 = [
                    adam,
                    category,
                    categories[2]
                ].join(" > ")
                let prop3 = [
                    adam,
                    category,
                    categories[2],
                    categories[3],
                ].join(" > ")
                let prop4 = [
                    adam,
                    category,
                    categories[2],
                    categories[3],
                    categories[4],
                ].join(" > ")
                let prop5 = [
                    adam,
                    category,
                    categories[2],
                    categories[3],
                    categories[4],
                    categories[5],
                ].join(" > ")
                json[adam][category] = {
                    ...json[adam][category],
                    questions: data[prop],
                    [categories[2]]: {
                        ...json[adam][category][categories[2]],
                        questions: data[prop2],
                        [categories[3]]: {
                            ...json[adam][category][categories[2]][categories[3]],
                            questions: data[prop3],
                            [categories[4]]: {
                                ...json[adam][category][categories[2]][categories[3]][categories[4]],
                                questions: data[prop4],
                                [categories[5]]: {
                                    questions: data[prop5]
                                }
                            }
                        }
                    }
                }
                break

            }

        }

    } else json[ adam ] = {
        questions: data[adam]
    }
    return json

}
```
## Step 5: Check that `JSON` generated by `reformatData` and `categorize` is fully in tree or hierachical format. 
It should be in this format:
```json
{
    "Concepts": {
        "questions": [
            {
                "question": "What is Islam’s view about the differing philosophies of Determinism and Existentialism?",
                "url": "http://www.askislam.org/concepts/question_173.html",
            },
            {
                "question": "What is the difference between Satan and Iblis?",
                "url": "http://www.askislam.org/concepts/question_440.html",
            },
            ...
        ],
        "Accountability": {
            "questions": [
                {
                    "question": "Will children be penalized for the crimes of their parents?",
                    "url": "http://www.askislam.org/concepts/accountability/question_29.html",
                },
                {
                    "question": "Will the people who came before Adam be answerable to God?",
                    "url": "http://www.askislam.org/concepts/accountability/question_121.html",
                },
                {
                    "question": "Why is it said that God takes account of every evil action swiftly?",
                    "url": "http://www.askislam.org/concepts/accountability/question_301.html",
                },
                {
                    "question": "Will the fate of the drug dealers be different than those who distribute alcohol?",
                    "url": "http://www.askislam.org/concepts/accountability/question_757.html",
                },
                ...
            ]
        },
        "Afterlife": {
            "questions": [
                {
                    "question": "Did Muhammad say that children who die in childhood will be gathered in a place called Maidan-i-Hashr and then a prophet will be sent to them there, and that those who accept the prophet will go to Heaven?",
                    "url": "http://www.askislam.org/concepts/afterlife/question_72.html",
                },
                {
                    "question": "Is it possible to make contact with the spirits of the deceased?",
                    "url": "http://www.askislam.org/concepts/afterlife/question_86.html",
                },
                {
                    "question": "When the Quran refers to \"a punishment in the grave\" is it reffering to the physical grave or to something else?",
                    "url": "http://www.askislam.org/concepts/afterlife/question_162.html",
                },
                ...
            ]
        },
        ...
    }
}
``` 

## Step 6: Follow the automated process

At this point the `JSON` file will be structured and formatted.
Run `node index.js` and it will do the following for you automatically.

 1. Add much more metadata to each question such as the length of it and most importantly get the `.mp3` link for each question.
 2. It does this by individually scraping the extracted `url` for each question.
 3. Once `.mp3` links added to each question and metadata added, it visists each `.mp3` link of each question and saves the `mp3` file in the present directory and in the correct folder as well as naming each file with the actual question

## Step 7: All done and you can do whatever you want to do with the scrapped data.
if something did not go to plan - repeat Step 6 until resolved.
