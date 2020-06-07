const jsonfile = require('jsonfile')
const questionsFilePath = __dirname + '/questions.json'
const questionsJson = jsonfile.readFileSync(questionsFilePath)
const chrome = require('puppeteer')
const cliProgress = require("cli-progress")
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
const fileSystem = require("file-system")
const fs = require("fs")
const path = require("path")
const axios = require("axios")

class Questions {

    constructor() {
        this.browser = null
        this.page = null
    }

    async init() {

        let options = {
            width: 1980,
            height: 1200
        }

        this.browser = await chrome.launch({
            headless: false,
            devtools: true,
            args: [`--window-size=${options.width},${options.height}`]
        })
        this.page = await this.browser.newPage()

        await this.page.setViewport({
            width: options.width,
            height: options.height,
            deviceScaleFactor: 1,
        })

    }

    sleep(sec) {
        return new Promise(res => {

            progressBar.start(sec, 0)
            let progressValue = 0
            let incrementer = setInterval(() => {
                progressBar.update(++progressValue)
            }, 1000)

            setTimeout(() => {
                clearInterval(incrementer)
                progressBar.stop()
                res()
            }, sec * 1000);

        })
    }

    async iterateAndAddLinkToQuestionThenReturn(obj, stack) {

        for ( var property in obj ) {
            if ( obj.hasOwnProperty(property) ) {
                if ( 
                    typeof obj[ property ] === "object" &&
                    obj[ property ].push === undefined
                ) {
                    obj[ property ] = await this.iterateAndAddLinkToQuestionThenReturn(obj[property], stack + ' > ' + property);
                } else {
                    obj[ property ] = await this.addLinkToQuestionsThenReturn( obj[property] )
                    console.log("Extracted new content for:", stack)
                }
            }
        }
        return obj

    }

    async addLinkToQuestionsThenReturn( questionsArray ){

        for ( let q = 0; q < questionsArray.length; q++ ){
            let question = questionsArray[ q ]
            if ( !question.mp3 ) {

                await this.page.goto( question.url )
                const metadata = await this.page.evaluate(
                    () => {
    
                        let details = document.querySelector(".clearfix.details").innerText.split("\n")
                        let obj = {
                            mp3: document.querySelector(".format-mp3").firstElementChild.href,
                            duration: details[0].substring(10),
                            date: details[1].substring(6),
                            audience: details[2].substring(10),
                            location: details[3].substring(10),
                            author: details[4].substring(8),
                            language: details[5].substring(10)
                        }
                        return obj
                        
                    }
                )
    
                if ( metadata.mp3 ) {
                    question = { 
                        ...question, 
                        ...metadata
                    }
                }
                questionsArray[ q ] = question

            }
        }
        return questionsArray
    }

    async iterateDownloadQsRecordItsSavedThenReturn(obj, stack) {

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {

                if (
                    typeof obj[ property ] === "object" &&
                    obj[ property ].push === undefined
                ) {
                    obj[ property ] = await this.iterateDownloadQsRecordItsSavedThenReturn(obj[ property ], stack + '/' + property);
                } else {
                    obj[ property ] = await this.downloadQsRecordItsSavedThenReturn(obj[ property ], stack)
                }
            }
        }
    }

    async downloadQsRecordItsSavedThenReturn(questionsArray, stack) {
        for (let index = 0; index < questionsArray.length; index++) {
            const element = questionsArray[index]
            const regex = /[^a-zA-Z ]/g
            if ( !element.downloaded ) {
                element.downloaded = await this.downloadFile({
                    url: element.mp3,
                    dirPath: stack,
                    fileName: element.question.substr(0, 200).replace(regex, "") + ".mp3"
                })
            }
        }
        return questionsArray
    }

    async downloadFile({ url, dirPath, fileName }) {

        fileSystem.mkdirSync( path.join(__dirname, dirPath) )
        const fullPath = path.join(__dirname, dirPath, fileName)
        const writer = fs.createWriteStream(fullPath)

        const audio = await axios({
            url,
            method: "GET",
            responseType: "stream"
        })
        audio.data.pipe(writer)

        return new Promise((resolve, reject) => {

            writer.on("finish", () => {
                console.log("SUCCESS: ", fileName)
                resolve(true) 
            })

            writer.on("error", e => {
                console.error(
                    "FAILED: \n", 
                    fileName, 
                    "\n",
                    dirPath
                )
                reject(false)
            })
        })

    }

}

module.exports = Questions