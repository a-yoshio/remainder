export class BaseModel {
    public convertToJSON() {
        return JSON.stringify(this)
    }

    public convertMap(): Map<string, any> {
        let propertyMap = new Map<string, any>();
        for (const propKey in this) {
            propertyMap.set(propKey, this[propKey])
        }
        return propertyMap
        
    }
}