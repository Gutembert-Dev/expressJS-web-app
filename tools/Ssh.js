var exec = require('ssh-exec');

class Ssh{ 

    static executeCommand(ip, username, password, command){
        exec(command,  {
            user: username,
            host: ip,
            password: password
        }, (error, stdout, stderr) => {
            if(error){
                console.log(`Error: ${error.message}`);
                return;
            }
            if(stderr){
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
    }

    // const ssh = function(ip, username, password, command){
    //     exec(command,  {
    //         user: username,
    //         host: ip,
    //         password: password
    //     }, (error, stdout, stderr) => {
    //         if(error){
    //             console.log(`Error: ${error.message}`);
    //             return;
    //         }
    //         if(stderr){
    //             console.log(`stderr: ${stderr}`);
    //             return;
    //         }
    //         console.log(`stdout: ${stdout}`);
    //     })
    // }

    // https://stackoverflow.com/questions/36210395/getting-results-of-execution-ssh-client-in-nodejs (try to understand how to return from ssh)
    static executeCommand1(ip, username, password, command){
        var data = '';
        var error1 = null;
        exec(command,  {
            user: username,
            host: ip,
            password: password
        }, function(err, data) {
               if (err) {
                    // handle potential err
                    console.error(err.stack);
                } else {
                    // work with data as intended
                    console.log(data);
                }
            },(error, stdout, stderr) => {
                if(error){
                    console.log(`Error: ${error.message}`);
                    error1 = error;
                    return;
                }
                if(stderr){
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                data += stdout;
            })
    }
}

module.exports = {Ssh};

// ssh = (ip, username, password, command) => {
//     exec(command,  {
//         user: username,
//         host: ip,
//         password: password
//     }, (error, stdout, stderr) => {
//         if(error){
//             console.log(`Error: ${error.message}`);
//             return;
//         }
//         if(stderr){
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         console.log(`stdout: ${stdout}`);
//     })
// }

// methods = {
//     name: 'Gut',
//     surname: 'Nz',
//     sum: function() {
//         return this.name + ' ' + this.surname
//     }
// }

// ssh('camer.tech', 'camerdev', 'camerdev@Camer#40', 'ls')

// console.log(methods.sum())