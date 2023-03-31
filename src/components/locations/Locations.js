import "./location.css"

export const Locations = () => {
    return (
        <div className="App">
        <iframe
            width="450"
            height="250"
            frameBorder="0" style={{ border: "0" }}
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBD9LVEsST69tB5oTmxpkyHxynP6w0puhs&q=grocery+stores+in+Nashville"
            allowFullScreen>
        </iframe>
        </div>
    )
}