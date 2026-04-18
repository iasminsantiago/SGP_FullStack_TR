export function getUsuario() {
    const usuario = localStorage.getItem("nome");

    if (!usuario) return null;

    return { nome: JSON.parse(usuario) };
    
}