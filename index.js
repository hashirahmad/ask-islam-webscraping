const Questions = require("./Questions")

async function initialize(){

    let q = new Questions()
    await q.init()
    let formattedDetailedQsJson = await q.iterateAndAddLinkToQuestionThenReturn( questionsJson, "" )
    jsonfile.writeFileSync(
        questionsFilePath, 
        formattedDetailedQsJson,
        {
            spaces: 4,
            EOL: '\r\n'
        }
    )
    let savedQsWithDownloadDetailsJson = await q.iterateDownloadQsRecordItsSavedThenReturn( questionsJson, "" )
    jsonfile.writeFileSync(
        questionsFilePath, 
        savedQsWithDownloadDetailsJson,
        {
            spaces: 4,
            EOL: '\r\n'
        }
    )

}

initialize()