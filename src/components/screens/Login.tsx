import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === "admin@taskflow.com" && senha === "1234") {
            localStorage.setItem("userLogged", "true");
            navigate("/app");
        } else {
            alert("Usuário ou senha incorretos.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="bg-slate-700/50 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm border border-slate-600">
                <h1 className="text-3xl font-bold text-center mb-6 text-amber-400 drop-shadow-md">
                    TaskFlow
                </h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 rounded-md bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="p-3 rounded-md bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <button
                        type="submit"
                        className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold py-3 rounded-md transition-colors"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
