const {Translate} = require('@google-cloud/translate/').v2

const projectId = process.env.PROJECT_ID || 0
const translator = new Translate({projectId})


type Props = {
    text:string,
    target:string
}

export default async function translate({text, target}:Props) {
    // const text='hello world'
    // const target ='es'
    const [translation] = await translator.translate(text, target)
    console.log(text)
    console.log(translation)
    return translation
}
