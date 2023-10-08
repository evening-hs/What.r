export default function LocationHeader({body = "Water Body", city = "City", state = "State"}) {
    return (
        <header className="transparent">
            <h1>{body}</h1>
            <h2>{city},</h2>
            <h3>{state}</h3>
        </header>
    )
}