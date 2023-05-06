import ContainerHeader from "./ContainerHeader"
const Container = ({ children }) => {
    return (
        <main className="container flex" style={{'--gap': '3rem'}}>
            <ContainerHeader />
            {children}
            <footer className="container__footer">
                <p>Drag and drop to render list</p>
            </footer>
        </main>
    )
}

export default Container