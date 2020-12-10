export class BaseModel {
    public convertToJSON() {
        return JSON.stringify(this)
    }

    public convertMap(): Map<String, String> {
        let propertyMap = new Map<String, String>();
        for (const propKey in this) {
            console.log('>>> get Key: ' + propKey)
            // propertyMap.set(propKey, this)
        }
        return propertyMap
        
    }
}