'use strict'

module.exports = {
    verifyVariables(variables) {
        for (const [key, value] of Object.entries(variables)) {
            if (key == 'options') {
                const keys = this.readOptionsParameters(variables.options);
                if (!keys) {
                    throw {
                        message: variables.options && variables.options.error ? variables.options.error : null,
                        status: (variables.options && variables.options.status) ? variables.options.status : null
                    };
                }
                return;
            }
            if (!value[0]) {
                throw {
                    message: value[1],
                    status: value[2] ? value[2] : null
                };
            }
        }
    },

    readOptionsParameters(options) {
        for (const [key, value] of Object.entries(options)) {
            if (key != 'error' && key != 'status' && value) {
                return true;
            }
        }
        return false;
    }
}