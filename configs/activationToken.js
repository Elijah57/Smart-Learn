const createActivationToken = (user)=>{
    const activationCode = Math.floor(1000 + Math.random()* 9000).toString();
    return activationCode
}

module.exports = createActivationToken;