module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'quotes': ['error', 'single'],
        // we want to force semicolons
        'semi': ['error', 'always'],
        // we want to avoid extraneous spaces
        'no-multi-spaces': ['error']
    }
};
