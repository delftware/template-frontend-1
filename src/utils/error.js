
const singleServerErrorMessage = (err) =>  {    
    let message;
    if (err.response && err.response.body) {
        message = err.response.body.errors.message;
    } else {
        message = 'Something went wrong.'
    }
    return message;
}

const multipleServerErrorMessage = (err) =>  {    
    let messagesObject;
    if (err.response && err.response.body) {
        messagesObject = err.response.body.errors;
    } else {
        messagesObject = {default: 'Something went wrong.'}
    }
    return messagesObject;
}


export default { multipleServerErrorMessage, singleServerErrorMessage }