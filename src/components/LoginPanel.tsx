import LoginPanel from "./components/LoginPanel";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#121212] relative overflow-hidden flex items-center justify-center">
            {/* Fundo quadriculado dourado */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,215,90,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,90,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />
            <div className="relative z-10">
                <LoginPanel />
            </div>
        </div>
    );
}
