import validator from 'is_js';

const signupPhysicsValidation = (data) => {

    if(validator.empty(data.age) || validator.empty(data.weight) || validator.empty(data.height)) {
        return 'Please enter all field';
    }
}

export default signupPhysicsValidation;