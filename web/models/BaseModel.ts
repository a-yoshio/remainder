export class BaseModel {
    public convertToJSON() {
        return JSON.stringify(this)
    }

    public convertMap(): Map<String, any> {
        let propertyMap = new Map<String, any>();
        for (const propKey in this) {
            propertyMap.set(propKey, this[propKey])
        }
        return propertyMap
        
    }
}