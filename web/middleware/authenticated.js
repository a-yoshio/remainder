export default function ({ store, redirect,route }) {
    return redirect('/login?pageName=' + route.name)
}