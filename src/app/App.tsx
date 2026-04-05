import { AppRouter } from "@/app/routes";
import { SignalRBridge } from "@/app/providers/SignalRBridge";

function App() {
    return (
        <>
            <SignalRBridge />
            <AppRouter />
        </>
    );
}

export default App;
