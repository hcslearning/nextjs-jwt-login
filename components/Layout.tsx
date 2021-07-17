export function Layout(props) {
    return (
        <div className="container bg-light py-5 px-5 rounded-3">
            {props.children}
        </div>
    )
}