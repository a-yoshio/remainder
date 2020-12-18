export const validateContents = (target) => {
    let error = []
    if(!target.$dirty) return error
    !validate.required && errors.push('内容を入力してください')
}