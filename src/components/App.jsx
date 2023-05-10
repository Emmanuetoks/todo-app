import Container from "./Container"
import TodoBox from "./TodoBox"
import '../../CSS/index.css'
import '../../CSS/themes.css'
const App = () => {
    if ('virtualKeyboard' in navigator) {
        navigator.virtualKeyboard.overlaysContent = true;
    }
    return (
        <div className="bg">
            <header className="bg__header" aria-hidden='true'>
                <span className="sr-only">body header</span>
            </header>
            <Container>
                <TodoBox />
            </Container>
        </div>

    )
}

export default App