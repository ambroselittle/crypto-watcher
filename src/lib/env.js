const env = () => process.env.NODE_ENV;

/** Whether or not the current environment is development. */
const isDevEnv = () => env() === 'development';

/** Whether or not the current environment is test. */
const isTestEnv = () => env() === 'test';

/** Whether or not the current environment is production. */
const isProdEnv = () => env() === 'production';

module.exports = {
    env,
    isDevEnv,
    isTestEnv,
    isProdEnv,
}