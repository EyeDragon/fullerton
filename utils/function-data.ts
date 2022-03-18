export function mergeDeep<T>(...objects): T {
    const isObject = obj => obj && typeof obj === "object";
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = [...pVal, ...oVal].filter((element, index, array) => array.indexOf(element) === index);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
};

export function cloneData<T>(objectToCopy: T, isAutoMapDate: boolean = false, objectReferenceHash: WeakMap<any, any> = new WeakMap<any, any>()): T {
    // if source element is null or not an object, return the source value
    if (!objectToCopy || typeof objectToCopy !== "object") {
        if (isAutoMapDate && typeof objectToCopy === "string" && String(new Date(objectToCopy.replace(/\s/g, ""))) !== "Invalid Date" && isNaN(parseFloat(objectToCopy.replace(/\s/g, "")))) {
            return new Date(objectToCopy) as unknown as T;
        }
        return objectToCopy;
    }
    if (objectToCopy.constructor.name === "Date") {
        return new Date(objectToCopy as unknown as Date) as unknown as T;
    }
    const destinationObject: any = Array.isArray(objectToCopy) ? [] : {};
    // Add the source object to a reference list (for multiple references)
    objectReferenceHash.set(objectToCopy, destinationObject);
    // For each property of the object
    for (const propertyName in objectToCopy) {
        if (objectToCopy.hasOwnProperty(propertyName)) {
            const propertyValue = objectToCopy[propertyName];
            // If the property is an object
            if (typeof propertyValue === "object") {
                const objectPropertyValue: object = propertyValue as unknown as object;
                // Search a corresponding object already parsed
                if (objectReferenceHash.has(objectPropertyValue)) { // If found, assign the reference of the corresponding destination object
                    destinationObject[propertyName] = objectReferenceHash.get(objectPropertyValue);
                }
                else { // If not found, Clone child value and child value to child property
                    const propertyValueCopy = cloneData<any>(objectPropertyValue, isAutoMapDate, objectReferenceHash);
                    destinationObject[propertyName] = propertyValueCopy;
                }
            }
            else { // Not an object
                if (isAutoMapDate && typeof propertyValue === "string" && String(new Date(propertyValue.replace(/\s/g, ""))) !== "Invalid Date" && isNaN(parseFloat(propertyValue.replace(/\s/g, "")))) {
                    destinationObject[propertyName] = new Date(propertyValue);
                }
                else {
                    destinationObject[propertyName] = propertyValue;
                }
            }
        }
    }
    return destinationObject as unknown as T;
};

export function isNullOrUndefined(obj: any) {
    return obj === null || obj === undefined;
};

export function isEmpty(obj: any) {
    let result = isNullOrUndefined(obj);
    if (!result) {
        if (typeof (obj) === "string") {
            result = obj.trim() === "";
        } else if (typeof (obj) === "object") {
            if (Array.isArray(obj)) {
                result = obj.length === 0;
            }
            else {
                result = JSON.stringify(obj) === "{}";
            }
        }
    }
    return result;
};

export function convertToParamExpress(params: { [key: string]: any }) {
    let result = "";
    Object.keys(params).forEach(key => {
        const val = params[key];
        result += `/${val}`;
    });
    return result;
}

export function definePlugin(env) {
    let newDefine = {};
    Object.keys(env).forEach(x => {
        newDefine[`process.env.${x}`] = env[x];
    });
    return newDefine;
}

export function urlImage(source: string = "") {
    return `${window.location.origin}/assets/${source}`;
}

export const browserStorage = {
    set: (key: string, data: any) => {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: <T>(key: string) => {
        return JSON.parse(localStorage.getItem(key)) as T;
    }
};

export function toDataUrl(url: string, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
};