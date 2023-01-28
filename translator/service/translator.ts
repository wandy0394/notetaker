const {Translate} = require('@google-cloud/translate/').v2

const projectId = process.env.PROJECT_ID || 0
const translator = new Translate({projectId})


type Props = {
    text:string,
    target:string
    options?:{from:string, to:string}
}

export default async function translate({text, target, options}:Props) {
    const [translation] = await translator.translate(text, options)
    return translation
}
