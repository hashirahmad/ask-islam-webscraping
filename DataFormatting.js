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