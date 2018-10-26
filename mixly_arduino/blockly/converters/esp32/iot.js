'use strict';
// console.log("hhh")

pbc.assignD.get('iot')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Name"){
        return false;
    }
    var funcName = py2block.Name_str(value.func);
    if(funcName === "init_MQTT_client" && value.args.length === 6)
        return true;
    return false;
}

pbc.assignD.get('iot')['create_block'] = function(py2block, node, targets, value){
    return block("iot_onenet_connect", node.lineno, {}, {
        "CLIENT":py2block.convert(value.args[0]),
        "SERVER":py2block.convert(value.args[1]),
        "USERNAME":py2block.convert(value.args[2]),
        "PASSWORD":py2block.convert(value.args[3]),
        "TOPIC":py2block.convert(value.args[4]),
        "SUB":py2block.convert(value.args[5]),
        "VAR":py2block.convert(targets[0])
    });
}

pbc.globalFunctionD['do_connect'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var nameblock = py2block.convert(args[0]);
    var keyblock = py2block.convert(args[1]);
    return [block("iot_wifi_connect", func.lineno, {}, {
        'WIFINAME': nameblock,
        'PASSWORD': keyblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('check_msg')['iot'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("iot_onenet_check", func.lineno, {}, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

