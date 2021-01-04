export default async function ({ store, redirect, route }) {
    // ログインページなら、誰でも閲覧可能
    if (route.name == 'login') {
        return
    }
    // アクセス権限チェック
    if (!store.state.auth.login_state) {
        // アクセス権限がなかったら、ログインページへ
        return redirect('/login?pageName=' + route.name)    
    } else {
        // アクセス権限がある場合は、指定のページへ
        return
    }
}