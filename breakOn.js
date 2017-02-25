function breakOn(obj, propName) {
    var props = propName.split('.'),
        lastIndex = props.length - 1, 
        propValues = [];

    handleProp(obj, 0);

    function handleProp(curObj, i) {
        var curProp = props[i],
            hasProperty;

        if (curObj && typeof curObj === 'object') {
            hasProperty = curObj.hasOwnProperty(curProp); 

            if (hasProperty) {
                propValues[i] = i ? propValues[i - 1][curProp] : curObj[curProp];  
            }     

            if (!hasProperty || typeof curObj[curProp] !== 'object' || !curObj[curProp] || i === lastIndex) {
                define(curObj, i);
            }      
        }

        if (i < lastIndex) {
            handleProp(propValues[i], ++i);
        }
    }

    function define(obj, i) {
        Object.defineProperty(obj, props[i], {
            get: function () {
                return propValues[i];
            },
            set: function (val) {    
                if (i === lastIndex) {
                    debugger;            
                }             

                propValues[i] = val;

                if (val && typeof val === 'object') {
                    define(val, i + 1)
                }
            }    
        });
    }
}