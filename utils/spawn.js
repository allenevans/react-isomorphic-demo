/**
 * Created by allen on 02/06/2015.
 */
// See http://www.html5rocks.com/en/tutorials/es6/promises/
export default function spawn(generatorFunc) {
    function resume(verb, arg) {
        var result;
        try {
            result = generator[verb](arg);
        } catch (err) {
            return Promise.reject(err);
        }
        if (result.done) {
            return result.value;
        } else {
            return Promise.resolve(result.value).then(callback, errback);
        }
    }
    var generator = generatorFunc();
    var callback = resume.bind(resume, "next");
    var errback = resume.bind(resume, "throw");

    return callback();
}